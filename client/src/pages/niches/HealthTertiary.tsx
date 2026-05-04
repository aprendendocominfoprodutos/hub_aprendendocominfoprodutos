import TertiaryHub from '@/components/TertiaryHub';

const healthSubNiches = [
  { id: 'nutricao', title: 'Nutrição' },
  { id: 'bem-estar', title: 'Bem-estar' },
  { id: 'prevencao', title: 'Prevenção' },
  { id: 'imunidade', title: 'Imunidade' },
];

export default function HealthTertiary() {
  return (
    <TertiaryHub
      title="Saúde"
      description="Explore programas de nutrição, bem-estar, prevenção e imunidade"
      subNiches={healthSubNiches}
      backLink="/fitness-saude"
      baseLink="/fitness-saude/saude"
    />
  );
}
