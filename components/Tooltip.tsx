'use client';

export function Tooltip({ 
  text, 
  children, 
  position = 'bottom' 
}: { 
  text: string; 
  children: React.ReactNode; 
  position?: 'top' | 'bottom' | 'left' | 'right' 
}) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className={`absolute whitespace-nowrap px-3 py-2 bg-white text-black text-[10px] md:text-xs font-black uppercase tracking-widest shadow-2xl z-50 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300
        ${position === 'bottom' ? 'top-full mt-4' : ''}
        ${position === 'top' ? 'bottom-full mb-4' : ''}
        ${position === 'left' ? 'right-full mr-4' : ''}
        ${position === 'right' ? 'left-full ml-4' : ''}
      `}>
        {text}
      </div>
    </div>
  );
}
