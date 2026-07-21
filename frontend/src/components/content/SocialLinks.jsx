/** Catálogo único de redes y bloque visual para mostrarlas. */
import React from "react";
import { Facebook, Instagram, Music2, Youtube } from "lucide-react";

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@somos.cressara",
    href: "https://www.instagram.com/somos.cressara/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    handle: "Cressara",
    href: "https://www.facebook.com/profile.php?id=61589276789466",
    icon: Facebook,
  },
  {
    label: "TikTok",
    handle: "@somos.cressara",
    href: "https://www.tiktok.com/@somos.cressara",
    icon: Music2,
  },
  {
    label: "YouTube",
    handle: "@Somos.Cressara",
    href: "https://www.youtube.com/@Somos.Cressara",
    icon: Youtube,
  },
];

export default function SocialLinks({ className = "" }) {
  return (
    <section
      data-testid="social-links-section"
      className={`mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32 ${className}`}
    >
      <div className="overflow-hidden rounded-3xl border border-brand-pink/30 bg-white/80 px-7 py-12 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)] md:px-12 md:py-16">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="overline mb-5">Sigue la conversación</p>

            <h2 className="font-heading text-balance text-4xl font-medium leading-[0.97] tracking-tighter text-brand-ink md:text-5xl">
              Cressara también continúa fuera del Club.
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-muted">
              Encuentra reflexiones, herramientas y conversaciones para volver
              a ti también en redes sociales.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            {SOCIAL_LINKS.map(({ label, handle, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir ${label} de Cressara`}
                className="group flex items-center gap-4 rounded-2xl border border-brand-pink/25 bg-white/85 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/60 hover:shadow-[0_18px_35px_-26px_rgba(161,82,186,0.7)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink transition-colors group-hover:bg-brand-pink group-hover:text-white">
                  <Icon size={20} />
                </span>

                <span>
                  <span className="block font-heading text-xl tracking-tight text-brand-ink">
                    {label}
                  </span>

                  <span className="mt-1 block text-sm text-brand-muted">
                    {handle}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
