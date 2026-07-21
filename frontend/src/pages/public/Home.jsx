/** Página de inicio y recorrido principal de presentación de Cressara. */
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Compass,
  Heart,
  Mail,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VideoPreview from "@/components/content/VideoPreview";
import {
  buildInterestMailto,
  CONTACT_EMAIL,
  WHATSAPP_URL,
} from "@/services/contact";

const HOTMART_URL =
  "https://pay.hotmart.com/W106231401S?off=lc9k824d&checkoutMode=10&bid=1783099219778";

const VIDEOS = [
  {
    id: "sCJNelikVvo",
    title: "Reconecta contigo",
    description:
      "Una conversación para mirar lo que necesitas y volver a escucharte con más claridad.",
    url: "https://www.youtube.com/watch?v=sCJNelikVvo&t=547s",
    embedUrl: "https://www.youtube-nocookie.com/embed/sCJNelikVvo?start=547&rel=0&playsinline=1",
  },
  {
    id: "DsgM15nvh84",
    title: "Reconectar contigo también importa",
    description:
      "Una conversación para comprender los cambios, las emociones y la importancia de darte espacio.",
    url: "https://www.youtube.com/watch?v=DsgM15nvh84&t=1947s",
    embedUrl: "https://www.youtube-nocookie.com/embed/DsgM15nvh84?start=1947&rel=0&playsinline=1",
  },
  {
    id: "c7rzGoN8Qfc",
    title: "Rompe patrones y elige diferente",
    description:
      "Una reflexión para identificar lo que repites y empezar a elegir desde un lugar más consciente.",
    url: "https://www.youtube.com/watch?v=c7rzGoN8Qfc&t=1668s",
    embedUrl: "https://www.youtube-nocookie.com/embed/c7rzGoN8Qfc?start=1668&rel=0&playsinline=1",
  },
];

const BENEFITS = [
  {
    icon: Compass,
    title: "Más claridad",
    desc: "Entender lo que sientes para distinguir tus necesidades, emociones y decisiones.",
  },
  {
    icon: Heart,
    title: "Límites sanos",
    desc: "Aprender a priorizarte sin culpa y a dejar de ponerte siempre al final.",
  },
  {
    icon: Users,
    title: "Conexión contigo",
    desc: "Volver a escucharte, reconocerte y recuperar una relación más cercana contigo.",
  },
  {
    icon: CalendarDays,
    title: "Espacio propio",
    desc: "Una hora a la semana para hacer una pausa y regresar a lo que también necesitas.",
  },
  {
    icon: MessageCircle,
    title: "Acompañamiento real",
    desc: "Compartir un proceso con mujeres que también quieren avanzar con más calma y claridad.",
  },
  {
    icon: Sparkles,
    title: "Más confianza",
    desc: "Recuperar criterio, voz propia y seguridad para elegir cómo quieres vivir.",
  },
];

export default function Home() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* Presentación principal */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/31103737/pexels-photo-31103737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
            alt=""
            className="h-full w-full object-cover opacity-50"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#4A263A]/90 via-[#6B2E59]/65 to-[#6B2E59]/25" />

          <div className="absolute -left-32 -top-40 h-[600px] w-[600px] animate-pulse-soft rounded-full bg-brand-pink/18 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 h-[600px] w-[600px] animate-pulse-soft rounded-full bg-brand-blue/25 blur-3xl [animation-delay:1.4s]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 md:px-12">
          <div className="max-w-3xl animate-fade-up">
           <p className="overline mb-6 text-[#ffffff]">Educación emocional aplicada</p>
            <h1 className="font-heading text-balance text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-[5.5rem]">
              <span className="text-brand-pink">Entender</span> lo que sientes…              <br />
              <span className="text-brand-pink">para decidir mejor</span>
              <br />
              cómo vivir.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              No es terapia. No es motivación. Es psicología real, aplicada a
              la vida real.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/comunidad"
                data-testid="hero-community-btn"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_-14px_rgba(161,82,186,0.95)] transition-colors duration-300 hover:bg-brand-pink"
              >
                Conoce la comunidad
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/nosotros"
                data-testid="hero-about-link"
                className="inline-flex items-center gap-2 rounded-full border border-brand-lavender/60 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Conocer CRESSARA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cinta animada de conceptos */}
      <section className="overflow-hidden border-y border-brand-pink/25 py-6">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="mx-8 flex items-center gap-16 font-mono text-sm uppercase tracking-[0.3em] text-brand-ink"
            >
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

      {/* QUÉ ES CRESARA */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="animate-fade-up md:col-span-4">
            <p className="overline mb-6">Qué es CRESARA</p>
          </div>

          <div className="animate-fade-up md:col-span-8 [animation-delay:120ms]">
            <h2 className="font-heading text-balance text-3xl font-medium leading-tight tracking-tight text-brand-ink md:text-5xl">
              Una comunidad para entender emociones, sanar patrones, construir
              relaciones sanas y tomar decisiones con dirección.
            </h2>

            <div className="mt-10 grid gap-6 text-sm text-brand-muted md:grid-cols-3">
              <div className="border-l border-brand-pink/35 pl-5 transition-transform duration-500 hover:translate-x-1">
                <p className="mb-2 font-medium text-brand-ink">No es terapia.</p>
                <p>
                  No reemplaza un proceso clínico. Lo complementa con marcos y
                  herramientas.
                </p>
              </div>

              <div className="border-l border-brand-pink/35 pl-5 transition-transform duration-500 hover:translate-x-1">
                <p className="mb-2 font-medium text-brand-ink">
                  No es motivación.
                </p>
                <p>
                  No promete fórmulas mágicas. Trabaja con lo que la psicología
                  entiende sobre cómo cambiamos.
                </p>
              </div>

              <div className="border-l border-brand-pink/35 pl-5 transition-transform duration-500 hover:translate-x-1">
                <p className="mb-2 font-medium text-brand-ink">
                  Es psicología aplicada.
                </p>
                <p>
                  Educación emocional con criterio: para mujeres, hombres y
                  relaciones reales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS DE LA COMUNIDAD */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="mb-12 flex flex-col gap-5 md:mb-16">
          <div>
            <p className="overline mb-4">Comunidad Cressara</p>

            <h2 className="font-heading text-balance text-3xl font-medium tracking-tighter text-brand-ink md:text-5xl">
              Conversaciones para volver a ti.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            Un espacio para detenerte un momento, comprender lo que estás
            viviendo y recordar que tú también importas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VIDEOS.map((video, index) => (
            <article
              key={video.id}
              data-testid={`community-video-${index + 1}`}
              className="group animate-fade-up overflow-hidden rounded-2xl border border-brand-pink/25 bg-white/90 shadow-[0_22px_50px_-34px_rgba(161,82,186,0.72)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-pink/55 hover:shadow-[0_28px_60px_-34px_rgba(161,82,186,0.9)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VideoPreview video={video} />

              <div className="p-6">
                <h3 className="font-heading text-2xl tracking-tight text-brand-ink">
                  {video.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {video.description}
                </p>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-blue transition-colors hover:text-brand-pink"
                >
                  Ver en YouTube
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

       {/* BANNER CRESSARA CLUB */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="mb-10 max-w-3xl">
          <p className="overline mb-4">Cressara Club</p>

          <h2 className="font-heading text-balance text-3xl font-medium tracking-tighter text-brand-ink md:text-5xl">
            Empieza por lo esencial.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            Date un espacio para comprender lo que estás viviendo, reconectar
            contigo y avanzar con más claridad.
          </p>
        </div>

        <Link
          to="/comunidad#cressara-club"
          data-testid="community-banner-link"
          className="group relative block overflow-hidden rounded-2xl border border-brand-lavender/40 bg-white shadow-[0_0_55px_-30px_rgba(255,122,172,0.55)]"
        >
          <img
            src="/cressara-club/banner-comunidad.png"
            alt="Conoce nuestra comunidad Cressara"
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#4A263A]/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-full bg-[#6B2E59]/90 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm md:inline-flex">
            Conocer Cressara Club
            <ArrowRight size={16} />
          </div>
        </Link>
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="overline mb-6">Vuelve a ti</p>

            <h2 className="font-heading text-balance text-3xl font-medium leading-tight tracking-tighter text-brand-ink md:text-5xl">
              Lo que puedes empezar a recuperar.
            </h2>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-brand-muted">
              Un proceso mensual para acompañarte a recuperar claridad, voz
              propia y espacio para ti.
            </p>
          </div>

          <div className="grid gap-6 md:col-span-8 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, desc }, index) => (
              <div
                key={title}
                data-testid={`benefit-card-${index}`}
              className="animate-fade-up rounded-xl border border-brand-pink/25 bg-white/85 p-7 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-pink/55 hover:shadow-[0_22px_44px_-30px_rgba(161,82,186,0.75)]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-brand-pink/20 bg-brand-pink/10">
                  <Icon size={18} className="text-brand-pink" />
                </div>

                <h3 className="font-heading mb-3 text-xl tracking-tight text-brand-ink">
                  {title}
                </h3>

                <p className="text-sm leading-relaxed text-brand-muted">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-24 md:px-12 md:pb-32"
      >
        <div className="grid items-start gap-10 border-y border-brand-pink/25 py-16 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <p className="overline mb-4">Contacto</p>

            <h2 className="font-heading text-balance text-3xl font-medium leading-tight tracking-tighter text-brand-ink md:text-5xl">
              ¿Tienes dudas antes de volver a ti?
            </h2>
          </div>

          <div className="md:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-brand-muted">
              Conoce Cressara Club, resuelve tus preguntas y elige tu espacio
              con calma. Estamos aquí para orientarte.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={buildInterestMailto()}
                data-testid="home-contact-email"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-pink"
              >
                <Mail size={16} />
                Escribir correo
              </a>

              {WHATSAPP_URL && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="home-contact-whatsapp"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-pink/50 px-6 py-3 text-sm font-medium text-brand-ink transition-colors hover:bg-brand-pink/15"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              )}
            </div>

            <p className="mt-5 font-mono text-xs tracking-wider text-brand-subtle">
              {CONTACT_EMAIL}
            </p>
          </div>
        </div>
      </section>

      {/* Llamado final a conocer la comunidad */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div
          id="cressara-club-home"
          className="relative animate-fade-up overflow-hidden rounded-2xl border border-brand-pink/35 bg-[#6B2E59] p-10 shadow-[0_26px_70px_-45px_rgba(91,39,75,0.95)] transition-transform duration-700 hover:-translate-y-1 md:p-20"
        >
          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] animate-pulse-soft rounded-full bg-brand-pink/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] animate-pulse-soft rounded-full bg-brand-blue/35 blur-3xl [animation-delay:1.2s]" />

          <div className="relative max-w-3xl">
            <p className="overline mb-6">Cressara Club</p>

            <h2 className="font-heading text-balance text-4xl font-medium leading-[0.95] tracking-tighter text-white md:text-6xl">
              Después de tanto cuidar, resolver y sostener… también llegó el
              momento de volver a ti.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-lavender">
              Un acompañamiento mensual para mujeres que quieren reconectar
              consigo mismas, recuperar claridad y dejar de ponerse siempre al
              final.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={HOTMART_URL}
                target="_blank"
                rel="noreferrer"
                data-testid="final-hotmart-btn"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-pink px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_-14px_rgba(255,122,172,0.95)] transition-colors hover:bg-brand-blue"
              >
                Quiero mi lugar
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <Link
                to="/comunidad#cressara-club"
                data-testid="final-community-link"
                className="inline-flex items-center gap-2 rounded-full border border-brand-lavender/55 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Ver qué incluye
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
