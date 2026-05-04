import QuaternaryHub from '@/components/QuaternaryHub';

const greekGeneral = [
  { id: 1, name: 'Introdução', price: 'R$ 19,90' },
  { id: 2, name: 'Cosmologia', price: 'R$ 19,90' },
  { id: 3, name: 'Mitos Clássicos', price: 'R$ 19,90' },
  { id: 4, name: 'Legado Grego', price: 'R$ 19,90' },
];

export default function MythologyGreekGeneral() {
  return (
    <QuaternaryHub
      title="Mitologia Grega Geral"
      description="Conheça os conceitos gerais da mitologia grega"
      products={greekGeneral}
      backLink="/mitologia/grega"
    />
  );
}
