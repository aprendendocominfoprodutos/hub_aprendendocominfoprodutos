import ProductLanding from './ProductLanding';

export default function FinancialEducation() {
  return (
    <ProductLanding
      title="Educação Financeira"
      subtitle="Do Zero ao Milhão"
      description="Aprenda a construir riqueza de verdade com estratégias comprovadas!"
      price="R$ 69,90"
      image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
      benefits={[
        'Fundamentos de finanças pessoais',
        'Como criar e manter um orçamento',
        'Estratégias de investimento para iniciantes',
        'Diversificação de renda',
        'Planejamento para aposentadoria',
        'Mentalidade de riqueza',
      ]}
      modules={[
        'Fundamentos - Conceitos básicos de finanças',
        'Investimentos - Onde e como investir',
        'Renda Passiva - Construir fluxos de renda',
        'Riqueza - Estratégias para longo prazo',
      ]}
      testimonials={[
        {
          name: 'Prof. Ricardo Neves',
          text: 'Excelente material educativo sobre finanças!',
          role: 'Economista',
        },
        {
          name: 'Juliana Martins',
          text: 'Mudou minha relação com dinheiro!',
          role: 'Empreendedora',
        },
        {
          name: 'Sergio Alves',
          text: 'Recomendo! Conteúdo prático e aplicável!',
          role: 'Investidor',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mental-financeiro"
      accentColor="from-blue-600 to-blue-800"
      textColor="text-blue-400"
    />
  );
}
