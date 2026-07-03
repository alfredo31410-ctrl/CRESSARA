import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "contacto@somoscressara.com";

const siteRules = [
  "Usar el sitio y sus contenidos de forma lícita, respetuosa y personal.",
  "No intentar vulnerar, alterar, saturar o interferir con el funcionamiento del sitio.",
  "No copiar, distribuir o explotar materiales de Cressara sin autorización previa.",
  "No usar los canales de contacto para enviar mensajes ofensivos, falsos, invasivos o ajenos a los fines de Cressara.",
];

const groupRules = [
  "Participar con respeto, escucha y cuidado hacia otras personas.",
  "Mantener confidencialidad sobre lo compartido en espacios grupales.",
  "No compartir testimonios, imágenes, grabaciones, nombres, historias o información de otras participantes sin autorización expresa.",
  "Recordar que los espacios grupales son de educación emocional y acompañamiento, no de atención clínica individual.",
];

function LegalCard({ title, children }) {
  return (
    <section className="rounded-2xl border border-brand-pink/25 bg-white/85 p-6 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.45)] md:p-8">
      <h2 className="font-heading text-2xl font-medium tracking-tight text-brand-ink">
        {title}
      </h2>

      <div className="mt-4 space-y-4 leading-relaxed text-brand-muted">
        {children}
      </div>
    </section>
  );
}

export default function TerminosCondiciones() {
  return (
    <div
      data-testid="terminos-condiciones-page"
      className="min-h-screen bg-brand-bg"
    >
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
        <p className="overline mb-6">Legal</p>

        <h1 className="font-heading text-balance text-4xl font-bold leading-tight tracking-tighter text-brand-ink md:text-6xl">
          Términos y Condiciones
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted">
          Estos términos regulan el uso del sitio de Cressara, sus contenidos y
          los espacios de educación emocional y acompañamiento grupal que se
          comuniquen a través de sus canales digitales.
        </p>

        <div className="mt-10 rounded-2xl border border-brand-pink/30 bg-brand-lavender/35 p-6 md:p-8">
          <p className="font-heading text-2xl font-medium tracking-tight text-brand-ink">
            Los contenidos de Cressara no sustituyen terapia psicológica,
            atención médica, psiquiátrica, diagnóstico clínico ni atención
            profesional individual cuando sea necesaria.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <LegalCard title="Titular del sitio">
            <p>
              El titular de este sitio es Cressara. Para cualquier duda,
              comunicación o solicitud relacionada con estos términos puedes
              escribir a{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </LegalCard>

          <LegalCard title="Qué ofrece Cressara">
            <p>
              Cressara ofrece educación emocional, contenidos, recursos de
              reflexión y acompañamiento grupal. Sus materiales buscan apoyar la
              comprensión emocional, la toma de decisiones y la construcción de
              relaciones más conscientes.
            </p>
          </LegalCard>

          <LegalCard title="Uso adecuado del sitio">
            <ul className="list-disc space-y-2 pl-5">
              {siteRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalCard>

          <LegalCard title="Convivencia y confidencialidad">
            <p>
              Los espacios grupales requieren una participación cuidadosa. Al
              integrarte a ellos aceptas cuidar la confidencialidad y el respeto
              hacia las demás participantes.
            </p>

            <ul className="list-disc space-y-2 pl-5">
              {groupRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalCard>

          <LegalCard title="Propiedad intelectual">
            <p>
              Los materiales, videos, textos, recursos, marca, nombres, diseños,
              imágenes, documentos y contenidos publicados por Cressara son
              propiedad de Cressara o se utilizan con autorización. No está
              permitido copiarlos, reproducirlos, distribuirlos, venderlos,
              modificarlos o usarlos con fines comerciales sin autorización
              previa y por escrito.
            </p>
          </LegalCard>

          <LegalCard title="Plataformas de terceros">
            <p>
              Cressara puede usar plataformas de terceros como Hotmart,
              WhatsApp, YouTube, Meta y Google para pagos, acceso a contenidos,
              comunicación, medición, publicidad, reproducción de videos o
              interacción en redes sociales.
            </p>

            <p>
              Cada plataforma puede contar con sus propios términos,
              condiciones, avisos de privacidad y reglas de uso. Cressara no
              controla esas políticas externas.
            </p>
          </LegalCard>

          <LegalCard title="Compras, accesos y reembolsos">
            <p>
              Las condiciones específicas de precio, acceso, compra, renovación,
              cancelación o reembolso se mostrarán en Hotmart antes de realizar
              el pago. Revisa cuidadosamente esa información antes de confirmar
              cualquier compra.
            </p>
          </LegalCard>

          <LegalCard title="Actualizaciones">
            <p>
              Cressara puede actualizar el sitio, sus contenidos, servicios,
              herramientas y estos Términos y Condiciones cuando sea necesario.
              La versión vigente será la publicada en esta página.
            </p>
          </LegalCard>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-pink/25 bg-white/70 p-6">
          <p className="text-sm leading-relaxed text-brand-muted">
            Para conocer cómo tratamos tus datos personales, revisa nuestro{" "}
            <Link
              to="/aviso-de-privacidad"
              className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
            >
              Aviso de Privacidad
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
