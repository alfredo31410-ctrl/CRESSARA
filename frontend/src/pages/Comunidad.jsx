import React from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CirclePlay,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import VideoPreview from "@/components/VideoPreview";

const HOTMART_URL =
  "https://pay.hotmart.com/W106231401S?off=lc9k824d&checkoutMode=10&bid=1783099219778";

const VIDEOS = [
  {
    id: "sCJNelikVvo",
    title: "Una pausa para volver a ti",
    description:
      "Una reflexión para recordar que también mereces escucharte.",
    url: "https://www.youtube.com/watch?v=sCJNelikVvo&t=547s",
    embedUrl: "https://www.youtube-nocookie.com/embed/sCJNelikVvo?start=547&rel=0&playsinline=1",
  },
  {
    id: "DsgM15nvh84",
    title: "Reconectar contigo también importa",
    description:
      "No tienes que resolverlo todo sola ni dejarte siempre para después.",
    url: "https://www.youtube.com/watch?v=DsgM15nvh84&t=1947s",
    embedUrl: "https://www.youtube-nocookie.com/embed/DsgM15nvh84?start=1947&rel=0&playsinline=1",
  },
  {
    id: "c7rzGoN8Qfc",
    title: "Un espacio para ti",
    description:
      "Mirar lo que repites también puede abrir una nueva forma de elegir.",
    url: "https://www.youtube.com/watch?v=c7rzGoN8Qfc&t=1668s",
    embedUrl: "https://www.youtube-nocookie.com/embed/c7rzGoN8Qfc?start=1668&rel=0&playsinline=1",
  },
];

const MONTH_STEPS = [
  {
    week: "Semana 1",
    schedule: "Lunes · 11:00 a.m.",
    format: "Encuentro en vivo",
    title: "Conversaciones que despiertan",
    description:
      "Un encuentro en vivo para comprender lo que estás viviendo y abrir espacio a nuevas preguntas.",
  },
  {
    week: "Semana 2",
    schedule: "Lunes · 11:00 a.m.",
    format: "Reflexión guiada",
    title: "Círculo de lectura emocional",
    description:
      "Un espacio de reflexión guiada para mirar tus emociones con más claridad y criterio.",
  },
  {
    week: "Semana 3",
    schedule: "Miércoles · 10:00 a.m.",
    format: "Encuentro grupal",
    title: "Reconstrucción personal",
    description:
      "Un encuentro grupal para reconocer patrones, recuperar dirección y avanzar paso a paso.",
  },
  {
    week: "Semana 4",
    schedule: "Lunes · 11:00 a.m.",
    format: "Cierre mensual",
    title: "Brújula emocional",
    description:
      "Un cierre mensual para integrar lo aprendido y llevarlo a decisiones reales en tu vida.",
  },
];

const CLUB_BENEFITS = [
  {
    icon: Sparkles,
    title: "Más claridad",
    description:
      "Para comprender lo que sientes y dejar de reaccionar desde el cansancio o la urgencia.",
  },
  {
    icon: HeartHandshake,
    title: "Más conexión contigo",
    description:
      "Para volver a escucharte, reconocerte y recuperar una relación más cercana contigo.",
  },
  {
    icon: UsersRound,
    title: "Comunidad que sostiene",
    description:
      "Un espacio compartido con mujeres que también están eligiendo volver a sí mismas.",
  },
  {
    icon: CalendarDays,
    title: "Una hora para ti",
    description:
      "Un momento semanal para hacer una pausa, respirar y poner atención en lo que necesitas.",
  },
];

const FAQS = [
  {
    question: "¿Cressara Club es terapia?",
    answer:
      "No. Cressara Club es un espacio de educación emocional y acompañamiento grupal. No sustituye un proceso clínico individual cuando este es necesario.",
  },
  {
    question: "¿Qué incluye mi inscripción mensual?",
    answer:
      "Incluye cuatro encuentros mensuales en vivo, actividades de reflexión, acompañamiento grupal y un espacio de comunidad.",
  },
  {
    question: "¿Para quién es Cressara Club?",
    answer:
      "Para mujeres que sienten que han cuidado, resuelto o sostenido demasiado tiempo y quieren recuperar claridad, conexión y espacio propio.",
  },
  {
    question: "¿Cómo me inscribo?",
    answer:
      "Puedes dar clic en “Quiero mi lugar” o escanear el código QR para abrir el checkout de Hotmart.",
  },
];

export default function Comunidad() {
  return (
    <div data-testid="community-page" className="min-h-screen bg-brand-bg">
      <Navbar />

      {/* HERO */}
      <section
        id="cressara-club"
        className="scroll-mt-24 bg-gradient-to-br from-[#5B274B] via-[#8E477B] to-[#D95091] px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-brand-lavender">
             Comunidad Cressara
            </p>

            <h1 className="font-heading text-balance text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl">
              Después de tanto cuidar, resolver y sostener…
              <span className="block text-brand-lavender">
                también llegó el momento de volver a ti.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Un acompañamiento mensual para mujeres que quieren reconectar
              consigo mismas, recuperar claridad y dejar de ponerse siempre al
              final.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={HOTMART_URL}
                target="_blank"
                rel="noreferrer"
                data-testid="community-hero-hotmart"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-pink px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_-14px_rgba(255,122,172,0.95)] transition-colors hover:bg-brand-blue"
              >
                Quiero mi lugar
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#que-incluye"
                className="inline-flex items-center gap-2 rounded-full border border-brand-lavender/60 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Ver qué incluye
              </a>
            </div>
          </div>

          <div className="animate-fade-up rounded-3xl border border-white/20 bg-white/10 p-7 shadow-[0_22px_60px_-42px_rgba(255,122,172,0.75)] backdrop-blur-sm transition-transform duration-700 hover:-translate-y-1 md:col-span-5 md:p-9 [animation-delay:160ms]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-lavender">
              Acompañamiento mensual
            </p>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-heading text-5xl font-bold tracking-tighter text-white">
              <span>$197</span>
              <span className="text-lg font-medium tracking-normal text-brand-lavender">
                MXN al mes
              </span>
            </p>

            <div className="mt-7 space-y-4 text-sm leading-relaxed text-white/85">
              <p className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-lavender"
                />
                4 encuentros en vivo al mes.
              </p>

              <p className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-lavender"
                />
                Un espacio guiado para volver a ti.
              </p>

              <p className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-lavender"
                />
                Comunidad y acompañamiento emocional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALIDACIÓN EMOCIONAL */}
      <section className="mx-auto max-w-7xl px-6 pt-20 md:px-12 md:pt-28">
        <div className="relative animate-fade-up overflow-hidden rounded-3xl border border-brand-pink/30 bg-white/80 px-7 py-10 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)] md:px-12 md:py-14">
          <div className="absolute -right-20 -top-20 h-56 w-56 animate-pulse-soft rounded-full bg-brand-pink/20 blur-3xl" />

          <div className="relative max-w-4xl">
            <p className="overline mb-5">Un recordatorio para ti</p>

            <h2 className="font-heading text-balance text-4xl font-medium leading-[0.98] tracking-tighter text-brand-ink md:text-6xl">
              No estás exagerando.
              <br />
              No estás fallando.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">
              Lo que sientes es real. Has cuidado, resuelto y sostenido muchas
              cosas durante mucho tiempo. También mereces un espacio para
              comprenderte con calma y volver a escucharte.
            </p>
          </div>
        </div>
      </section>

      {/* PARA QUIÉN ES */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="overline mb-6">Para quién es</p>
          </div>

          <div className="md:col-span-8">
            <h2 className="font-heading text-balance text-3xl font-medium leading-tight tracking-tight text-brand-ink md:text-5xl">
              Para mujeres que sienten que ha llegado el momento de dejar de
              ponerse siempre para después.
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                "Te has puesto al final demasiadas veces.",
                "Te sientes cansada, desconectada o saturada.",
                "Quieres recuperar claridad y voz propia.",
                "Necesitas un espacio para escucharte de verdad.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="animate-fade-up rounded-2xl border border-brand-pink/25 bg-white/80 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-pink/55"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CheckCircle2 size={20} className="text-brand-pink" />

                  <p className="mt-4 text-base leading-relaxed text-brand-text">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section
        id="que-incluye"
        className="scroll-mt-24 bg-white/45 px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="overline mb-5">Tu mes dentro del Club</p>

            <h2 className="font-heading text-balance text-3xl font-medium tracking-tighter text-brand-ink md:text-5xl">
              Cuatro semanas para reconectar contigo, paso a paso.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-brand-muted">
              No necesitas hacerlo todo de una vez. Solo necesitas empezar a
              darte un espacio que también sea para ti.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MONTH_STEPS.map((step, index) => (
              <article
                key={step.week}
                className="animate-fade-up rounded-2xl border border-brand-pink/25 bg-white/85 p-7 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-pink/55"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-pink">
                  {step.week}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-pink/25 bg-brand-pink/10 px-3 py-1.5 text-xs font-medium text-brand-ink">
                  <CalendarDays size={14} className="text-brand-pink" />
                  {step.schedule}
                </div>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-subtle">
                  {step.format}
                </p>

                <p className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-brand-pink/25 bg-brand-pink/10 font-heading text-lg text-brand-pink">
                  0{index + 1}
                </p>

                <h3 className="font-heading mt-6 text-2xl tracking-tight text-brand-ink">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO CRESSARA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="animate-fade-up overflow-hidden rounded-3xl bg-[#6B2E59] px-7 py-12 shadow-[0_28px_70px_-48px_rgba(91,39,75,0.95)] transition-transform duration-700 hover:-translate-y-1 md:px-12 md:py-16">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-brand-lavender">
                Tu proceso dentro del Club
              </p>

              <h2 className="font-heading text-balance text-4xl font-medium leading-[0.96] tracking-tighter text-white md:text-6xl">
                Comprende.
                <br />
                Reconecta.
                <br />
                Avanza.
              </h2>
            </div>

            <div className="grid gap-8 md:col-span-7 md:grid-cols-3 md:gap-5">
              <div className="border-l border-brand-lavender/30 pl-5 transition-transform duration-500 hover:translate-x-1">
                <p className="font-heading text-2xl tracking-tight text-brand-lavender">
                  Comprende
                </p>

                <p className="mt-3 text-sm leading-relaxed text-brand-lavender/85">
                  Mira con más claridad lo que estás sintiendo y los patrones
                  que hoy influyen en tu vida.
                </p>
              </div>

              <div className="border-l border-brand-lavender/30 pl-5 transition-transform duration-500 hover:translate-x-1">
                <p className="font-heading text-2xl tracking-tight text-brand-lavender">
                  Reconecta
                </p>

                <p className="mt-3 text-sm leading-relaxed text-brand-lavender/85">
                  Regresa a tus necesidades, a tu voz y a la parte de ti que
                  también necesita espacio.
                </p>
              </div>

              <div className="border-l border-brand-lavender/30 pl-5 transition-transform duration-500 hover:translate-x-1">
                <p className="font-heading text-2xl tracking-tight text-brand-lavender">
                  Avanza
                </p>

                <p className="mt-3 text-sm leading-relaxed text-brand-lavender/85">
                  Lleva lo que descubres a decisiones más conscientes, límites
                  más sanos y una vida con mayor dirección.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="overline mb-5">Comunidad Cressara</p>

            <h2 className="font-heading text-balance text-3xl font-medium tracking-tighter text-brand-ink md:text-5xl">
              Conversaciones para volver a ti.
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-brand-muted">
            Explora reflexiones breves que forman parte de la conversación que
            queremos abrir dentro de Cressara.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VIDEOS.map((video, index) => (
            <article
              key={video.id}
              className="group animate-fade-up overflow-hidden rounded-2xl border border-brand-pink/25 bg-white/90 shadow-[0_22px_50px_-34px_rgba(161,82,186,0.72)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-pink/55"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VideoPreview video={video} />

              <div className="p-6">
                <div className="flex items-center gap-2 text-brand-pink">
                  <CirclePlay size={18} />
                  <span className="font-mono text-xs uppercase tracking-[0.18em]">
                    Video
                  </span>
                </div>

                <h3 className="font-heading mt-5 text-2xl tracking-tight text-brand-ink">
                  {video.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {video.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* REDES SOCIALES */}
      <SocialLinks />
      {/* BENEFICIOS */}
      <section className="bg-[#6B2E59] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-brand-lavender">
              Vuelve a ti
            </p>

            <h2 className="font-heading text-balance text-3xl font-medium tracking-tighter text-white md:text-5xl">
              Lo que puedes empezar a recuperar.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {CLUB_BENEFITS.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="animate-fade-up rounded-2xl border border-brand-lavender/20 bg-white/10 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/15"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-lavender/35 bg-brand-pink/15">
                  <Icon size={20} className="text-brand-lavender" />
                </div>

                <h3 className="font-heading mt-6 text-2xl tracking-tight text-white">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-brand-lavender">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTA DE REFLEXIÓN */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="animate-fade-up rounded-3xl border border-brand-pink/30 bg-brand-lavender/35 px-7 py-12 text-center shadow-[0_24px_56px_-42px_rgba(161,82,186,0.65)] transition-transform duration-700 hover:-translate-y-1 md:px-16 md:py-16">
          <p className="overline mb-6">Una pausa para mirarte</p>

          <h2 className="font-heading mx-auto max-w-4xl text-balance text-4xl font-medium leading-[0.98] tracking-tighter text-brand-ink md:text-6xl">
            ¿Qué cambiaría en tu vida si te dedicaras una hora a la semana?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
            Una hora para reconectar contigo, comprender lo que estás viviendo
            y recordar que no tienes que hacerlo todo sola.
          </p>
        </div>
      </section>

      {/* INSCRIPCIÓN */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="animate-fade-up overflow-hidden rounded-3xl border border-brand-pink/30 bg-white/80 shadow-[0_24px_60px_-40px_rgba(161,82,186,0.65)] transition-transform duration-700 hover:-translate-y-1">
          <div className="grid items-center gap-10 p-8 md:grid-cols-12 md:p-14">
            <div className="md:col-span-7">
              <p className="overline mb-5">Cressara Club</p>

              <h2 className="font-heading text-balance text-4xl font-medium leading-[0.96] tracking-tighter text-brand-ink md:text-6xl">
                Tu espacio mensual para volver a ti.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
                Empieza con una hora a la semana. Un espacio para mirarte con
                calma, recuperar dirección y recordar que tú también importas.
              </p>

              <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-heading text-4xl font-bold tracking-tighter text-brand-blue">
                <span>$197</span>
                <span className="text-lg font-medium tracking-normal text-brand-muted">
                  MXN
                </span>
                <span className="text-lg font-medium tracking-normal text-brand-muted">
                  al mes
                </span>
              </p>

              <a
                href={HOTMART_URL}
                target="_blank"
                rel="noreferrer"
                data-testid="community-final-hotmart"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-pink px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_-14px_rgba(255,122,172,0.95)] transition-colors hover:bg-brand-blue"
              >
                Quiero mi lugar
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-brand-pink/20 bg-brand-lavender/35 p-6 text-center md:col-span-5">
              <img
                src="/cressara-club/qr-hotmart.jpeg"
                alt="Código QR para inscribirte a Cressara Club"
                className="h-52 w-52 rounded-xl bg-white p-2 object-contain md:h-60 md:w-60"
              />

              <p className="mt-5 font-heading text-xl tracking-tight text-brand-ink">
                Escanea el código para inscribirte.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                También puedes dar clic en “Quiero mi lugar” para abrir la
                inscripción en línea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="max-w-3xl">
          <p className="overline mb-5">Preguntas frecuentes</p>

          <h2 className="font-heading text-balance text-3xl font-medium tracking-tighter text-brand-ink md:text-5xl">
            Antes de elegir tu espacio.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {FAQS.map((faq) => (
            <article
              key={faq.question}
              className="animate-fade-up rounded-2xl border border-brand-pink/25 bg-white/80 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-pink/55"
            >
              <h3 className="font-heading text-2xl tracking-tight text-brand-ink">
                {faq.question}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/#contacto"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue transition-colors hover:text-brand-pink"
          >
            <MessageCircle size={17} />
            Tengo otra pregunta
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
