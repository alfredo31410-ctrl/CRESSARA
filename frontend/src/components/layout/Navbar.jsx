/** Navegación principal para escritorio y dispositivos móviles. */
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/comunidad", label: "Comunidad" },
  { to: "/productos", label: "Productos" },
  { to: "/nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="main-navbar"
      className="fixed inset-x-0 top-0 z-50 glass"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          data-testid="navbar-logo"
          className="flex items-center"
          aria-label="Cressara inicio"
          onClick={() => setOpen(false)}
        >
          <BrandLogo size="nav" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "font-medium text-white"
                    : "text-brand-lavender/85 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/#contacto"
            data-testid="navbar-contact-link"
            className="inline-flex items-center rounded-full border border-brand-lavender/45 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-pink/15"
          >
            Contacto
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          data-testid="navbar-mobile-toggle"
          className="text-white md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="navbar-mobile-panel"
          className="border-t border-brand-lavender/20 bg-[#5B274B] md:hidden"
        >
          <div className="flex flex-col gap-5 px-6 py-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-base transition-colors ${
                    isActive
                      ? "font-medium text-white"
                      : "text-brand-lavender/85 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/comunidad"
              onClick={() => setOpen(false)}
              data-testid="navbar-mobile-cta"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-pink"
            >
              Conocer la comunidad
            </Link>

            <a
              href="/#contacto"
              onClick={() => setOpen(false)}
              data-testid="navbar-mobile-contact-link"
              className="inline-flex items-center justify-center rounded-full border border-brand-lavender/45 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-pink/15"
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
