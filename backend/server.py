import os
import logging
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal
from pathlib import Path

from dotenv import load_dotenv

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError, ServerSelectionTimeoutError
from pydantic import BaseModel, EmailStr


# -------------------- Environment --------------------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")


def env(name: str, default: Optional[str] = None, *, required: bool = False) -> str:
    """Read environment values with production-friendly error messages."""
    value = os.environ.get(name, default)
    if required and not value:
        raise RuntimeError(
            f"Missing required environment variable: {name}. "
            "Add it in the hosting provider environment settings or backend/.env for local development."
        )
    return value or ""


ENVIRONMENT = env("ENVIRONMENT", "development").lower()
IS_PRODUCTION = ENVIRONMENT == "production"
MONGO_URL = env("MONGO_URL", env("MONGODB_URI"))
DB_NAME = env("DB_NAME", "cressara")
JWT_SECRET = env("JWT_SECRET")
CORS_ORIGINS = [o.strip() for o in env("CORS_ORIGINS", "*").split(",") if o.strip()]
COOKIE_SECURE = env("COOKIE_SECURE", "true" if IS_PRODUCTION else "false").lower() == "true"
COOKIE_SAMESITE = env("COOKIE_SAMESITE", "none" if IS_PRODUCTION else "lax").lower()
MONGO_TIMEOUT_MS = int(env("MONGO_TIMEOUT_MS", "5000"))


def config_errors() -> List[str]:
    errors = []
    if not MONGO_URL:
        errors.append("MONGO_URL or MONGODB_URI is required")
    if not DB_NAME:
        errors.append("DB_NAME is required")
    if not JWT_SECRET:
        errors.append("JWT_SECRET is required")
    if IS_PRODUCTION and CORS_ORIGINS == ["*"]:
        errors.append("CORS_ORIGINS cannot be '*' in production")
    if IS_PRODUCTION and not env("ADMIN_PASSWORD"):
        errors.append("ADMIN_PASSWORD is required in production")
    return errors


# -------------------- DB --------------------
# Keep imports healthy even before production variables are configured.
# Actual API requests validate configuration before using the database.
client = AsyncIOMotorClient(MONGO_URL or "mongodb://localhost:27017", serverSelectionTimeoutMS=MONGO_TIMEOUT_MS)
db = client[DB_NAME]


async def ping_database() -> None:
    """Verify that MongoDB is reachable before the app serves traffic."""
    try:
        await client.admin.command("ping")
    except ServerSelectionTimeoutError as exc:
        logger.error("MongoDB connection timed out. Check MONGO_URL, Atlas network access, and credentials.")
        raise RuntimeError("MongoDB connection timed out") from exc
    except PyMongoError as exc:
        logger.error("MongoDB connection failed: %s", exc)
        raise RuntimeError("MongoDB connection failed") from exc


# -------------------- App --------------------
app = FastAPI(title="CRESARA API")
api_router = APIRouter()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("cresara")

db_ready = False


async def ensure_database_ready() -> None:
    """Initialize Mongo indexes and seed data on cold starts/serverless requests."""
    global db_ready
    if db_ready:
        return
    errors = config_errors()
    if errors:
        raise RuntimeError("; ".join(errors))
    await ping_database()
    await db.users.create_index("email", unique=True)
    await db.courses.create_index("category")
    await db.courses.create_index("featured")
    await seed_admin()
    await seed_courses()
    db_ready = True


@app.middleware("http")
async def ensure_db_before_api_requests(request: Request, call_next):
    path = request.url.path.rstrip("/") or "/"
    health_paths = {"/health", "/health/db", "/api/health", "/api/health/db"}
    api_paths = ("/auth", "/courses", "/api/auth", "/api/courses")
    should_prepare_db = path not in health_paths and path.startswith(api_paths)

    if should_prepare_db:
        try:
            await ensure_database_ready()
        except Exception as exc:
            logger.warning("API readiness failed: %s", exc)
            return JSONResponse(status_code=503, content={"detail": str(exc)})
    return await call_next(request)


# -------------------- Auth utils --------------------
JWT_ALGORITHM = "HS256"
ACCESS_TTL_MIN = 60 * 24  # 24 hours

def get_jwt_secret() -> str:
    return JWT_SECRET

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TTL_MIN),
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def set_auth_cookie(response: Response, token: str) -> None:
    # Cross-site auth cookies require SameSite=None and Secure=true in production.
    # Local HTTP development is easier with SameSite=Lax and COOKIE_SECURE=false.
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=ACCESS_TTL_MIN * 60,
        path="/",
    )

def clear_auth_cookie(response: Response) -> None:
    response.delete_cookie("access_token", path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="No autenticado")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Token inválido")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sesión expirada")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")


# -------------------- Models --------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserPublic(BaseModel):
    id: str
    email: str
    name: str
    role: str


CategoryLiteral = Literal["mujeres", "hombres", "relaciones"]

class CourseBase(BaseModel):
    title: str
    description: str
    category: CategoryLiteral
    short_description: str = ""
    image_url: str = ""
    video_url: str = ""
    extra_content: str = ""
    featured: bool = False

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[CategoryLiteral] = None
    short_description: Optional[str] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    extra_content: Optional[str] = None
    featured: Optional[bool] = None

class Course(CourseBase):
    id: str
    created_at: datetime
    updated_at: datetime


# -------------------- Auth endpoints --------------------
@api_router.post("/auth/login", response_model=UserPublic)
async def login(payload: LoginRequest, response: Response):
    await sync_admin_user()
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = create_access_token(user["id"], user["email"])
    set_auth_cookie(response, token)
    return UserPublic(id=user["id"], email=user["email"], name=user["name"], role=user["role"])

@api_router.get("/auth/me", response_model=UserPublic)
async def me(current_user: dict = Depends(get_current_user)):
    return UserPublic(
        id=current_user["id"],
        email=current_user["email"],
        name=current_user["name"],
        role=current_user["role"],
    )

@api_router.post("/auth/logout")
async def logout(response: Response):
    clear_auth_cookie(response)
    return {"ok": True}


# -------------------- Course endpoints --------------------
def serialize_course(doc: dict) -> dict:
    doc.pop("_id", None)
    for k in ("created_at", "updated_at"):
        v = doc.get(k)
        if isinstance(v, str):
            try:
                doc[k] = datetime.fromisoformat(v)
            except Exception:
                pass
    return doc


@api_router.get("/courses", response_model=List[Course])
async def list_courses(category: Optional[CategoryLiteral] = None, featured: Optional[bool] = None):
    query: dict = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    cursor = db.courses.find(query, {"_id": 0}).sort("created_at", -1)
    items = await cursor.to_list(length=500)
    return [serialize_course(i) for i in items]


@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    doc = await db.courses.find_one({"id": course_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    return serialize_course(doc)


@api_router.post("/courses", response_model=Course)
async def create_course(payload: CourseCreate, current_user: dict = Depends(get_current_user)):
    now = datetime.now(timezone.utc)
    course_id = str(uuid.uuid4())
    doc = {
        **payload.model_dump(),
        "id": course_id,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }
    await db.courses.insert_one(doc)
    return serialize_course({k: v for k, v in doc.items() if k != "_id"})


@api_router.put("/courses/{course_id}", response_model=Course)
async def update_course(course_id: str, payload: CourseUpdate, current_user: dict = Depends(get_current_user)):
    update = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="Sin cambios")
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.courses.find_one_and_update(
        {"id": course_id},
        {"$set": update},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    return serialize_course(result)


@api_router.delete("/courses/{course_id}")
async def delete_course(course_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.courses.delete_one({"id": course_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    return {"ok": True}


@api_router.get("/health")
async def health():
    errors = config_errors()
    return {
        "status": "ok" if not errors else "misconfigured",
        "service": "cresara",
        "environment": ENVIRONMENT,
        "database": DB_NAME,
        "config_errors": errors,
    }


@api_router.get("/health/db")
async def health_db():
    try:
        await ensure_database_ready()
        return {"status": "ok", "service": "cresara", "database": DB_NAME}
    except RuntimeError as exc:
        logger.warning("Database readiness check failed: %s", exc)
        raise HTTPException(status_code=503, detail=str(exc))
    except PyMongoError as exc:
        logger.warning("Database health check failed: %s", exc)
        raise HTTPException(status_code=503, detail="Database unavailable")


# -------------------- Seed --------------------
SAMPLE_COURSES = [
    # Mujeres
    {
        "title": "Apego y Autoestima",
        "category": "mujeres",
        "short_description": "Comprender los patrones de apego para construir una autoestima sólida y real.",
        "description": "Un recorrido profundo por la teoría del apego aplicada a la vida adulta. Identifica tu estilo, comprende las heridas que lo formaron y desarrolla una autoestima basada en evidencia, no en frases vacías.",
        "image_url": "https://images.unsplash.com/photo-1740801505683-9391efb89106?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxsYXRpbiUyMHdvbWFuJTIwcG9ydHJhaXQlMjBkYXJrJTIwbW9vZHxlbnwwfHx8fDE3NzczOTgwMDl8MA&ixlib=rb-4.1.0&q=85",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "Incluye 8 lecciones, ejercicios introspectivos y guía descargable.",
        "featured": True,
    },
    {
        "title": "Sanar la Herida del Padre",
        "category": "mujeres",
        "short_description": "Cómo la relación con tu padre moldea tus vínculos hoy, y qué hacer con ello.",
        "description": "Un curso clínico-aplicado sobre la herida paterna: cómo se manifiesta en relaciones, decisiones y autoimagen. Sin culpas, sin victimismo: comprensión y acción.",
        "image_url": "https://images.pexels.com/photos/9845603/pexels-photo-9845603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "10 módulos. Ejercicios de reescritura narrativa.",
        "featured": False,
    },
    {
        "title": "Inteligencia Emocional para Mujeres",
        "category": "mujeres",
        "short_description": "Identificar, nombrar y dirigir tus emociones con criterio.",
        "description": "La inteligencia emocional como herramienta de claridad. Aprende a separar emoción de reacción, intuición de ansiedad, deseo de necesidad.",
        "image_url": "https://images.unsplash.com/photo-1548393488-ae8f117cbc1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZCUyMHN0dWR5aW5nJTIwbGFwdG9wfGVufDB8fHx8MTc3NzM5Nzk5OHww&ixlib=rb-4.1.0&q=85",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "Diario de práctica de 30 días.",
        "featured": False,
    },
    # Hombres
    {
        "title": "Masculinidad Consciente",
        "category": "hombres",
        "short_description": "Construir una masculinidad madura desde el propósito, no desde el ego.",
        "description": "Una masculinidad que no se opone a nada: se construye. Aprende a regular emociones, asumir responsabilidad y liderar tu vida desde una base estable.",
        "image_url": "https://images.pexels.com/photos/3140071/pexels-photo-3140071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "12 lecciones. Casos reales y framework de decisiones.",
        "featured": True,
    },
    {
        "title": "Propósito y Dirección",
        "category": "hombres",
        "short_description": "Dejar de reaccionar y empezar a decidir hacia dónde vas.",
        "description": "El propósito no se encuentra: se construye. Un curso para hombres que quieren claridad estratégica sobre su vida personal, profesional y vincular.",
        "image_url": "https://images.pexels.com/photos/9845603/pexels-photo-9845603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "Plantilla de visión a 3 años incluida.",
        "featured": False,
    },
    {
        "title": "Control Emocional Masculino",
        "category": "hombres",
        "short_description": "Regular sin reprimir. Sentir sin colapsar.",
        "description": "Herramientas concretas para gestionar la rabia, la ansiedad, la tristeza y el miedo desde una postura adulta. Sin estoicismo tóxico, sin dramatismo.",
        "image_url": "https://images.unsplash.com/photo-1548393488-ae8f117cbc1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZCUyMHN0dWR5aW5nJTIwbGFwdG9wfGVufDB8fHx8MTc3NzM5Nzk5OHww&ixlib=rb-4.1.0&q=85",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "Protocolo de 4 pasos para crisis emocional.",
        "featured": False,
    },
    # Relaciones
    {
        "title": "Vínculos Sanos",
        "category": "relaciones",
        "short_description": "Cómo se construye una relación que sostiene en lugar de drenar.",
        "description": "Una guía aplicada para entender la mecánica real de los vínculos sanos: límites, comunicación, deseo, conflicto y reparación.",
        "image_url": "https://images.pexels.com/photos/8272144/pexels-photo-8272144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "Mapa de evaluación vincular incluido.",
        "featured": True,
    },
    {
        "title": "Comunicación Profunda",
        "category": "relaciones",
        "short_description": "Hablar de lo que importa, sin destruir lo que importa.",
        "description": "Aprende a tener las conversaciones difíciles que tu relación necesita: deseo, dinero, futuro, dolor. Con técnica, no con suerte.",
        "image_url": "https://images.pexels.com/photos/9845603/pexels-photo-9845603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "Guion de 7 conversaciones esenciales.",
        "featured": False,
    },
    {
        "title": "Decidir en Pareja con Claridad",
        "category": "relaciones",
        "short_description": "Quedarse, irse, esperar: criterios reales para decisiones reales.",
        "description": "Un marco para tomar decisiones difíciles en pareja sin dejarse llevar por el miedo, la culpa o la inercia.",
        "image_url": "https://images.pexels.com/photos/32911550/pexels-photo-32911550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "extra_content": "Matriz de decisión vincular descargable.",
        "featured": False,
    },
]


async def sync_admin_user():
    email = env("ADMIN_EMAIL", "admin@cresara.com").lower().strip()
    password = env("ADMIN_PASSWORD", "")
    if IS_PRODUCTION and not password:
        raise RuntimeError("ADMIN_PASSWORD is required in production.")
    if not password:
        password = "cresara2026"
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": email,
            "name": "Admin CRESARA",
            "role": "admin",
            "password_hash": hash_password(password),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Admin sembrado: {email}")
    elif not verify_password(password, existing["password_hash"]):
        await db.users.update_one(
            {"email": email},
            {"$set": {"password_hash": hash_password(password)}}
        )
        logger.info(f"Admin password actualizada: {email}")


async def seed_admin():
    await sync_admin_user()


async def seed_courses():
    count = await db.courses.count_documents({})
    if count > 0:
        return
    now_iso = datetime.now(timezone.utc).isoformat()
    docs = []
    for c in SAMPLE_COURSES:
        docs.append({
            **c,
            "id": str(uuid.uuid4()),
            "created_at": now_iso,
            "updated_at": now_iso,
        })
    if docs:
        await db.courses.insert_many(docs)
        logger.info(f"Sembrados {len(docs)} cursos de ejemplo")


@app.on_event("startup")
async def on_startup():
    if env("STARTUP_DB_CHECK", "false").lower() == "true":
        await ensure_database_ready()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# Include router. Local/dev uses /api. Vercel can also expose unprefixed routes
# if its service router strips the /api routePrefix before reaching FastAPI.
app.include_router(api_router, prefix="/api")
if env("ENABLE_UNPREFIXED_API", "false").lower() == "true":
    app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*" if CORS_ORIGINS == ["*"] else None,
    allow_origins=CORS_ORIGINS if CORS_ORIGINS != ["*"] else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
