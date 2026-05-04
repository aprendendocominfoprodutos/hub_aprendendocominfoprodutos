import QuaternaryHub from '@/components/QuaternaryHub';

const greekBattles = [
  { id: 1, name: 'Troiana', price: 'R$ 34,90' },
  { id: 2, name: 'Maratona', price: 'R$ 34,90' },
  { id: 3, name: 'Salamina', price: 'R$ 34,90' },
  { id: 4, name: 'Termópilas', price: 'R$ 34,90' },
];

export default function MythologyGreekBattles() {
  return (
    <QuaternaryHub
      title="Batalhas Gregas"
      description="Conheça as principais batalhas da mitologia grega"
      products={greekBattles}
      backLink="/mitologia/grega"
    />
  );
}
