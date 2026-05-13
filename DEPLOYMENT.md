# Cressara Deployment

Esta guia deja el proyecto listo para desplegar el frontend en Vercel y conectar el backend con variables de entorno seguras.

## Estructura

- `frontend/`: aplicacion React/Create React App. Es la parte que va a Vercel.
- `backend/`: API FastAPI. Puede vivir en un hosting para Python como Render, Railway, Fly.io, un VPS o un servicio compatible con ASGI.

## Variables De Entorno

Nunca subas archivos `.env` reales al repositorio. Usa los archivos `.env.example` como plantilla.

### Frontend

En Vercel, dentro de `Project Settings > Environment Variables`:

```env
REACT_APP_BACKEND_URL=https://tu-backend.com
```

Notas:

- No agregues `/api` al final. El codigo lo agrega automaticamente.
- Si el backend queda en un subdominio, por ejemplo `https://api.cressara.com`, usa ese valor.

### Backend

Configura estas variables en el proveedor donde publiques FastAPI:

```env
ENVIRONMENT=production
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=cressara
JWT_SECRET=un-secreto-largo-random-y-privado
ADMIN_EMAIL=admin@cresara.com
ADMIN_PASSWORD=password-fuerte-y-privado
CORS_ORIGINS=https://tu-frontend.vercel.app,https://tudominio.com
COOKIE_SECURE=true
COOKIE_SAMESITE=none
```

Notas:

- `JWT_SECRET` debe ser largo y unico. No uses el ejemplo.
- `CORS_ORIGINS` no debe ser `*` en produccion. Pon exactamente los dominios donde vive el frontend.
- `COOKIE_SECURE=true` es obligatorio cuando uses HTTPS, que es lo normal en produccion.
- `COOKIE_SAMESITE=none` permite que el frontend y el backend vivan en dominios distintos.

## Vercel

Recomendacion para Vercel:

1. Importa el repositorio.
2. Si Vercel detecta el proyecto como monorepo, usa el `vercel.json` de la raiz.
3. El servicio `frontend` apunta a `frontend/` y usa `create-react-app`.
4. Build command: `npm run build`.
5. Output directory: `build`.
6. Agrega `REACT_APP_BACKEND_URL`.
7. Despliega.

El archivo `vercel.json` de la raiz declara solo el servicio `frontend`. El backend se despliega aparte en un hosting compatible con FastAPI.
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
