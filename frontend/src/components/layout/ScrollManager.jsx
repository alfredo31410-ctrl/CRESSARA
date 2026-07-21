/**
 * Controla la posición del scroll después de navegar.
 * Las páginas normales comienzan arriba y los enlaces con # buscan su sección.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const sectionId = hash.replace("#", "");

      requestAnimationFrame(() => {
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });

      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash]);

  return null;
}
