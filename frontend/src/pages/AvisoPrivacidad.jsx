import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "contacto@somoscressara.com";

const collectedData = [
  "Nombre.",
  "Correo electrónico.",
  "Teléfono.",
  "Mensajes enviados por WhatsApp o formularios.",
  "Datos relacionados con registros o compras en Hotmart.",
  "Datos técnicos de navegación, cookies, dispositivo, navegador y páginas visitadas.",
];

const purposes = [
  "Responder solicitudes de información o contacto.",
  "Gestionar registros e inscripciones.",
  "Enviar información solicitada sobre Cressara y Cressara Club.",
  "Dar seguimiento a Cressara Club y a los procesos de acompañamiento grupal.",
  "Comunicarnos por canales autorizados por la persona interesada.",
  "Mejorar el sitio, sus contenidos, campañas y experiencia de navegación.",
];

const thirdParties = [
  "Meta Pixel y herramientas de Meta.",
  "Google Analytics y herramientas de Google.",
  "Hotmart para registros, compras, accesos y pagos.",
  "WhatsApp para comunicación directa.",
  "YouTube para reproducción de videos.",
  "Cookies, redes sociales y herramientas de medición o comunicación.",
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

export default function AvisoPrivacidad() {
  return (
    <div data-testid="aviso-privacidad-page" className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
        <p className="overline mb-6">Legal</p>

        <h1 className="font-heading text-balance text-4xl font-bold leading-tight tracking-tighter text-brand-ink md:text-6xl">
          Aviso de Privacidad
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted">
          En Cressara cuidamos la información que compartes con nosotros. Este
          aviso explica qué datos podemos recopilar, para qué los usamos y cómo
          puedes ejercer tus derechos.
        </p>

        <div className="mt-10 rounded-2xl border border-brand-pink/30 bg-brand-lavender/35 p-6 md:p-8">
          <p className="font-heading text-2xl font-medium tracking-tight text-brand-ink">
            Cressara no vende ni renta datos personales.
          </p>

          <p className="mt-3 leading-relaxed text-brand-muted">
            También te recomendamos evitar enviar información médica,
            psicológica, clínica o sensible por formularios generales o
            WhatsApp.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <LegalCard title="Responsable">
            <p>
              El responsable del tratamiento de tus datos personales es
              Cressara.
            </p>

            <p>
              Domicilio: Av. Universidad 811, Bosques del Prado Sur, Local 38,
              Plaza Santa Fe, C.P. 20130, Aguascalientes, Ags.
            </p>

            <p>
              Correo de contacto:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </LegalCard>

          <LegalCard title="Datos que pueden recopilarse">
            <ul className="list-disc space-y-2 pl-5">
              {collectedData.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalCard>

          <LegalCard title="Finalidades">
            <ul className="list-disc space-y-2 pl-5">
              {purposes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalCard>

          <LegalCard title="Herramientas y terceros">
            <p>
              Para operar el sitio, medir resultados, comunicar información y
              gestionar registros, Cressara puede utilizar herramientas de
              terceros como:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              {thirdParties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p>
              Hotmart, WhatsApp, YouTube, Meta y Google pueden tener sus
              propios avisos de privacidad, condiciones y políticas de uso.
              Recomendamos revisarlos directamente en cada plataforma.
            </p>
          </LegalCard>

          <LegalCard title="Derechos ARCO">
            <p>
              Puedes solicitar acceso, rectificación, cancelación u oposición al
              tratamiento de tus datos personales enviando un correo a{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "Derechos ARCO",
                )}`}
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              con el asunto “Derechos ARCO”.
            </p>

            <p>
              Tu solicitud debe indicar tu nombre, el derecho que deseas ejercer
              y un medio de contacto para dar seguimiento.
            </p>
          </LegalCard>

          <LegalCard title="Baja de comunicaciones">
            <p>
              Si no deseas recibir comunicaciones de Cressara, puedes escribir a{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "No deseo recibir comunicaciones",
                )}`}
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              con el asunto “No deseo recibir comunicaciones”.
            </p>
          </LegalCard>

          <LegalCard title="Revocación de consentimiento">
            <p>
              Puedes revocar tu consentimiento para el tratamiento de tus datos
              personales cuando sea legalmente procedente. Para solicitarlo,
              escribe a {CONTACT_EMAIL} y describe con claridad la solicitud que
              deseas realizar.
            </p>
          </LegalCard>

          <LegalCard title="Cambios al aviso">
            <p>
              Cressara puede actualizar este Aviso de Privacidad para reflejar
              cambios en el sitio, herramientas, servicios o requisitos
              aplicables. La versión vigente será la publicada en esta página.
            </p>
          </LegalCard>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-pink/25 bg-white/70 p-6">
          <p className="text-sm leading-relaxed text-brand-muted">
            Para conocer las reglas de uso del sitio y de los espacios de
            Cressara, revisa nuestros{" "}
            <Link
              to="/terminos-y-condiciones"
              className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
            >
              Términos y Condiciones
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
