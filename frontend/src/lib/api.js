import axios from "axios";

// CRA injects REACT_APP_* variables at build time. In Vercel this must point
// to the public backend URL, for example https://api.cressara.com.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "");

if (!BACKEND_URL) {
  throw new Error(
    "Missing REACT_APP_BACKEND_URL. Configure it in frontend/.env or in Vercel Environment Variables."
  );
}

export const API = `${BACKEND_URL}/api`;

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
