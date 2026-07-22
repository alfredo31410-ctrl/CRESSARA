/**
 * Presenta los productos digitales independientes de Cressara.
 * Cada producto dirige a su propia página de información y compra.
 */
import React from "react";
import { ArrowUpRight, BookOpen, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";

const EBOOK_LANDING_URL = "/landings/ebook";

export default function Productos() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />

      <main>
        <section className="px-6 pb-16 pt-36 md:px-12 md:pt-44">
          <Reveal className="mx-auto max-w-7xl" distance={32}>
            <p className="overline mb-5">Productos digitales</p>

            <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[0.95] tracking-tighter text-brand-ink md:text-7xl">
              Herramientas para avanzar a tu propio ritmo.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
              Recursos independientes de la membresía Cressara Club, creados
              para acompañarte en diferentes momentos de tu proceso.
            </p>
          </Reveal>
        </section>

        <section className="px-6 pb-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal delay={120} distance={40}>
              <article className="group grid overflow-hidden rounded-3xl border border-brand-pink/25 bg-white/60 shadow-[0_26px_70px_-48px_rgba(161,82,186,0.75)] transition-all duration-700 hover:-translate-y-1 hover:border-brand-pink/50 hover:bg-white/80 hover:shadow-[0_34px_80px_-46px_rgba(161,82,186,0.9)] md:grid-cols-2">
              <div className="min-h-[320px] overflow-hidden bg-brand-elevated md:min-h-[520px]">
                <img
                  src="/productos/ebook-un-espacio-para-volver-a-ti.webp"
                  alt="Ebook Un espacio para volver a ti de Cressara"
                  className="h-full w-full object-cover transition-transform [transition-duration:1400ms] ease-out group-hover:scale-[1.035]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="overline mb-4">Ebook · Compra única</p>

                <h2 className="font-heading text-4xl font-bold tracking-tighter text-brand-ink md:text-5xl">
                  Un espacio para volver a ti
                </h2>

                <p className="mt-5 leading-relaxed text-brand-muted">
                  Un ebook con reflexiones, ejercicios y herramientas prácticas
                  para reconectar contigo y volver a elegirte.
                </p>

                <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <p className="font-heading text-5xl font-bold tracking-tighter text-brand-ink">
                    $57
                  </p>

                  <div className="pb-1">
                    <p className="text-sm font-medium text-brand-text">MXN</p>
                    <p className="text-xs text-brand-muted">Pago único</p>
                  </div>
                </div>

                <ul className="mt-7 space-y-3 text-sm text-brand-text">
                  <li className="flex items-center gap-3">
                    <Download size={17} className="text-brand-pink" />
                    Descarga digital inmediata
                  </li>

                  <li className="flex items-center gap-3">
                    <BookOpen size={17} className="text-brand-pink" />
                    Más de 50 páginas y ejercicios prácticos
                  </li>
                </ul>

                <div className="mt-8">
                  <a
                    href={EBOOK_LANDING_URL}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-pink"
                  >
                    Conocer el ebook por $57
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                </div>

                <p className="mt-4 text-xs text-brand-subtle">
                  No requiere una membresía activa.
                </p>
              </div>
              </article>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
