import Link from 'next/link';
import { Package, MessageCircle, PartyPopper } from 'lucide-react';

const steps = [
  {
    icon: Package,
    step: '1',
    title: 'Explora el Catálogo',
    description: 'Revisa nuestras marcas importadas y productos de alta rotación al por mayor.',
  },
  {
    icon: MessageCircle,
    step: '2',
    title: 'Arma tu pedido',
    description: 'Agrega los productos y cantidades que tu negocio necesita directamente al carrito.',
  },
  {
    icon: PartyPopper,
    step: '3',
    title: 'Despacho y Coordinación',
    description: 'Finaliza tu pedido y coordinamos el envío directo a tu bodega o minimarket.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-[#0B2545] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black tracking-widest uppercase mb-4">
            Proceso simple
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Surtir la mercadería de tu negocio nunca fue tan fácil. Solo 3 pasos.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-14">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Connector line between steps (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px bg-white/10 z-0" />
                )}
                {/* Icon + Number */}
                <div className="relative mb-6 z-10">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                    <Icon className="w-9 h-9 text-[#E3001B]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#E3001B] text-white text-xs font-black flex items-center justify-center shadow-md">
                    {step.step}
                  </div>
                </div>
                {/* Text */}
                <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-3 bg-white text-[#0B2545] font-bold py-4 px-10 rounded-lg text-lg transition-all hover:bg-gray-100 shadow-md"
          >
            🛒 Comenzar mi Pedido
          </Link>
        </div>
      </div>
    </section>
  );
}
