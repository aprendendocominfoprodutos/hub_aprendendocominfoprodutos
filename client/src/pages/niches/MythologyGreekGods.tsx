import QuaternaryHub from '@/components/QuaternaryHub';

const greekGods = [
  { id: 1, name: 'Zeus', price: 'R$ 29,90' },
  { id: 2, name: 'Atena', price: 'R$ 29,90' },
  { id: 3, name: 'Poseidon', price: 'R$ 29,90' },
  { id: 4, name: 'Afrodite', price: 'R$ 29,90' },
];

export default function MythologyGreekGods() {
  return (
    <QuaternaryHub
      title="Deuses Gregos"
      description="Conheça os principais deuses da mitologia grega"
      products={greekGods}
      backLink="/mitologia/grega"
    />
  );
}
