import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PILLARS = [
  {
    n: "01",
    t: "Sin terapia",
    d: "No reemplazamos un proceso clínico. Damos marcos para entender, decidir y avanzar — sin sustituir a un profesional cuando es necesario.",
  },
  {
    n: "02",
    t: "Sin motivación",
    d: "No prometemos transformaciones milagrosas. Trabajamos con lo que la psicología sabe sobre cómo realmente cambian las personas.",
  },
  {
    n: "03",
    t: "Sin clichés",
    d: "Ni amor propio decorativo ni masculinidad performativa. Solo claridad, criterio y herramientas concretas.",
  },
  {
    n: "04",
    t: "Aplicado",
    d: "Cada concepto se traduce en una decisión, una conversación o un patrón que puedes cambiar esta semana.",
  },
];

export default function Nosotros() {
  return (
    <div data-testid="nosotros-page" className="bg-brand-bg min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-16">
        <p className="overline mb-6">Sobre CRESARA</p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] text-white tracking-tighter font-bold leading-[0.95] max-w-5xl text-balance">
          Educación emocional para Latinoamérica, sin clichés.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-brand-muted max-w-3xl leading-relaxed">
          CRESARA nace de una idea simple: si las emociones gobiernan tantas decisiones, deberían ser materia de estudio. No de motivación. No de moda. De educación real.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <img
            src="https://images.pexels.com/photos/32911550/pexels-photo-32911550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
            alt="Filosofía CRESARA"
            className="w-full h-[40vh] md:h-[55vh] object-cover"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="overline mb-6">Misión</p>
          <h2 className="font-heading text-3xl md:text-5xl text-white tracking-tighter font-medium leading-tight">
            Que entender lo que sientes deje de ser un lujo.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6 text-brand-muted leading-relaxed text-lg">
          <p>
            Nuestra misión es democratizar la psicología aplicada: traducir conceptos clínicos y académicos en programas claros, accionables y profundos, dirigidos a quienes quieren entender mejor sus emociones, sus relaciones y sus decisiones.
          </p>
          <p>
            Trabajamos con tres frentes: <span className="text-white">mujeres</span> (psicología vincular, apego, autoestima), <span className="text-white">hombres</span> (masculinidad consciente, propósito, regulación emocional) y <span className="text-white">relaciones</span> (vínculos sanos, comunicación, decisiones de pareja).
          </p>
          <p>
            No polarizamos. No simplificamos. No prometemos. Educamos.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="overline mb-4">Filosofía</p>
            <h2 className="font-heading text-3xl md:text-5xl text-white tracking-tighter font-medium">
              Lo que nos diferencia.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              data-testid={`pillar-${p.n}`}
              className="rounded-xl border border-white/10 bg-brand-surface p-8 hover:border-brand-pink/30 transition-colors duration-500 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-brand-pink text-sm tracking-widest">{p.n}</span>
                <div>
                  <h3 className="font-heading text-2xl text-white tracking-tight mb-3">{p.t}</h3>
                  <p className="text-brand-muted leading-relaxed">{p.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="border-l-2 border-brand-pink pl-8 md:pl-12 py-2">
          <p className="font-heading text-3xl md:text-5xl text-white tracking-tighter leading-tight font-medium max-w-4xl">
            “Entender lo que sientes… para decidir mejor cómo vivir.”
          </p>
          <p className="mt-4 text-sm font-mono tracking-widest text-brand-subtle uppercase">— CRESARA</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
