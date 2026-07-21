/** Datos y enlaces de contacto centralizados para evitar duplicarlos. */
const DEFAULT_CONTACT_EMAIL = "contacto@somoscressara.com";

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ||
  import.meta.env.REACT_APP_CONTACT_EMAIL ||
  DEFAULT_CONTACT_EMAIL;

export const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL ||
  import.meta.env.REACT_APP_WHATSAPP_URL ||
  "";

export function buildInterestMailto(courseTitle) {
  // Construye un correo listo para enviar y escapa su contenido para la URL.
  const subject = courseTitle
    ? `Interes en el curso: ${courseTitle}`
    : "Interes en CRESARA";
  const body = courseTitle
    ? `Hola CRESARA, me interesa recibir informacion cuando este disponible el curso "${courseTitle}".`
    : "Hola CRESARA, me interesa recibir informacion sobre sus cursos.";

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
