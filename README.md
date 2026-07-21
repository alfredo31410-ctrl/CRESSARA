# Cressara

Plataforma de educacion emocional aplicada con frontend en React y backend en FastAPI.

## Estructura

- `frontend/`: aplicación React construida con Vite.
  - `src/pages/`: páginas públicas, legales y administrativas.
  - `src/components/`: componentes de layout, contenido y UI reutilizable.
  - `src/features/`: lógica agrupada por funcionalidad, como autenticación.
  - `src/services/`: acceso a la API y servicios externos.
- `backend/`: API FastAPI, autenticación, cursos y datos iniciales.
- `api/`: punto de entrada serverless para exponer FastAPI en Vercel.
- `docs/`: arquitectura, base de datos, despliegue y lineamientos visuales.

La responsabilidad de cada carpeta y archivo está explicada en
[`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

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

Para producción y Vercel, revisa [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
