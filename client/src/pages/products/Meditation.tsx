import ProductLanding from './ProductLanding';

export default function Meditation() {
  return (
    <ProductLanding
      title="Meditação & Mindfulness"
      subtitle="30 Dias de Transformação"
      description="Encontre paz, clareza mental e bem-estar com práticas de meditação guiada!"
      price="R$ 29,90"
      image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
      benefits={[
        '30 meditações guiadas progressivas',
        'Técnicas de respiração e relaxamento',
        'Redução de ansiedade e estresse',
        'Melhora do foco e concentração',
        'Sono de melhor qualidade',
        'Práticas diárias de 10-20 minutos',
      ]}
      modules={[
        'Semana 1 - Fundamentos da meditação',
        'Semana 2 - Técnicas de respiração',
        'Semana 3 - Mindfulness no dia a dia',
        'Semana 4 - Meditação avançada',
      ]}
      testimonials={[
        {
          name: 'Dra. Helena Costa',
          text: 'Excelente para reduzir ansiedade!',
          role: 'Psicóloga',
        },
        {
          name: 'Marcos Silva',
          text: 'Transformou minha qualidade de vida!',
          role: 'Executivo',
        },
        {
          name: 'Sophia Oliveira',
          text: 'Durmo melhor e me sinto mais calma!',
          role: 'Estudante',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mental-financeiro"
      accentColor="from-indigo-600 to-indigo-800"
      textColor="text-indigo-400"
    />
  );
}
