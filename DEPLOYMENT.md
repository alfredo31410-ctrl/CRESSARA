# Cressara Deployment

Esta guia deja el proyecto listo para desplegar el frontend en Vercel y conectar el backend con variables de entorno seguras.

## Estructura

- `frontend/`: aplicacion React/Create React App.
- `backend/`: API FastAPI.
- `api/`: entrypoint serverless para correr FastAPI dentro de Vercel.

## Variables De Entorno

Nunca subas archivos `.env` reales al repositorio. Usa los archivos `.env.example` como plantilla.

### Frontend

En Vercel, dentro de `Project Settings > Environment Variables`:

```env
REACT_APP_BACKEND_URL=
```

Notas:

- Si dejas `REACT_APP_BACKEND_URL` vacio, el frontend llamara a `/api` en el mismo dominio de Vercel.
- Si separas el backend en otro hosting, usa esa URL sin `/api` al final.

### Backend

Configura estas variables en Vercel:

```env
ENVIRONMENT=production
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=cressara
MONGO_TIMEOUT_MS=5000
JWT_SECRET=un-secreto-largo-random-y-privado
ADMIN_EMAIL=admin@cresara.com
ADMIN_PASSWORD=password-fuerte-y-privado
CORS_ORIGINS=https://tu-frontend.vercel.app,https://tudominio.com
COOKIE_SECURE=true
COOKIE_SAMESITE=none
```

Notas:

- `JWT_SECRET` debe ser largo y unico. No uses el ejemplo.
- `MONGO_URL` debe venir de MongoDB Atlas o del proveedor de Mongo que uses.
- `CORS_ORIGINS` no debe ser `*` en produccion. Pon exactamente los dominios donde vive el frontend.
- `COOKIE_SECURE=true` es obligatorio cuando uses HTTPS, que es lo normal en produccion.
- `COOKIE_SAMESITE=none` permite que el frontend y el backend vivan en dominios distintos.

## Vercel

Recomendacion para Vercel:

1. Importa el repositorio.
2. Usa el `vercel.json` de la raiz.
3. El servicio `frontend` apunta a `frontend/` y el servicio `api` apunta a `api/index.py`.
4. Build command: `npm run build`.
5. Output directory: `build`.
6. Agrega las variables de backend (`MONGO_URL`, `DB_NAME`, `JWT_SECRET`, etc.).
7. Despliega.

El archivo `vercel.json` de la raiz declara el frontend y el entrypoint serverless de FastAPI.
El archivo `frontend/vercel.json` incluye el rewrite necesario para que rutas como `/cursos` y `/nosotros` funcionen al refrescar la pagina.
El archivo `frontend/.npmrc` fuerza `legacy-peer-deps=true` para que Vercel instale las dependencias igual que en la verificacion local.

## Desarrollo Local

Backend:

```bash
cd CRESARA/backend
cp .env.example .env
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

Frontend:

```bash
cd CRESARA/frontend
cp .env.example .env
npm install --legacy-peer-deps
npm run start
```

## Checklist Antes De Produccion

- Cambiar `ADMIN_PASSWORD`.
- Usar MongoDB Atlas u otra base de datos accesible desde el backend.
- Configurar `CORS_ORIGINS` con el dominio real de Vercel.
- Confirmar que `REACT_APP_BACKEND_URL` apunte al backend publico.
- Ejecutar `npm run build` en frontend.
- Ejecutar pruebas de backend contra la URL publica antes de abrir el sitio.
