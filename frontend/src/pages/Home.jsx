import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Compass, Heart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { api } from "@/lib/api";

const FOCUS_AREAS = [
  {
    key: "mujeres",
    overline: "Para mujeres",
    title: "Psicología vincular",
    description:
      "Apego, autoestima, heridas y dinámicas relacionales. Comprender los patrones que configuran cómo amas y cómo te eliges.",
    image:
      "https://images.unsplash.com/photo-1740801505683-9391efb89106?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxsYXRpbiUyMHdvbWFuJTIwcG9ydHJhaXQlMjBkYXJrJTIwbW9vZHxlbnwwfHx8fDE3NzczOTgwMDl8MA&ixlib=rb-4.1.0&q=85",
    accent: "from-brand-pink/45",
  },
  {
    key: "hombres",
    overline: "Para hombres",
    title: "Masculinidad consciente",
    description:
      "Propósito, regulación emocional y dirección. Una masculinidad madura: ni tóxica, ni complaciente. Solo clara.",
    image:
      "https://images.pexels.com/photos/3140071/pexels-photo-3140071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    accent: "from-brand-blue/50",
  },
  {
    key: "relaciones",
    overline: "Para los dos",
    title: "Relaciones que sostienen",
    description:
      "La unión de ambos mundos. Cómo se construye un vínculo sano: con técnica, con criterio, con honestidad.",
    image:
      "https://images.pexels.com/photos/8272144/pexels-photo-8272144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    accent: "from-brand-pink/30",
  },
];

const BENEFITS = [
  {
    icon: Compass,
    title: "Claridad emocional",
    desc: "Distinguir entre lo que sientes y lo que reaccionas. La diferencia entre vivir y solo responder.",
  },
  {
    icon: Heart,
    title: "Mejores decisiones",
    desc: "Marcos prácticos para decidir desde el criterio, no desde el miedo o la urgencia.",
  },
  {
    icon: Users,
    title: "Vínculos sanos",
    desc: "Relaciones que sostienen en lugar de drenar. Aprender a construirlas y a dejar las que no funcionan.",
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses", { params: { featured: true } })
      .then((r) => setFeatured(r.data.slice(0, 3)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="home-page" className="bg-brand-bg min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/31103737/pexels-photo-31103737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/85 to-brand-bg/40" />
          <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-brand-pink/18 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-brand-blue/25 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-40 w-full">
          <div className="max-w-3xl animate-fade-up">
            <p className="overline mb-6">Educación emocional aplicada</p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[0.95] tracking-tighter font-bold text-balance">
              Entender lo que sientes…<br />
              <span className="text-brand-pink">para decidir mejor</span>
              <br />
              cómo vivir.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-brand-muted max-w-xl leading-relaxed">
              No es terapia. No es motivación. Es psicología real, aplicada a la vida real.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/cursos"
                data-testid="hero-explore-courses-btn"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-blue text-white px-7 py-3.5 text-sm font-medium hover:bg-brand-pink transition-colors duration-300 shadow-[0_0_35px_-14px_rgba(37,99,214,0.95)]"
              >
                Explorar cursos
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/nosotros"
                data-testid="hero-about-link"
                className="inline-flex items-center gap-2 rounded-full border border-brand-pink/40 text-white px-7 py-3.5 text-sm font-medium hover:bg-brand-pink/10 transition-colors"
              >
                Conocer CRESARA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-white/5 py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-8 text-sm font-mono tracking-[0.3em] uppercase text-white/30">
              <span>Entender</span>
              <span className="text-brand-pink">·</span>
              <span>Sanar</span>
              <span className="text-brand-pink">·</span>
              <span>Construir</span>
              <span className="text-brand-pink">·</span>
              <span>Decidir</span>
              <span className="text-brand-pink">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUE ES CRESARA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="overline mb-6">Qué es CRESARA</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-heading text-3xl md:text-5xl text-white leading-tight tracking-tight font-medium text-balance">
              Una plataforma para entender emociones, sanar patrones, construir relaciones sanas y tomar decisiones con dirección.
            </h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm text-brand-muted">
              <div className="border-l border-white/10 pl-5">
                <p className="text-white font-medium mb-2">No es terapia.</p>
                <p>No reemplaza un proceso clínico. Lo complementa con marcos y herramientas.</p>
              </div>
              <div className="border-l border-white/10 pl-5">
                <p className="text-white font-medium mb-2">No es motivación.</p>
                <p>No promete fórmulas mágicas. Trabaja con lo que la psicología entiende sobre cómo cambiamos.</p>
              </div>
              <div className="border-l border-white/10 pl-5">
                <p className="text-white font-medium mb-2">Es psicología aplicada.</p>
                <p>Educación emocional con criterio: para mujeres, hombres y relaciones reales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENFOQUE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p className="overline mb-4">Tres frentes</p>
            <h2 className="font-heading text-3xl md:text-5xl text-white tracking-tighter font-medium">
              Enfoque sin polarizar.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FOCUS_AREAS.map((area, i) => (
            <Link
              to={`/cursos?cat=${area.key}`}
              key={area.key}
              data-testid={`focus-card-${area.key}`}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-brand-surface aspect-[4/5] flex flex-col justify-end animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img
                src={area.image}
                alt={area.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${area.accent} via-brand-bg/60 to-brand-bg/30`} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />
              <div className="relative p-6 md:p-8">
                <p className="overline mb-3">{area.overline}</p>
                <h3 className="font-heading text-2xl md:text-3xl text-white tracking-tight mb-3">
                  {area.title}
                </h3>
                <p className="text-sm text-brand-muted mb-6 leading-relaxed">{area.description}</p>
                <div className="inline-flex items-center gap-2 text-sm text-white">
                  Ver cursos
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <p className="overline mb-4">Cursos destacados</p>
            <h2 className="font-heading text-3xl md:text-5xl text-white tracking-tighter font-medium">
              Empieza por lo esencial.
            </h2>
          </div>
          <Link
            to="/cursos"
            data-testid="featured-see-all-link"
            className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors"
          >
            Ver todos los cursos
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl bg-brand-surface border border-white/5 aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div data-testid="featured-empty" className="rounded-xl border border-dashed border-white/10 p-12 text-center text-brand-muted">
            Pronto publicaremos los primeros cursos destacados.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((c, i) => (
              <CourseCard key={c.id} course={c} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* BENEFITS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="overline mb-6">Beneficios</p>
            <h2 className="font-heading text-3xl md:text-5xl text-white tracking-tighter font-medium leading-tight">
              Lo que vas a notar primero.
            </h2>
          </div>
          <div className="md:col-span-8 grid md:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                data-testid={`benefit-card-${i}`}
                className="rounded-xl border border-white/10 bg-brand-surface p-7 hover:border-brand-pink/40 transition-colors duration-500 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center mb-6">
                  <Icon size={18} className="text-brand-pink" />
                </div>
                <h3 className="font-heading text-xl text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand-surface p-10 md:p-20">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand-pink/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-blue/25 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="overline mb-6">Empieza ahora</p>
            <h2 className="font-heading text-4xl md:text-6xl text-white tracking-tighter leading-[0.95] font-medium text-balance">
              Lo que entiendes hoy decide cómo vivirás mañana.
            </h2>
            <p className="mt-6 text-lg text-brand-muted max-w-xl leading-relaxed">
              Sin clichés. Sin terapia. Sin motivación vacía. Educación emocional con criterio.
            </p>
            <Link
              to="/cursos"
              data-testid="final-cta-btn"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-blue text-white px-7 py-3.5 text-sm font-medium hover:bg-brand-pink transition-colors group shadow-[0_0_35px_-14px_rgba(37,99,214,0.95)]"
            >
              Explorar cursos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
