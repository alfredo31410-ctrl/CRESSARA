import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PILLARS = [
  {
    n: "01",
    t: "Con criterio",
    d: "No usamos frases vacías ni soluciones rápidas. Trabajamos con herramientas que ayudan a comprender, decidir y avanzar con más claridad.",
  },
  {
    n: "02",
    t: "Sin reemplazar terapia",
    d: "Cressara no sustituye un proceso clínico cuando es necesario. Lo complementa con educación emocional, reflexión y herramientas aplicables.",
  },
  {
    n: "03",
    t: "Sin clichés",
    d: "No creemos en el amor propio decorativo ni en fórmulas mágicas. Creemos en conversaciones honestas, criterio y práctica.",
  },
  {
    n: "04",
    t: "Aplicado a la vida real",
    d: "Cada concepto debe poder traducirse en una conversación, una decisión o un patrón que puedas mirar diferente esta semana.",
  },
];

export default function Nosotros() {
  return (
    <div data-testid="nosotros-page" className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40">
        <p className="overline mb-6">Sobre Cressara</p>

        <h1 className="font-heading text-balance max-w-5xl text-5xl font-bold leading-[0.95] tracking-tighter text-brand-ink md:text-7xl lg:text-[5.5rem]">
          Educación emocional para volver a decidir con más claridad.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">
          Cressara nace de una idea simple: si las emociones influyen en tantas
          decisiones, merecen ser comprendidas con profundidad, criterio y
          herramientas reales.
        </p>
      </section>

      {/* IMAGEN */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <div className="overflow-hidden rounded-2xl border border-brand-pink/25 bg-white shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)]">
          <img
            src="https://images.pexels.com/photos/32911550/pexels-photo-32911550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
            alt="Filosofía Cressara"
            className="h-[40vh] w-full object-cover md:h-[55vh]"
          />
        </div>
      </section>

      {/* MISIÓN */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-12 md:px-12 md:pb-32">
        <div className="md:col-span-5">
          <p className="overline mb-6">Misión</p>

          <h2 className="font-heading text-balance text-3xl font-medium leading-tight tracking-tighter text-brand-ink md:text-5xl">
            Que entender lo que sientes deje de ser un lujo.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-brand-muted md:col-span-7">
          <p>
            Nuestra misión es acercar la psicología aplicada a la vida
            cotidiana: traducir conceptos emocionales en conversaciones,
            decisiones y herramientas que sí puedas llevar a tu realidad.
          </p>

          <p>
            Cressara es una comunidad para entender emociones, sanar patrones,
            construir relaciones sanas y elegir con dirección. Actualmente,
            Cressara Club abre un espacio mensual especialmente pensado para
            mujeres que quieren volver a escucharse y dejar de ponerse siempre
            al final.
          </p>

          <p className="font-medium text-brand-ink">
            No polarizamos. No simplificamos. No prometemos. Educamos.
          </p>
        </div>
      </section>

      {/* FILOSOFÍA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="mb-12">
          <p className="overline mb-4">Filosofía</p>

          <h2 className="font-heading text-3xl font-medium tracking-tighter text-brand-ink md:text-5xl">
            Lo que nos diferencia.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.n}
              data-testid={`pillar-${pillar.n}`}
              className="animate-fade-up rounded-2xl border border-brand-pink/25 bg-white/85 p-8 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)] transition-colors duration-500 hover:border-brand-pink/55"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-sm tracking-widest text-brand-pink">
                  {pillar.n}
                </span>

                <div>
                  <h3 className="font-heading mb-3 text-2xl tracking-tight text-brand-ink">
                    {pillar.t}
                  </h3>

                  <p className="leading-relaxed text-brand-muted">
                    {pillar.d}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CITA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-20">
        <div className="border-l-2 border-brand-pink py-2 pl-8 md:pl-12">
          <p className="font-heading max-w-4xl text-3xl font-medium leading-tight tracking-tighter text-brand-ink md:text-5xl">
            “Entender lo que sientes… para decidir mejor cómo vivir.”
          </p>

          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-brand-subtle">
            — Cressara
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="relative overflow-hidden rounded-3xl bg-[#6B2E59] p-10 md:p-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-brand-lavender">
              Cressara Club
            </p>

            <h2 className="font-heading text-balance text-4xl font-medium leading-[0.96] tracking-tighter text-white md:text-6xl">
              Un espacio mensual para volver a ti.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-lavender">
              Conoce la comunidad, descubre qué incluye el acompañamiento y
              elige tu espacio con calma.
            </p>

            <Link
              to="/comunidad#cressara-club"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-brand-pink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-blue"
            >
              Conocer Cressara Club
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}