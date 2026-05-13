import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/cursos", label: "Cursos" },
  { to: "/nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="main-navbar"
      className="fixed top-0 inset-x-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="navbar-logo"
          className="flex items-center"
          aria-label="Cressara inicio"
        >
          <BrandLogo size="nav" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? "text-white" : "text-brand-muted hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/cursos"
          data-testid="navbar-cta"
          className="hidden md:inline-flex items-center rounded-full bg-brand-blue text-white px-5 py-2 text-sm font-medium hover:bg-brand-pink transition-colors duration-300 shadow-[0_0_30px_-12px_rgba(37,99,214,0.9)]"
        >
          Explorar cursos
        </Link>

        <button
          onClick={() => setOpen((o) => !o)}
          data-testid="navbar-mobile-toggle"
          className="md:hidden text-white"
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="navbar-mobile-panel"
          className="md:hidden border-t border-white/5 bg-brand-bg"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-base ${isActive ? "text-white" : "text-brand-muted"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/cursos"
              onClick={() => setOpen(false)}
              data-testid="navbar-mobile-cta"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-blue text-white px-5 py-2.5 text-sm font-medium"
            >
              Explorar cursos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
