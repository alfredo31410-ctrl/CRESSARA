/** Condiciones que regulan el acceso y uso de los servicios de Cressara. */
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

export default function TerminosCondiciones() {
  return (
    <div data-testid="terms-page" className="min-h-screen bg-brand-bg">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
        <p className="overline mb-6">Información legal</p>

        <h1 className="font-heading text-balance text-5xl font-bold leading-[0.95] tracking-tighter text-brand-ink md:text-7xl">
          Términos y condiciones
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl">
          Estas condiciones explican las reglas generales de uso del sitio, los
          contenidos y las experiencias digitales de Cressara.
        </p>

        <div className="mt-10 rounded-2xl border border-brand-pink/25 bg-white/80 p-6 text-sm leading-relaxed text-brand-muted md:p-8">
          <p>
            <strong className="text-brand-ink">Última actualización:</strong>{" "}
            {LAST_UPDATED}
          </p>

          <p className="mt-3">
            Al navegar, registrarte o utilizar los servicios digitales de
            Cressara, aceptas estos términos y condiciones.
          </p>
        </div>

        <article className="mt-12 rounded-3xl border border-brand-pink/25 bg-white/75 p-7 shadow-[0_18px_40px_-32px_rgba(161,82,186,0.55)] md:p-12">
          <LegalSection title="1. Titular del sitio">
            <p>
              Este sitio y los contenidos de Cressara son operados por{" "}
              <strong className="text-brand-ink">Cressara</strong>, con
              domicilio en Av. Universidad 811, Bosques del Prado Sur, Local
              38, Plaza Santa Fe, C.P. 20130, Aguascalientes, Ags.
            </p>

            <p>
              Para atención general, puedes escribir a{" "}
              <a
                href="mailto:contacto@somoscressara.com"
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                contacto@somoscressara.com
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="2. Alcance de Cressara">
            <p>
              Cressara ofrece contenidos, recursos, conversaciones y espacios
              de educación emocional aplicada. Cressara Club es una experiencia
              grupal de acompañamiento y reflexión.
            </p>

            <p>
              Los contenidos de Cressara no constituyen terapia psicológica,
              atención médica, psiquiátrica, diagnóstico clínico ni sustituyen
              un proceso profesional individual cuando este sea necesario.
            </p>

            <p>
              Ante una emergencia o situación que implique riesgo para tu
              integridad o la de otra persona, busca atención profesional
              inmediata y contacta los servicios de emergencia disponibles en tu
              localidad.
            </p>
          </LegalSection>

          <LegalSection title="3. Uso adecuado del sitio">
            <p>
              Te comprometes a utilizar el sitio, sus formularios, contenidos y
              canales de contacto de manera lícita, respetuosa y conforme a
              estos términos.
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>
                No debes usar el sitio para enviar contenido ilegal, ofensivo,
                violento, discriminatorio o que afecte a terceras personas.
              </li>
              <li>
                No debes intentar interferir con la seguridad, disponibilidad o
                funcionamiento del sitio.
              </li>
              <li>
                Debes proporcionar datos veraces cuando completes un formulario,
                registro o proceso de compra.
              </li>
              <li>
                No debes utilizar la identidad, información o cuenta de otra
                persona sin autorización.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Cressara Club, registros y pagos">
            <p>
              La información sobre precio, modalidad, frecuencia, contenido,
              accesos y condiciones específicas de una oferta se mostrará en la
              página correspondiente y, cuando aplique, en el checkout de
              Hotmart antes de completar el pago.
            </p>

            <p>
              Los pagos, comprobantes, condiciones de cobro, cancelación,
              renovación, reembolso y acceso que correspondan a una compra
              realizada mediante Hotmart se regirán también por la información
              presentada por dicha plataforma durante el proceso de compra.
            </p>

            <p>
              Cressara respetará las condiciones comerciales, precios y
              características que estén vigentes y claramente informadas al
              momento de la contratación, sin perjuicio de los derechos que
              reconozca la legislación aplicable a las personas consumidoras.
            </p>
          </LegalSection>

          <LegalSection title="5. Reglas de convivencia">
            <p>
              Los espacios grupales y canales de comunidad buscan ser seguros,
              respetuosos y útiles. Al participar, te comprometes a cuidar la
              privacidad de otras personas y evitar compartir fuera del grupo
              información, testimonios, imágenes o mensajes de participantes sin
              su autorización.
            </p>

            <p>
              Cressara podrá limitar, suspender o retirar la participación de
              una persona que incurra en conductas de acoso, discriminación,
              violencia, difusión no autorizada de información, fraude o uso
              indebido de los espacios.
            </p>
          </LegalSection>

          <LegalSection title="6. Propiedad intelectual">
            <p>
              Los textos, videos, diseños, recursos, marcas, logotipos,
              materiales y contenidos publicados por Cressara están protegidos
              por la normativa aplicable y pertenecen a Cressara o a sus
              respectivos titulares.
            </p>

            <p>
              No está permitido copiar, distribuir, vender, reproducir, grabar,
              publicar, transmitir o explotar comercialmente dichos materiales
              sin autorización previa y por escrito de Cressara, salvo los usos
              expresamente permitidos por la ley.
            </p>
          </LegalSection>

          <LegalSection title="7. Enlaces y plataformas de terceros">
            <p>
              El sitio puede incluir enlaces, videos, formularios, plataformas
              de pago, redes sociales o herramientas administradas por terceros,
              como Hotmart, WhatsApp, YouTube, Meta y Google.
            </p>

            <p>
              Cressara no controla las políticas, disponibilidad ni prácticas de
              privacidad de esas plataformas. Te recomendamos revisar sus
              condiciones antes de interactuar o compartir información en ellas.
            </p>
          </LegalSection>

          <LegalSection title="8. Disponibilidad y actualizaciones">
            <p>
              Cressara busca mantener el sitio y sus contenidos disponibles,
              actualizados y funcionales; sin embargo, pueden existir pausas,
              cambios, errores técnicos o actualizaciones necesarias para
              mejorar la experiencia.
            </p>

            <p>
              Cressara podrá modificar contenidos, diseño, secciones, precios u
              ofertas futuras, procurando informar las condiciones relevantes
              antes de cualquier contratación.
            </p>
          </LegalSection>

          <LegalSection title="9. Protección de datos personales">
            <p>
              El tratamiento de datos personales se rige por el{" "}
              <Link
                to="/aviso-de-privacidad"
                className="font-medium text-brand-blue transition-colors hover:text-brand-pink"
              >
                Aviso de Privacidad
              </Link>{" "}
              de Cressara.
            </p>
          </LegalSection>

          <LegalSection title="10. Legislación aplicable y contacto">
            <p>
              Estos términos se interpretarán conforme a la legislación
              aplicable en México, sin limitar los derechos que correspondan a
              las personas consumidoras.
            </p>

            <p>
              Para dudas sobre estos términos, escribe a{" "}
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
      </main>

      <Footer />
    </div>
  );
}
