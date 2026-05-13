import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, PlayCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { buildInterestMailto, WHATSAPP_URL } from "@/lib/contact";

const CATEGORY_LABEL = {
  mujeres: "Mujeres",
  hombres: "Hombres",
  relaciones: "Relaciones",
};

function toEmbed(url) {
  if (!url) return "";
  // YouTube watch -> embed
  const ytWatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  const ytShort = url.match(/youtu\.be\/([^?]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  return url;
}

export default function CursoDetalle() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
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
          <>
            {/* Banner */}
            <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-brand-bg/40" />
              <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-12">
                <Link
                  to="/cursos"
                  data-testid="back-link"
                  className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors mb-6 w-fit"
                >
                  <ArrowLeft size={16} /> Cursos
                </Link>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="overline bg-white/5 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                    {CATEGORY_LABEL[course.category]}
                  </span>
                  {course.featured && (
                    <span className="overline bg-brand-pink/15 text-brand-pink border border-brand-pink/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                      <Sparkles size={11} /> Destacado
                    </span>
                  )}
                </div>
                <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-bold max-w-4xl leading-[0.95]">
                  {course.title}
                </h1>
              </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-12 gap-12">
              <div className="md:col-span-8">
                <p className="overline mb-4">Sobre este curso</p>
                <p className="text-xl md:text-2xl text-white leading-relaxed font-light text-balance">
                  {course.description}
                </p>

                {course.video_url && (
                  <div className="mt-12">
                    <p className="overline mb-4 inline-flex items-center gap-2">
                      <PlayCircle size={14} /> Video introductorio
                    </p>
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                      <iframe
                        data-testid="course-video"
                        src={toEmbed(course.video_url)}
                        title={course.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {course.extra_content && (
                  <div className="mt-12">
                    <p className="overline mb-4">Contenido adicional</p>
                    <div className="rounded-xl border border-white/10 bg-brand-surface p-6 md:p-8 text-brand-muted leading-relaxed whitespace-pre-line">
                      {course.extra_content}
                    </div>
                  </div>
                )}
              </div>

              <aside className="md:col-span-4">
                <div className="sticky top-28 rounded-xl border border-white/10 bg-brand-surface p-7">
                  <p className="overline mb-3">Acceso</p>
                  <span className="mb-4 inline-flex w-fit rounded-full border border-brand-pink/30 bg-brand-pink/15 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.2em] text-brand-pink">
                    Proximamente
                  </span>
                  <h3 className="font-heading text-2xl text-white tracking-tight mb-2">
                    Lista de interes
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-6">
                    Próximamente disponible para inscripción. Déjanos tu interés.
                  </p>
                  <a
                    href={buildInterestMailto(course.title)}
                    data-testid="course-enroll-btn"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue text-white px-6 py-3 text-sm font-medium hover:bg-brand-pink transition-colors"
                  >
                    <Mail size={16} />
                    Avisarme
                  </a>
                  <a
                    href={WHATSAPP_URL || buildInterestMailto(course.title)}
                    target={WHATSAPP_URL ? "_blank" : undefined}
                    rel={WHATSAPP_URL ? "noreferrer" : undefined}
                    data-testid="course-buy-btn"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-transparent border border-white/15 text-white px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    Contacto directo
                  </a>
                  <div className="mt-6 pt-6 border-t border-white/10 text-xs text-brand-subtle font-mono tracking-wider">
                    CRESARA · {CATEGORY_LABEL[course.category].toUpperCase()}
                  </div>
                </div>
              </aside>
            </section>
          </>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
