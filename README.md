# Cressara

Plataforma de educacion emocional aplicada con frontend en React y backend en FastAPI.

## Carpetas Principales

- `frontend/`: aplicacion publica y panel de administracion.
- `backend/`: API, autenticacion, cursos y seed inicial de administrador.
- `DATABASE.md`: guia para conectar MongoDB Atlas y verificar la base de datos.
- `DEPLOYMENT.md`: guia para configurar produccion, Vercel y variables de entorno.

## Configuracion

El proyecto usa variables de entorno. Los archivos reales `.env` no se suben al repositorio.

- Copia `backend/.env.example` a `backend/.env` para desarrollo local.
- Copia `frontend/.env.example` a `frontend/.env` para desarrollo local.
- En produccion, configura esas mismas variables directamente en el proveedor de hosting.

## Comandos Rapidos

Frontend:

```bash
cd CRESARA/frontend
npm install --legacy-peer-deps
npm run start
```

Backend:

```bash
cd CRESARA/backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

Para produccion y Vercel, revisa `DEPLOYMENT.md`.
