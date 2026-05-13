"""Vercel serverless entrypoint for the FastAPI backend."""

from pathlib import Path
import os
import sys

ROOT_DIR = Path(__file__).resolve().parents[1]
BACKEND_DIR = ROOT_DIR / "backend"

if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault("ENABLE_UNPREFIXED_API", "true")

from server import app  # noqa: E402
