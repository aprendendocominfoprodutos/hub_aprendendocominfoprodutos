import TertiaryHub from '@/components/TertiaryHub';

const foodSubNiches = [
  { id: 'receitas', title: 'Receitas Leves Mounjaro', isSpecial: true },
  { id: 'armazenamento', title: 'Armazenamento' },
  { id: 'culinaria', title: 'Culinária' },
  { id: 'dietas', title: 'Dietas' },
];

export default function FoodTertiary() {
  return (
    <TertiaryHub
      title="Alimentação"
      description="Explore receitas, técnicas de armazenamento, culinária e dietas"
      subNiches={foodSubNiches}
      backLink="/fitness-saude"
      baseLink="/fitness-saude/alimentacao"
      specialRoutes={{ receitas: '/fitness-saude/alimentacao/receitas' }}
    />
  );
}
