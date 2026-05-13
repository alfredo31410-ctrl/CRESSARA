import axios from "axios";

// CRA injects REACT_APP_* variables at build time. If this is empty, the
// frontend uses the same Vercel domain and calls /api directly.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "");

export const API = `${BACKEND_URL || ""}/api`;

export const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

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
