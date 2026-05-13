import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Mail, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { buildInterestMailto, WHATSAPP_URL } from "@/lib/contact";

const CATEGORY_LABEL = {
  mujeres: "Mujeres",
  hombres: "Hombres",
  relaciones: "Relaciones",
};

export default function CursoDetalle() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get(`/courses/${id}`)
      .then((r) => setCourse(r.data))
      .catch((e) => setError(e.response?.status === 404 ? "Curso no encontrado." : "Error cargando curso."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div data-testid="curso-detalle-page" className="bg-brand-bg min-h-screen">
      <Navbar />

      <div className="pt-28">
        {loading ? (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            <div className="aspect-[21/9] w-full rounded-2xl bg-brand-surface animate-pulse" />
            <div className="mt-8 h-10 w-2/3 bg-brand-surface rounded animate-pulse" />
          </div>
        ) : error ? (
          <div className="max-w-3xl mx-auto px-6 md:px-12 py-24 text-center">
            <p className="overline mb-4">Error</p>
            <h1 className="font-heading text-4xl md:text-5xl text-white tracking-tighter">{error}</h1>
            <Link
              to="/cursos"
              data-testid="back-to-courses"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue text-white px-6 py-3 text-sm font-medium hover:bg-brand-pink transition-colors"
            >
              <ArrowLeft size={16} /> Volver a cursos
            </Link>
          </div>
        ) : course ? (
          <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden">
            <div className="absolute inset-0">
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/90 to-brand-bg/55" />
              <div className="absolute inset-0 grid-noise opacity-35" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-24 min-h-[calc(100vh-7rem)] flex items-center">
              <div className="max-w-4xl">
                <Link
                  to="/cursos"
                  data-testid="back-link"
                  className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors mb-6 w-fit"
                >
                  <ArrowLeft size={16} /> Cursos
                </Link>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="overline bg-white/5 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                    {CATEGORY_LABEL[course.category]}
                  </span>
                  {course.featured && (
                    <span className="overline bg-brand-pink/15 text-brand-pink border border-brand-pink/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                      <Sparkles size={11} /> Destacado
                    </span>
                  )}
                  <span className="overline bg-brand-blue/20 text-white border border-brand-blue/35 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Bell size={11} /> Proximamente
                  </span>
                </div>

                <p className="overline mb-5">Curso en preparacion</p>
                <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] text-white tracking-tighter font-bold leading-[0.92] text-balance">
                  {course.title}
                </h1>
                <p className="mt-8 text-lg md:text-xl text-brand-muted leading-relaxed max-w-2xl">
                  La ficha ya esta disponible para que conozcas el enfoque, pero el acceso completo abrira proximamente. Dejanos tu interes y te avisamos cuando este listo.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={buildInterestMailto(course.title)}
                    data-testid="course-enroll-btn"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue text-white px-7 py-3.5 text-sm font-medium hover:bg-brand-pink transition-colors shadow-[0_0_35px_-14px_rgba(37,99,214,0.95)]"
                  >
                    <Mail size={16} />
                    Avisarme
                  </a>
                  <a
                    href={WHATSAPP_URL || buildInterestMailto(course.title)}
                    target={WHATSAPP_URL ? "_blank" : undefined}
                    rel={WHATSAPP_URL ? "noreferrer" : undefined}
                    data-testid="course-buy-btn"
                    className="inline-flex items-center justify-center rounded-full bg-transparent border border-brand-pink/40 text-white px-7 py-3.5 text-sm font-medium hover:bg-brand-pink/10 transition-colors"
                  >
                    Contacto directo
                  </a>
                </div>

                <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl">
                  <div className="border-l border-brand-pink/40 pl-4">
                    <p className="text-white text-sm font-medium">Ficha visible</p>
                    <p className="mt-2 text-sm text-brand-muted">Puedes revisar el enfoque y guardar el curso.</p>
                  </div>
                  <div className="border-l border-brand-blue/45 pl-4">
                    <p className="text-white text-sm font-medium">Apertura pronto</p>
                    <p className="mt-2 text-sm text-brand-muted">El acceso completo se habilitara cuando el contenido este listo.</p>
                  </div>
                  <div className="border-l border-white/15 pl-4">
                    <p className="text-white text-sm font-medium">Aviso directo</p>
                    <p className="mt-2 text-sm text-brand-muted">Te contactamos con fechas y siguientes pasos.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
