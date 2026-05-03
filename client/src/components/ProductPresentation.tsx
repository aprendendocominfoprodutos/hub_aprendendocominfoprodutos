import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ProductPresentation() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const benefits = [
    'Compreenda os arquétipos universais',
    'Aplique a sabedoria grega na vida moderna',
    'Desvende os significados ocultos dos mitos',
    'Transforme sua perspectiva sobre poder e destino',
    'Acesso vitalício ao conteúdo premium',
    'Comunidade exclusiva de aprendizes',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background border-t border-border"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mockup do Ebook */}
          <div
            className={`flex justify-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative w-full max-w-sm">
              {/* Sombra Cinematográfica */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-2xl"></div>
              
              {/* Mockup */}
              <img
                src="/manus-storage/ebook_mockup_951d44ee.png"
                alt="Ebook Mitologia Grega"
                className="relative w-full h-auto rounded-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300"
              />
            </div>
          </div>

          {/* Descrição e Benefícios */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h2 className="headline-primary mb-4 text-foreground">
              O Seu Guia Completo
            </h2>
            <p className="subtitle text-muted-foreground mb-6">
              Mitologia Grega: Deuses, Heróis e Significados Ocultos
            </p>

            <p className="body-text mb-8 text-foreground/90">
              Este infoproduto premium reúne toda a sabedoria dos mitos gregos em um formato acessível e transformador. Cada capítulo foi cuidadosamente estruturado para revelar não apenas as histórias, mas os significados profundos que moldam nossa compreensão de poder, destino e transformação pessoal.
            </p>

            {/* Lista de Benefícios */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <p className="body-text text-foreground/80">{benefit}</p>
                </div>
              ))}
            </div>

            {/* CTA Secundária */}
            <div className="mt-8">
              <button className="btn-cta-outline">
                Saiba Mais Sobre o Conteúdo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
