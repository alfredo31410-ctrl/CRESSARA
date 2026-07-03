const DEFAULT_CONTACT_EMAIL = "contacto@somoscressara.com";

const configuredContactEmail =
  import.meta.env.VITE_CONTACT_EMAIL ||
  import.meta.env.REACT_APP_CONTACT_EMAIL ||
  DEFAULT_CONTACT_EMAIL;

export const CONTACT_EMAIL =
  configuredContactEmail === "contacto@cresara.com"
    ? DEFAULT_CONTACT_EMAIL
    : configuredContactEmail;

export const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL ||
  import.meta.env.REACT_APP_WHATSAPP_URL ||
  "";

export function buildInterestMailto(courseTitle) {
  const subject = courseTitle
    ? `Interes en el curso: ${courseTitle}`
    : "Interes en CRESARA";
  const body = courseTitle
    ? `Hola CRESARA, me interesa recibir informacion cuando este disponible el curso "${courseTitle}".`
    : "Hola CRESARA, me interesa recibir informacion sobre sus cursos.";

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
