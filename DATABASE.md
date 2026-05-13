# Cressara Database

La API usa MongoDB como base de datos principal. Las colecciones se crean automaticamente cuando el backend arranca por primera vez.

## Colecciones

- `users`: usuarios administradores.
- `courses`: cursos visibles en la plataforma.

## Variables

```env
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=cressara
MONGO_TIMEOUT_MS=5000
```

## MongoDB Atlas

1. Crea un proyecto en MongoDB Atlas.
2. Crea un cluster.
3. Crea un usuario de base de datos con password fuerte.
4. En `Network Access`, permite la IP del backend. Para pruebas iniciales puedes usar `0.0.0.0/0`; para produccion conviene restringirlo si tu hosting lo permite.
5. Copia el connection string `mongodb+srv://...`.
6. Reemplaza usuario y password en `MONGO_URL`.
7. Configura `MONGO_URL` y `DB_NAME` en el hosting del backend.

## Verificacion

Cuando el backend este publicado, visita:

```text
https://tu-backend.com/api/health/db
```

Respuesta esperada:

```json
{
  "status": "ok",
  "service": "cresara",
  "database": "cressara"
}
```

Si falla, revisa:

- Credenciales de `MONGO_URL`.
- `Network Access` en Atlas.
- Nombre de `DB_NAME`.
- Logs del backend.
