import ProductLanding from './ProductLanding';

export default function NordicMythology() {
  return (
    <ProductLanding
      title="Mitologia Nórdica"
      subtitle="Guia Essencial"
      description="Descubra os deuses nórdicos, Valhala, o Ragnarok e as lendas dos vikings!"
      price="R$ 39,90"
      image="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=600&fit=crop"
      benefits={[
        'Guia dos deuses nórdicos (Odin, Thor, Loki)',
        'Entenda o conceito de Valhala e Ragnarok',
        'Histórias dos gigantes e criaturas mitológicas',
        'Influência nórdica na cultura pop',
        'Comparação com mitologias germânicas',
        'Exercícios de aprendizado interativo',
      ]}
      modules={[
        'Os Deuses Nórdicos - Odin, Thor, Freya e mais',
        'O Fim do Mundo - Ragnarok explicado',
        'Criaturas Mitológicas - Gigantes, dragões e monstros',
        'Legado Moderno - Mitologia nos filmes e séries',
      ]}
      testimonials={[
        {
          name: 'Ana Costa',
          text: 'Excelente material sobre mitologia nórdica. Muito completo!',
          role: 'Fã de Vikings',
        },
        {
          name: 'Carlos Mendes',
          text: 'Adorei! Conteúdo profundo e bem estruturado.',
          role: 'Pesquisador',
        },
        {
          name: 'Lucia Ferreira',
          text: 'Perfeito para quem quer aprender sobre os vikings!',
          role: 'Historiadora',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mitologia"
      accentColor="from-blue-600 to-blue-800"
      textColor="text-blue-400"
    />
  );
}
