import { useEffect, useRef, useState } from 'react';

export default function BenefitsSection() {
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
    {
      title: 'Compreensão Profunda',
      description: 'Entenda os arquétipos universais que governam a psicologia humana e o comportamento social.',
      icon: '🧠',
    },
    {
      title: 'Aplicação Prática',
      description: 'Transforme a sabedoria ancestral em ações concretas para sua vida pessoal e profissional.',
      icon: '⚙️',
    },
    {
      title: 'Poder Pessoal',
      description: 'Recupere seu senso de agência e poder ao compreender as forças que moldam seu destino.',
      icon: '💪',
    },
    {
      title: 'Conexão Cultural',
      description: 'Reconecte-se com a herança intelectual que moldou a civilização ocidental.',
      icon: '🏛️',
    },
    {
      title: 'Crescimento Espiritual',
      description: 'Explore dimensões espirituais e filosóficas através dos mitos atemporais.',
      icon: '🌙',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-card border-t border-border"
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="headline-primary mb-4 text-foreground">
            Benefícios Transformacionais
          </h2>
          <div className="divider-gold w-16 h-1 mx-auto mb-6"></div>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto">
            Muito mais que conhecimento. Uma transformação completa de como você vê o mundo e seu lugar nele.
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                {/* Ícone */}
                <div className="text-5xl mb-4 inline-block">{benefit.icon}</div>

                {/* Título */}
                <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                  {benefit.title}
                </h3>

                {/* Descrição */}
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Checkmark Animado */}
                <div className="mt-4 inline-block">
                  <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas Sociais */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                5K+
              </div>
              <p className="text-sm text-muted-foreground">Alunos Transformados</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                4.9★
              </div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                98%
              </div>
              <p className="text-sm text-muted-foreground">Taxa de Satisfação</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                ∞
              </div>
              <p className="text-sm text-muted-foreground">Acesso Vitalício</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
