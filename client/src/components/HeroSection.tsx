import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-screen md:h-[80vh] overflow-hidden bg-background">
      {/* Background Image com Overlay Cinematográfico */}
      <div className="absolute inset-0">
        <img
          src="/manus-storage/hero_mythology_297fd59d.png"
          alt="Zeus - Deus Grego"
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradiente: Preto opaco embaixo → transparente topo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90"></div>
      </div>

      {/* Partículas de Ouro Animadas (CSS-based) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Conteúdo Hero */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8">
        {/* Headline Principal */}
        <div
          className={`text-center max-w-4xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="headline-primary mb-4 text-white drop-shadow-lg">
            MITOLOGIA GREGA
          </h1>
          <p className="subtitle text-white/90 mb-6 drop-shadow-md">
            Deuses, Heróis e Significados Ocultos
          </p>
          <p className="body-text text-white/80 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Desvende os segredos ancestrais que transformam sua vida. Compreenda o poder dos mitos gregos e aplique sua sabedoria no mundo moderno.
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button className="btn-cta shadow-lg shadow-primary/50 animate-gold-glow">
            Comece Agora
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}
