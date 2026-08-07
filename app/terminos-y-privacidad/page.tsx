import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Términos y Privacidad | Golo-Box',
  description: 'Términos y condiciones, y políticas de privacidad de Golo-Box.',
};

export default function TermsAndPrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 selection:bg-red-500 selection:text-white">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-32 md:py-40">
        <div className="border-b-8 border-black pb-8 mb-16">
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase break-words">
            Términos y <br /> <span className="text-[#EF4444]">Privacidad</span>
          </h1>
        </div>

        <div className="space-y-16">
          {/* Términos y Condiciones */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight border-l-4 border-[#EF4444] pl-4">
              Términos y Condiciones
            </h2>
            
            <div className="space-y-4 text-body text-gray-700 font-medium">
              <p>
                Al acceder y realizar compras en <strong>Golo-Box</strong>, aceptas estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios.
              </p>
              
              <h3 className="text-xl font-bold text-black mt-8">1. Uso del Sitio Web</h3>
              <p>
                El contenido de las páginas de este sitio web es para tu información general y uso exclusivo. Está sujeto a cambios sin previo aviso. No garantizamos la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos en este sitio web.
              </p>

              <h3 className="text-xl font-bold text-black mt-8">2. Compras y Pagos</h3>
              <p>
                Todos los precios están expresados en Soles Peruanos (PEN) e incluyen los impuestos de ley vigentes, salvo que se especifique lo contrario. El pago debe completarse íntegramente antes de que se despache cualquier pedido. Nos reservamos el derecho de cancelar cualquier pedido que presente actividad sospechosa o problemas con el procesador de pagos.
              </p>

              <h3 className="text-xl font-bold text-black mt-8">3. Envíos y Entregas</h3>
              <p>
                Los tiempos de entrega son estimados. Haremos nuestro mejor esfuerzo para entregar tu box en la fecha solicitada; sin embargo, no nos hacemos responsables por retrasos ocasionados por factores de fuerza mayor o eventos fuera de nuestro control.
              </p>

              <h3 className="text-xl font-bold text-black mt-8">4. Cambios y Devoluciones</h3>
              <p>
                Por la naturaleza perecedera de nuestros productos (alimentos, golosinas y chocolates), no aceptamos devoluciones ni cambios una vez que el producto ha sido entregado en óptimas condiciones. En caso de que el producto llegue dañado por responsabilidad de nuestro servicio de reparto, por favor contáctanos de inmediato para gestionar un reemplazo o reembolso.
              </p>
            </div>
          </section>

          {/* Políticas de Privacidad */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight border-l-4 border-[#EF4444] pl-4">
              Políticas de Privacidad
            </h2>
            
            <div className="space-y-4 text-body text-gray-700 font-medium">
              <p>
                En <strong>Golo-Box</strong> valoramos tu confianza y nos comprometemos a proteger tu información personal. Esta política explica cómo recopilamos, usamos y protegemos tus datos.
              </p>

              <h3 className="text-xl font-bold text-black mt-8">1. Recopilación de Información</h3>
              <p>
                Solo recopilamos la información personal necesaria para procesar tus pedidos y mejorar tu experiencia de compra. Esto incluye tu nombre, dirección de correo electrónico, número telefónico y dirección de envío.
              </p>

              <h3 className="text-xl font-bold text-black mt-8">2. Uso de la Información</h3>
              <p>
                Utilizamos tu información exclusivamente para:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Procesar y enviar tus pedidos.</li>
                <li>Enviarte notificaciones sobre el estado de tu compra.</li>
                <li>Mejorar nuestros productos y servicios.</li>
                <li>Enviarte correos promocionales ocasionales (siempre podrás darte de baja).</li>
              </ul>

              <h3 className="text-xl font-bold text-black mt-8">3. Seguridad de Datos y Pagos</h3>
              <p>
                Tu información de pago se procesa de forma segura a través de nuestra pasarela de pagos integrada (MercadoPago). Nosotros no almacenamos los datos de tus tarjetas de crédito o débito en nuestros servidores.
              </p>

              <h3 className="text-xl font-bold text-black mt-8">4. Compartir con Terceros</h3>
              <p>
                No vendemos, distribuimos ni arrendamos tu información personal a terceros a menos que tengamos tu permiso explícito o la ley así lo requiera. Podemos compartir tus datos de envío únicamente con nuestras empresas de transporte asociadas para cumplir con la entrega de tu pedido.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
