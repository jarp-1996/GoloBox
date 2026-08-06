export function FeaturesStrip() {
  const titles = [
    "Envíos coordinados",
    "Descuentos por volumen",
    "Asesoría por WhatsApp"
  ];

  return (
    <div className="bg-[#0B2545] text-white py-2.5 overflow-hidden relative text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#1a3861]">
      <div className="flex w-max animate-marquee-lr hover:[animation-play-state:paused]">
        {[...Array(2)].map((_, blockIndex) => (
          <div key={blockIndex} className="flex">
            {[...titles, ...titles, ...titles, ...titles, ...titles, ...titles].map((title, index) => (
              <div key={index} className="flex items-center px-8 md:px-16 shrink-0">
                <span className="w-1.5 h-1.5 bg-[#E3001B] rounded-full mr-4 md:mr-6"></span>
                {title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
