import TertiaryHub from '@/components/TertiaryHub';

const mentalSubNiches = [
  { id: 'inteligencia-emocional', title: 'Inteligência Emocional' },
  { id: 'ansiedade', title: 'Ansiedade' },
  { id: 'relacionamentos', title: 'Relacionamentos' },
  { id: 'autoestima', title: 'Autoestima' },
];

export default function MentalTertiary() {
  return (
    <TertiaryHub
      title="Mental"
      description="Explore programas de inteligência emocional, ansiedade, relacionamentos e autoestima"
      subNiches={mentalSubNiches}
      backLink="/mental-financeiro"
      baseLink="/mental-financeiro/mental"
    />
  );
}
