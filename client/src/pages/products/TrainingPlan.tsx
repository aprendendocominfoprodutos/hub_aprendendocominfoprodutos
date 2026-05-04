import ProductLanding from './ProductLanding';

export default function TrainingPlan() {
  return (
    <ProductLanding
      title="Plano de Treino 90 Dias"
      subtitle="Transformação Garantida"
      description="Programa completo de treino para resultados visíveis em 90 dias!"
      price="R$ 49,90"
      image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
      benefits={[
        'Programa de 90 dias estruturado',
        'Exercícios para iniciantes e avançados',
        'Vídeos demonstrativos de cada exercício',
        'Acompanhamento de progresso',
        'Adaptações para diferentes objetivos',
        'Suporte via comunidade exclusiva',
      ]}
      modules={[
        'Fase 1 (30 dias) - Fundação e adaptação',
        'Fase 2 (30 dias) - Intensificação',
        'Fase 3 (30 dias) - Transformação',
        'Bônus - Guia de nutrição para treino',
      ]}
      testimonials={[
        {
          name: 'Lucas Oliveira',
          text: 'Perdi 15kg em 90 dias! Recomendo!',
          role: 'Cliente',
        },
        {
          name: 'Amanda Rocha',
          text: 'Programa excelente, muito bem estruturado!',
          role: 'Personal Trainer',
        },
        {
          name: 'Rafael Mendes',
          text: 'Melhor investimento que fiz em saúde!',
          role: 'Empresário',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/fitness"
      accentColor="from-blue-600 to-blue-800"
      textColor="text-blue-400"
    />
  );
}
