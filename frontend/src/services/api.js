/** Cliente HTTP compartido por autenticación y administración. */
import axios from "axios";

// Vite expone variables mediante import.meta.env. Se mantiene compatibilidad
// con REACT_APP_* para no romper configuraciones anteriores de Vercel o .env.
const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.REACT_APP_BACKEND_URL ||
  ""
).replace(/\/$/, "");

export const API = `${BACKEND_URL || ""}/api`;

export const api = axios.create({
  baseURL: API,
  // Permite que el navegador envíe la cookie HTTP-only de autenticación.
  withCredentials: true,
});

// Convierte los distintos formatos de error de FastAPI en un mensaje legible.
export function formatApiErrorDetail(detail) {
  if (detail == null) return "Algo salio mal. Intenta de nuevo.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}
