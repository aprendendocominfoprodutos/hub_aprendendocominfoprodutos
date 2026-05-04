import ProductLanding from './ProductLanding';

export default function EgyptianMythology() {
  return (
    <ProductLanding
      title="Mitologia Egípcia"
      subtitle="Deuses e Mistérios"
      description="Explore os deuses egípcios, faraós e os mistérios do além-vida no Antigo Egito!"
      price="R$ 44,90"
      image="https://images.unsplash.com/photo-1570158268183-d296b2892211?w=800&h=600&fit=crop"
      benefits={[
        'Guia dos principais deuses egípcios',
        'Entenda o conceito de vida após a morte',
        'Histórias dos faraós mais importantes',
        'Influência egípcia na arquitetura moderna',
        'Rituais e crenças do Antigo Egito',
        'Análise de hieróglifos e símbolos',
      ]}
      modules={[
        'Os Deuses Egípcios - Rá, Osíris, Ísis e mais',
        'Vida e Morte - O Livro dos Mortos',
        'Os Faraós - Reis e rainhas lendários',
        'Legado Egípcio - Influência na modernidade',
      ]}
      testimonials={[
        {
          name: 'Roberto Silva',
          text: 'Fascinante! Aprendi muito sobre o Egito Antigo.',
          role: 'Arqueólogo Amador',
        },
        {
          name: 'Fernanda Lima',
          text: 'Conteúdo muito bem pesquisado e apresentado!',
          role: 'Professora',
        },
        {
          name: 'Gustavo Martins',
          text: 'Excelente! Recomendo para todos os interessados em história.',
          role: 'Historiador',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mitologia"
      accentColor="from-yellow-600 to-yellow-800"
      textColor="text-yellow-400"
    />
  );
}
