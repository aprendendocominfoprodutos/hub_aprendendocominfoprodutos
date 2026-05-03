import { useEffect, useRef, useState } from 'react';

export default function ContentShowcase() {
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

  const topics = [
    {
      title: 'Os Deuses do Olimpo',
      description: 'Conheça Zeus, Atena, Apolo e os 9 deuses principais que governam o universo grego.',
      icon: '⚡',
    },
    {
      title: 'Heróis Legendários',
      description: 'As jornadas de Héracles, Perseu, Aquiles e os heróis que desafiaram os deuses.',
      icon: '🛡️',
    },
    {
      title: 'Significados Ocultos',
      description: 'Desvende os arquétipos e simbolismos que sustentam toda a mitologia grega.',
      icon: '🔮',
    },
    {
      title: 'Transformação Pessoal',
      description: 'Aplique a sabedoria dos mitos para transformar sua vida e alcançar seu potencial.',
      icon: '✨',
    },
    {
      title: 'Poder e Destino',
      description: 'Compreenda a relação entre livre arbítrio e destino na filosofia grega.',
      icon: '🌟',
    },
    {
      title: 'Legado Eterno',
      description: 'Como a mitologia grega continua influenciando a cultura, arte e psicologia modernas.',
      icon: '📚',
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
            O Que Você Vai Aprender
          </h2>
          <div className="divider-gold w-16 h-1 mx-auto mb-6"></div>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto">
            Seis módulos essenciais que cobrem toda a sabedoria da mitologia grega, desde os deuses até as aplicações práticas em sua vida.
          </p>
        </div>

        {/* Grid de Tópicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`card-premium transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Ícone */}
              <div className="text-4xl mb-4">{topic.icon}</div>

              {/* Título */}
              <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                {topic.title}
              </h3>

              {/* Descrição */}
              <p className="body-text text-foreground/70">
                {topic.description}
              </p>

              {/* Linha de Ouro Inferior */}
              <div className="h-0.5 bg-gradient-to-r from-primary to-transparent mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
