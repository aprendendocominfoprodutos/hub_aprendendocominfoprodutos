import ProductLanding from './ProductLanding';

export default function AztecMythology() {
  return (
    <ProductLanding
      title="Mitologia Asteca"
      subtitle="Cosmologia"
      description="Descubra os deuses astecas, sacrifícios e o calendário misterioso dos astecas!"
      price="R$ 34,90"
      image="https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=800&h=600&fit=crop"
      benefits={[
        'Guia dos deuses astecas principais',
        'Entenda o conceito de sacrifício ritual',
        'História do Império Asteca',
        'Calendário asteca e suas previsões',
        'Influência asteca na América Latina',
        'Comparação com outras mitologias mesoamericanas',
      ]}
      modules={[
        'Os Deuses Astecas - Huitzilopochtli, Quetzalcoatl',
        'Sacrifícios e Rituais - Significado e prática',
        'O Império Asteca - História e cultura',
        'Legado Moderno - Astecas na atualidade',
      ]}
      testimonials={[
        {
          name: 'Diego Hernandez',
          text: 'Excelente conteúdo sobre a mitologia asteca!',
          role: 'Antropólogo',
        },
        {
          name: 'Valentina Rojas',
          text: 'Muito informativo e bem estruturado!',
          role: 'Estudante',
        },
        {
          name: 'Miguel Cortés',
          text: 'Recomendo! Aprendi muito sobre minha herança cultural.',
          role: 'Historiador Cultural',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mitologia"
      accentColor="from-red-600 to-red-800"
      textColor="text-red-400"
    />
  );
}
