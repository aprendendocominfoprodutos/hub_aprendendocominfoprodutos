import ProductLanding from './ProductLanding';

export default function GreekMythology() {
  return (
    <ProductLanding
      title="Mitologia Grega"
      subtitle="Kit Completo"
      description="Explore os deuses, heróis e lendas da Grécia Antiga. Aprenda sobre Zeus, Afrodite, Héracles e muito mais!"
      price="R$ 49,90"
      image="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=600&fit=crop"
      benefits={[
        'Guia completo dos 12 deuses do Olimpo',
        'Histórias dos maiores heróis gregos',
        'Análise profunda de mitos clássicos',
        'Influência da mitologia na cultura moderna',
        'Comparação com outras mitologias',
        'Exercícios de compreensão e reflexão',
      ]}
      modules={[
        'Os Deuses do Olimpo - Conheça cada divindade',
        'Heróis Lendários - Héracles, Perseu, Teseu',
        'Mitos Clássicos - Troiana, Odisseia, Argonáutas',
        'Influência Moderna - Mitologia na arte e cinema',
      ]}
      testimonials={[
        {
          name: 'João Silva',
          text: 'Conteúdo excelente! Aprendi muito sobre a mitologia grega de forma clara e envolvente.',
          role: 'Estudante de História',
        },
        {
          name: 'Maria Santos',
          text: 'Recomendo! Material bem estruturado e fácil de entender.',
          role: 'Professora de Literatura',
        },
        {
          name: 'Pedro Costa',
          text: 'Superou minhas expectativas. Muito profundo e detalhado!',
          role: 'Entusiasta de Mitologia',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mitologia"
      accentColor="from-amber-600 to-amber-800"
      textColor="text-amber-400"
    />
  );
}
