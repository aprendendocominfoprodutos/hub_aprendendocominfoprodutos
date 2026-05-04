import QuaternaryHub from '@/components/QuaternaryHub';

const greekHeroes = [
  { id: 1, name: 'Héracles', price: 'R$ 24,90' },
  { id: 2, name: 'Perseu', price: 'R$ 24,90' },
  { id: 3, name: 'Teseu', price: 'R$ 24,90' },
  { id: 4, name: 'Aquiles', price: 'R$ 24,90' },
];

export default function MythologyGreekHeroes() {
  return (
    <QuaternaryHub
      title="Heróis Gregos"
      description="Conheça os principais heróis da mitologia grega"
      products={greekHeroes}
      backLink="/mitologia/grega"
    />
  );
}
