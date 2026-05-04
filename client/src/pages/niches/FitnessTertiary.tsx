import TertiaryHub from '@/components/TertiaryHub';

const fitnessSubNiches = [
  { id: 'academia', title: 'Academia' },
  { id: 'treino', title: 'Treino' },
  { id: 'suplementos', title: 'Suplementos' },
  { id: 'recuperacao', title: 'Recuperação' },
];

export default function FitnessTertiary() {
  return (
    <TertiaryHub
      title="Fitness"
      description="Explore programas de academia, treino, suplementação e recuperação"
      subNiches={fitnessSubNiches}
      backLink="/fitness-saude"
      baseLink="/fitness-saude/fitness"
    />
  );
}
