/** Pie compartido con contacto, navegación legal y redes sociales. */
import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import { SOCIAL_LINKS } from "@/components/content/SocialLinks";

export default function Footer() {
  return (
    <footer
      data-testid="main-footer"
      className="mt-24 border-t border-brand-pink/25 bg-white/55"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 md:px-12">
        <div>
          <Link
            to="/"
            className="inline-flex items-center"
            data-testid="footer-logo"
            aria-label="Cressara inicio"
          >
            <BrandLogo size="footer" />
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">
            Educación emocional aplicada para comprender lo que sientes y
            decidir con más claridad cómo vivir.
          </p>

          <a
            href="mailto:contacto@somoscressara.com"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-blue transition-colors hover:text-brand-pink"
          >
            <Mail size={16} />
            contacto@somoscressara.com
          </a>
        </div>

        <div>
          <p className="overline mb-4">Cressara</p>

          <ul className="space-y-3 text-sm text-brand-muted">
            <li>
              <Link
                to="/"
                className="transition-colors hover:text-brand-blue"
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to="/comunidad"
                className="transition-colors hover:text-brand-blue"
              >
                Comunidad
              </Link>
            </li>

            <li>
              <Link
                to="/nosotros"
                className="transition-colors hover:text-brand-blue"
              >
                Nosotros
              </Link>
            </li>

            <li>
              <a
                href="/#contacto"
                className="transition-colors hover:text-brand-blue"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="overline mb-4">Síguenos</p>

          <ul className="space-y-3">
            {SOCIAL_LINKS.map(({ label, handle, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${label} de Cressara`}
                  className="group inline-flex items-center gap-3 text-sm text-brand-muted transition-colors hover:text-brand-blue"
                >
                  <Icon
                    size={17}
                    className="text-brand-pink transition-transform group-hover:scale-110"
                  />

                  <span>
                    {label}
                    <span className="ml-1 text-brand-subtle">{handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="overline mb-4">Legal</p>

          <ul className="space-y-3 text-sm text-brand-muted">
            <li>
              <Link
                to="/aviso-de-privacidad"
                className="transition-colors hover:text-brand-blue"
              >
                Aviso de privacidad
              </Link>
            </li>

            <li>
              <Link
                to="/terminos-y-condiciones"
                className="transition-colors hover:text-brand-blue"
              >
                Términos y condiciones
              </Link>
            </li>
          </ul>

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-brand-muted">
            No es terapia. No reemplaza un proceso clínico. Es educación
            emocional aplicada a la vida real.
          </p>
        </div>
      </div>

      <div className="border-t border-brand-pink/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row md:px-12 md:text-left">
          <p className="text-xs text-brand-subtle">
            © {new Date().getFullYear()} CRESSARA. Todos los derechos
            reservados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-brand-subtle md:justify-end">
            <Link
              to="/aviso-de-privacidad"
              className="transition-colors hover:text-brand-blue"
            >
              Privacidad
            </Link>

            <Link
              to="/terminos-y-condiciones"
              className="transition-colors hover:text-brand-blue"
            >
              Términos
            </Link>

            <span className="font-mono tracking-widest">
              ENTENDER · SANAR · CONSTRUIR · DECIDIR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
