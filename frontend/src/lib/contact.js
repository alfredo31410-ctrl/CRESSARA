const DEFAULT_CONTACT_EMAIL = "contacto@cresara.com";

export const CONTACT_EMAIL =
  process.env.REACT_APP_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;

export const WHATSAPP_URL = process.env.REACT_APP_WHATSAPP_URL || "";

export function buildInterestMailto(courseTitle) {
  const subject = courseTitle
    ? `Interes en el curso: ${courseTitle}`
    : "Interes en CRESARA";
  const body = courseTitle
    ? `Hola CRESARA, me interesa recibir informacion cuando este disponible el curso "${courseTitle}".`
    : "Hola CRESARA, me interesa recibir informacion sobre sus cursos.";

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
