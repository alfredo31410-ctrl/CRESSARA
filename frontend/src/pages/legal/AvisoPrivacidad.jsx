/** Aviso de privacidad y mecanismos para ejercer derechos sobre datos personales. */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const LAST_UPDATED = "3 de julio de 2026";

function LegalSection({ title, children }) {
  return (
    <section className="border-t border-brand-pink/25 py-9 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-2xl tracking-tight text-brand-ink md:text-3xl">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-muted">
        {children}
      </div>
    </section>
  );
}

export default function AvisoPrivacidad() {
  return (
    <div data-testid="privacy-page" className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
        <p className="overline mb-6">Información legal</p>

        <h1 className="font-heading text-balance text-5xl font-bold leading-[0.95] tracking-tighter text-brand-ink md:text-7xl">
          Aviso de privacidad
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">
          En Cressara cuidamos tu información personal y buscamos que conozcas
          con claridad cómo la recopilamos, utilizamos y protegemos.
        </p>

        <div className="mt-10 rounded-2xl border border-brand-pink/25 bg-white/80 p-6 text-sm leading-relaxed text-brand-muted md:p-8">
          <p>
            <strong className="text-brand-ink">Última actualización:</strong>{" "}
            {LAST_UPDATED}
          </p>

          <p className="mt-3">
            Este aviso aplica al sitio web, formularios, canales de contacto y
            experiencias digitales gestionadas por Cressara.
          </p>
        </div>

        <article className="mt-12 rounded-3xl border border-brand-pink/25 bg-white/75 p-7 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)] md:p-12">
          <LegalSection title="1. Responsable del tratamiento de datos">
            <p>
              <strong className="text-brand-ink">Cressara</strong>, con
              domicilio en Av. Universidad 811, Bosques del Prado Sur, Local
              38, Plaza Santa Fe, C.P. 20130, Aguascalientes, Ags., es
              responsable del tratamiento de los datos personales que se
              recaben a través de sus canales digitales.
            </p>

            <p>
              Para dudas sobre privacidad o el tratamiento de tus datos,
              escríbenos a{" "}
              <a
                href="mailto:contacto@somoscressara.com"
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                contacto@somoscressara.com
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="2. Datos personales que podemos recabar">
            <p>
              Dependiendo de la forma en que interactúes con Cressara, podemos
              recabar datos como:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Nombre.</li>
              <li>Correo electrónico.</li>
              <li>Número telefónico.</li>
              <li>Mensajes enviados por formularios o WhatsApp.</li>
              <li>
                Información relacionada con tu registro o compra mediante
                Hotmart.
              </li>
              <li>
                Datos técnicos de navegación, como cookies, identificadores,
                dispositivo, navegador, páginas visitadas e interacción con el
                sitio.
              </li>
            </ul>

            <p>
              Cressara no solicita de forma intencional datos personales
              sensibles mediante sus formularios o canales generales. Te
              pedimos evitar enviar información médica, clínica, psicológica,
              financiera o de otra naturaleza sensible por formulario o
              WhatsApp.
            </p>
          </LegalSection>

          <LegalSection title="3. Finalidades primarias">
            <p>
              Utilizaremos tus datos personales para las siguientes finalidades
              necesarias:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Responder solicitudes, dudas y mensajes de contacto.</li>
              <li>
                Gestionar tu registro, participación y comunicación relacionada
                con comunidad cressara.
              </li>
              <li>
                Proporcionar información sobre sesiones, materiales, actividades
                o servicios que hayas solicitado.
              </li>
              <li>
                Dar seguimiento a pagos, registros o accesos administrados por
                plataformas de terceros, como Hotmart.
              </li>
              <li>
                Mantener la seguridad, funcionamiento y mejora del sitio.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Finalidades secundarias y comunicaciones">
            <p>
              Con tu autorización o cuando la normativa aplicable lo permita,
              podremos utilizar tus datos para enviarte información sobre
              actividades, recursos, nuevos contenidos, eventos, promociones o
              servicios de Cressara.
            </p>

            <p>
              Puedes solicitar en cualquier momento dejar de recibir estas
              comunicaciones enviando un correo a{" "}
              <a
                href="mailto:contacto@somoscressara.com?subject=No%20deseo%20recibir%20comunicaciones"
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                contacto@somoscressara.com
              </a>{" "}
              con el asunto: “No deseo recibir comunicaciones”.
            </p>
          </LegalSection>

          <LegalSection title="5. Cookies y tecnologías de seguimiento">
            <p>
              Cressara utiliza cookies y tecnologías similares para recordar
              preferencias, comprender el uso del sitio, medir campañas y
              mejorar la experiencia digital.
            </p>

            <p>
              Entre las herramientas que pueden participar en estas mediciones
              se encuentran Meta Pixel, Google Analytics y herramientas
              técnicas necesarias para la operación del sitio. Puedes configurar
              tu navegador para limitar o rechazar cookies; algunas funciones
              podrían no comportarse de la misma manera.
            </p>
          </LegalSection>

          <LegalSection title="6. Plataformas y servicios de terceros">
            <p>
              Algunas interacciones pueden realizarse a través de plataformas
              externas, tales como Hotmart, WhatsApp, YouTube, Meta, Google
              Analytics y redes sociales. Cuando visitas sus sitios, realizas un
              pago, reproduces un video, escribes por WhatsApp o interactúas con
              sus herramientas, dichas plataformas pueden tratar datos conforme a
              sus propios avisos de privacidad y condiciones.
            </p>

            <p>
              Cressara no vende ni renta datos personales. Cualquier
              comunicación de datos que resulte necesaria para brindar un
              servicio solicitado o cumplir obligaciones legales se realizará
              conforme a la legislación aplicable.
            </p>
          </LegalSection>

          <LegalSection title="7. Derechos ARCO">
            <p>
              Puedes solicitar el ejercicio de tus derechos de Acceso,
              Rectificación, Cancelación u Oposición respecto del tratamiento de
              tus datos personales.
            </p>

            <p>
              Para solicitarlo, escribe a{" "}
              <a
                href="mailto:contacto@somoscressara.com?subject=Derechos%20ARCO"
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                contacto@somoscressara.com
              </a>{" "}
              con el asunto “Derechos ARCO” e incluye:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Tu nombre completo.</li>
              <li>Un medio para recibir respuesta.</li>
              <li>El derecho que deseas ejercer.</li>
              <li>
                Una descripción clara de la solicitud y, cuando corresponda,
                información que permita localizar o corregir tus datos.
              </li>
              <li>
                Documentos para acreditar identidad, únicamente cuando sean
                necesarios para atender tu solicitud.
              </li>
            </ul>

            <p>
              Cressara comunicará la determinación correspondiente dentro del
              plazo legal aplicable y, de ser procedente, hará efectivo el
              derecho en los términos establecidos por la normativa vigente.
            </p>
          </LegalSection>

          <LegalSection title="8. Revocación del consentimiento y limitación de uso">
            <p>
              Puedes solicitar la revocación de tu consentimiento o la
              limitación del uso de tus datos enviando un correo a{" "}
              <a
                href="mailto:contacto@somoscressara.com?subject=Revocaci%C3%B3n%20de%20consentimiento"
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                contacto@somoscressara.com
              </a>
              . Algunas solicitudes pueden estar sujetas a obligaciones legales,
              contractuales o de conservación de información.
            </p>
          </LegalSection>

          <LegalSection title="9. Cambios a este aviso">
            <p>
              Cressara podrá actualizar este Aviso de Privacidad cuando existan
              cambios legales, operativos o en las herramientas utilizadas. La
              versión vigente estará disponible en esta misma página.
            </p>
          </LegalSection>

          <LegalSection title="10. Contacto">
            <p>
              Para cualquier duda relacionada con este aviso, escribe a{" "}
              <a
                href="mailto:contacto@somoscressara.com"
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                contacto@somoscressara.com
              </a>
              .
            </p>
          </LegalSection>
        </article>

        <p className="mt-8 text-sm leading-relaxed text-brand-subtle">
          Consulta también nuestros{" "}
          <Link
            to="/terminos-y-condiciones"
            className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
          >
            Términos y Condiciones
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
}
