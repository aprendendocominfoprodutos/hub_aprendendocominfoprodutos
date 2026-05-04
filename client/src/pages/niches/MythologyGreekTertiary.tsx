import TertiaryHub from '@/components/TertiaryHub';

const greekSubNiches = [
  { id: 'deuses', title: 'Deuses Gregos' },
  { id: 'herois', title: 'Heróis Gregos' },
  { id: 'batalhas', title: 'Batalhas Gregas' },
  { id: 'geral', title: 'Mitologia Grega Geral' },
];

export default function MythologyGreekTertiary() {
  return (
    <TertiaryHub
      title="Mitologia Grega"
      description="Explore os deuses, heróis e batalhas da Grécia Antiga"
      subNiches={greekSubNiches}
      backLink="/mitologia"
      baseLink="/mitologia/grega"
    />
  );
}
