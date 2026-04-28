import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      data-testid="main-footer"
      className="border-t border-white/5 bg-brand-bg mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <Link
            to="/"
            className="font-heading font-bold tracking-tighter text-2xl text-white"
            data-testid="footer-logo"
          >
            CRESARA<span className="text-brand-pink">.</span>
          </Link>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed max-w-xs">
            Educación emocional aplicada. Psicología real para decidir mejor cómo vivir.
          </p>
        </div>

        <div>
          <p className="overline mb-4">Plataforma</p>
          <ul className="space-y-3 text-sm text-brand-muted">
            <li>
              <Link to="/cursos" className="hover:text-white transition-colors">
                Cursos
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-white transition-colors">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-white transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="overline mb-4">Filosofía</p>
          <p className="text-sm text-brand-muted leading-relaxed max-w-sm">
            No es terapia. No es motivación. Es psicología aplicada a la vida real.
          </p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-subtle">
            © {new Date().getFullYear()} CRESARA. Todos los derechos reservados.
          </p>
          <p className="text-xs text-brand-subtle font-mono tracking-widest">
            ENTENDER · SANAR · CONSTRUIR · DECIDIR
          </p>
        </div>
      </div>
    </footer>
  );
}
