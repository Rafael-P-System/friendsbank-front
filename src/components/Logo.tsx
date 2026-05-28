export default function Logo() {
  return (
    <div className="flex flex-col items-center mb-8">
      {/* Brasão Premium com o Cifrão */}
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#B38728] via-[#FBF5B7] to-[#AA771C] flex items-center justify-center p-[2px] shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 hover:scale-105 group">
        
        {/* Fundo interno fosco */}
        <div className="w-full h-full bg-[#0A0A0A] rounded-full flex items-center justify-center relative overflow-hidden">
          
          {/* Efeito de brilho reflexivo passando no fundo ao passar o mouse */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
          
          {/* O Cifrão de IA Estilizado */}
          <span className="text-4xl font-extrabold bg-gradient-to-b from-[#FFF] via-[#D4AF37] to-[#AA771C] bg-clip-text text-transparent tracking-tighter filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
            $
          </span>
        </div>
      </div>

      {/* Texto de Identificação do Banco */}
      <h1 className="text-xl font-bold tracking-widest text-center mt-4 bg-gradient-to-r from-[#D4AF37] via-[#FFF] to-[#AA771C] bg-clip-text text-transparent">
        FRIENDS BANK
      </h1>
      
      <div className="flex items-center gap-2 mt-1">
        <span className="h-[1px] w-4 bg-[#D4AF37]/40"></span>
        <p className="text-xs text-[#C5A059] uppercase tracking-widest font-medium">
          Premium Club
        </p>
        <span className="h-[1px] w-4 bg-[#D4AF37]/40"></span>
      </div>
    </div>
  );
}