import QuaternaryHub from '@/components/QuaternaryHub';

const planejamentoProducts = [
  { id: 1, name: 'Educação Financeira', price: 'R$ 29,90' },
  { id: 2, name: 'Investimentos', price: 'R$ 39,90' },
  { id: 3, name: 'Renda Extra com Celular', price: 'R$ 97,00', link: '/mental-financeiro/financeiro/planejamento/renda-extra' },
  { id: 4, name: 'Riqueza e Prosperidade', price: 'R$ 49,90' },
];

export default function PlanejamentoFinanceiro() {
  return (
    <QuaternaryHub
      title="Planejamento Financeiro"
      description="Explore programas de planejamento financeiro e renda extra"
      products={planejamentoProducts}
      backLink="/mental-financeiro/financeiro"
    />
  );
}
