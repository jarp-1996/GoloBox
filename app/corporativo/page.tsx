import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';

export default function CorporativoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
  
  const getWhatsAppLink = (text: string) => 
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  const solutions = [
    {
      title: "Colaboradores",
      description: "Reconoce el esfuerzo de tu equipo con boxes premium llenas de orgullo peruano.",
      msg: "Hola, me interesa cotizar Regalos para Colaboradores."
    },
    {
      title: "Aguinaldos Navideños",
      description: "La alternativa moderna y elegante a la clásica canasta navideña.",
      msg: "Hola, me interesa cotizar Aguinaldos Navideños para mi empresa."
    },
    {
      title: "Clientes Top",
      description: "Fideliza a tus mejores clientes con un detalle inolvidable.",
      msg: "Hola, me gustaría cotizar regalos corporativos para mis clientes."
    },
    {
      title: "Kits Onboarding",
      description: "Recibe al nuevo talento con un dulce inicio. Kits personalizados.",
      msg: "Hola, quiero información sobre Kits de Bienvenida (Onboarding)."
    },
    {
      title: "Soluciones a Medida",
      description: "Creamos la box perfecta según tu presupuesto.",
      msg: "Hola, necesito una solución de regalos corporativos a medida."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black selection:bg-red-500 selection:text-white">
      <Suspense fallback={<div className="h-[100px] bg-white"></div>}>
        <Header />
      </Suspense>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full pt-48 pb-24 overflow-hidden border-b border-black">
          <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase break-words">
              B2B <br/> <span className="text-[#EF4444]">CORPORATIVO</span>
            </h1>
            <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <p className="text-2xl text-gray-500 max-w-2xl font-light leading-relaxed uppercase tracking-widest">
                Soluciones premium exclusivas para impresionar a gran escala.
              </p>
              <a
                href={getWhatsAppLink('Hola, me gustaría recibir asesoría general sobre Regalos Corporativos.')}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group flex items-center justify-center bg-black text-white font-black py-6 px-14 rounded-full text-xl transition-all duration-300 hover:bg-[#EF4444] hover:text-white uppercase tracking-widest whitespace-nowrap"
              >
                Cotizar B2B
              </a>
            </div>
          </div>
        </section>

        {/* Solutions List (Brutalist Rows) */}
        <section className="py-24">
          <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col">
            {solutions.map((sol, i) => (
              <div key={i} className="group border-b border-black/10 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:bg-black/5 transition-colors cursor-pointer">
                <div className="flex-1">
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 group-hover:text-[#EF4444] transition-colors">{sol.title}</h3>
                  <p className="text-xl md:text-2xl text-gray-500 max-w-3xl">{sol.description}</p>
                </div>
                <a
                  href={getWhatsAppLink(sol.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="shrink-0 flex items-center justify-center w-20 h-20 rounded-full border-2 border-black group-hover:bg-[#EF4444] group-hover:border-[#EF4444] group-hover:text-white transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
