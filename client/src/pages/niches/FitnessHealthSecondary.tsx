import SecondaryHub from '@/components/SecondaryHub';

const fitnessHealthCategories = [
  {
    id: 'fitness',
    title: 'Fitness',
    description: 'Academia, treino, suplementos e recuperação',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
  },
  {
    id: 'saude',
    title: 'Saúde',
    description: 'Nutrição, bem-estar, prevenção e imunidade',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
  },
  {
    id: 'alimentacao',
    title: 'Alimentação',
    description: 'Receitas, armazenamento, culinária e dietas',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop',
  },
];

export default function FitnessHealthSecondary() {
  return (
    <SecondaryHub
      title="Fitness & Saúde"
      description="Explore nossos produtos de fitness, saúde e alimentação"
      categories={fitnessHealthCategories}
      backLink="/"
      baseLink="/fitness-saude"
    />
  );
}
