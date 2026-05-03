import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function PricingPlans() {
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

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 47',
      description: 'Introdução à mitologia grega',
      features: [
        'Módulo 1: Os Deuses do Olimpo',
        'Acesso ao conteúdo em PDF',
        'Suporte por email',
      ],
      highlighted: false,
    },
    {
      name: 'Essencial',
      price: 'R$ 97',
      description: 'Conhecimento intermediário completo',
      features: [
        'Módulos 1-3: Deuses, Heróis e Significados',
        'Acesso em PDF + Vídeos',
        'Comunidade exclusiva',
        'Suporte prioritário',
        'Atualizações vitalícias',
      ],
      highlighted: false,
    },
    {
      name: 'Premium',
      price: 'R$ 197',
      description: 'Experiência completa e transformadora',
      features: [
        'Todos os 6 módulos completos',
        'Acesso em PDF + Vídeos + Áudio',
        'Comunidade exclusiva',
        'Suporte VIP 24/7',
        'Atualizações vitalícias',
        'Bônus: Guia de Aplicação Prática',
        'Certificado de Conclusão',
      ],
      highlighted: true,
    },
    {
      name: 'Pacote Completo',
      price: 'R$ 297',
      description: 'Tudo + Mentoria Exclusiva',
      features: [
        'Todos os 6 módulos + Bônus',
        'Acesso em todos os formatos',
        'Comunidade exclusiva',
        'Suporte VIP 24/7',
        'Atualizações vitalícias',
        '4 Sessões de Mentoria (1:1)',
        'Grupo privado de elite',
        'Acesso antecipado a novos conteúdos',
      ],
      highlighted: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background border-t border-border"
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="headline-primary mb-4 text-foreground">
            Escolha Seu Plano
          </h2>
          <div className="divider-gold w-16 h-1 mx-auto mb-6"></div>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto">
            Cada plano foi desenhado para oferecer máximo valor. Escolha o que melhor se alinha com seus objetivos.
          </p>
        </div>

        {/* Grid de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${plan.highlighted ? 'lg:scale-110 lg:z-10' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Badge Premium */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  MAIS POPULAR
                </div>
              )}

              {/* Card */}
              <div
                className={`card-premium h-full flex flex-col ${
                  plan.highlighted
                    ? 'border-primary bg-gradient-to-b from-card to-card/50'
                    : ''
                }`}
              >
                {/* Nome e Descrição */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Preço */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {plan.price}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pagamento único
                  </p>
                </div>

                {/* Features */}
                <div className="flex-grow mb-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/50'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  Escolher Plano
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Garantia */}
        <div className="mt-12 text-center">
          <p className="body-text text-muted-foreground">
            ✓ Garantia de 7 dias de reembolso total, sem perguntas
          </p>
        </div>
      </div>
    </section>
  );
}
