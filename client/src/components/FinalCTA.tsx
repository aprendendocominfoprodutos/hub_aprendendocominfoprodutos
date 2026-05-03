import { useEffect, useRef, useState } from 'react';

export default function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Simular contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-background to-card border-t border-border"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge de Urgência */}
          <div
            className={`inline-block mb-6 px-4 py-2 bg-primary/20 border border-primary rounded-full transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <p className="text-primary font-semibold text-sm">
              ⏰ Oferta por Tempo Limitado
            </p>
          </div>

          {/* Headline */}
          <h2
            className={`headline-primary mb-4 text-foreground transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Não Deixe Essa Oportunidade Passar
          </h2>

          {/* Descrição */}
          <p
            className={`body-text text-muted-foreground mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Junte-se aos milhares de pessoas que já transformaram suas vidas através da sabedoria da mitologia grega. Seu conhecimento ancestral está esperando.
          </p>

          {/* Countdown Timer */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <p className="text-sm text-muted-foreground mb-3">
              Preço especial expira em:
            </p>
            <div className="flex justify-center gap-4 md:gap-6">
              <div className="bg-card border-2 border-primary rounded-lg p-4 min-w-20">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs text-muted-foreground">Horas</div>
              </div>
              <div className="bg-card border-2 border-primary rounded-lg p-4 min-w-20">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-muted-foreground">Minutos</div>
              </div>
              <div className="bg-card border-2 border-primary rounded-lg p-4 min-w-20">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-muted-foreground">Segundos</div>
              </div>
            </div>
          </div>

          {/* CTA Button Grande */}
          <div
            className={`mb-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button className="btn-cta text-lg px-10 py-5 shadow-2xl shadow-primary/50 animate-gold-glow">
              Garantir Meu Acesso Agora
            </button>
          </div>

          {/* Garantia */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-card border border-border rounded-lg p-6 inline-block">
              <p className="text-sm text-foreground mb-2">
                <span className="text-primary font-bold">✓ Garantia de 7 Dias</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Se não ficar satisfeito, devolva 100% do seu dinheiro. Sem perguntas, sem complicações.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground mb-4">
              Confie em quem já transformou suas vidas
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">⭐</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              4.9 de 5 estrelas - 2,347 avaliações verificadas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
