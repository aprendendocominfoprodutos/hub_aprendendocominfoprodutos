import SecondaryHub from '@/components/SecondaryHub';

const mentalFinanceCategories = [
  {
    id: 'mental',
    title: 'Mental',
    description: 'Inteligência emocional, ansiedade, relacionamentos e autoestima',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    description: 'Educação financeira, investimentos, planejamento e riqueza',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
];

export default function MentalFinanceSecondary() {
  return (
    <SecondaryHub
      title="Mental & Financeiro"
      description="Explore nossos produtos de saúde mental e educação financeira"
      categories={mentalFinanceCategories}
      backLink="/"
      baseLink="/mental-financeiro"
    />
  );
}
