import ProductLanding from './ProductLanding';

export default function Nutrition() {
  return (
    <ProductLanding
      title="Guia de Nutrição Completo"
      subtitle="Ciência da Alimentação"
      description="Entenda como alimentar seu corpo corretamente para máximos resultados!"
      price="R$ 39,90"
      image="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop"
      benefits={[
        'Fundamentos da nutrição científica',
        'Macronutrientes e micronutrientes explicados',
        'Cálculo de calorias para seu objetivo',
        'Planos alimentares personalizáveis',
        'Suplementação inteligente',
        'Dicas de compras e preparação de refeições',
      ]}
      modules={[
        'Fundamentos - Macros, micros e calorias',
        'Objetivos - Ganho, perda ou manutenção',
        'Planejamento - Criar seu plano ideal',
        'Prática - Implementação e ajustes',
      ]}
      testimonials={[
        {
          name: 'Dra. Fernanda Dias',
          text: 'Guia muito bem fundamentado cientificamente!',
          role: 'Nutricionista',
        },
        {
          name: 'Marcelo Ferreira',
          text: 'Finalmente entendi como funciona a nutrição!',
          role: 'Cliente',
        },
        {
          name: 'Beatriz Costa',
          text: 'Excelente! Recomendo para todos!',
          role: 'Educadora Física',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/fitness"
      accentColor="from-orange-600 to-orange-800"
      textColor="text-orange-400"
    />
  );
}
