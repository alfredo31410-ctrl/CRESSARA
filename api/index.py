"""Punto de entrada serverless que permite ejecutar FastAPI en Vercel."""

from pathlib import Path
import os
import sys

ROOT_DIR = Path(__file__).resolve().parents[1]
BACKEND_DIR = ROOT_DIR / "backend"

# Vercel carga este archivo desde api/, por eso se agrega backend/ a Python.
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

# El enrutador de Vercel ya consume /api; habilitamos rutas internas sin prefijo.
os.environ.setdefault("ENABLE_UNPREFIXED_API", "true")

from server import app  # noqa: E402
