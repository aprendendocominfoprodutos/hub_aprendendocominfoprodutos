import TertiaryHub from '@/components/TertiaryHub';

const financeSubNiches = [
  { id: 'educacao-financeira', title: 'Educação Financeira' },
  { id: 'investimentos', title: 'Investimentos' },
  { id: 'planejamento', title: 'Planejamento' },
  { id: 'riqueza', title: 'Riqueza' },
];

export default function FinanceTertiary() {
  return (
    <TertiaryHub
      title="Financeiro"
      description="Explore programas de educação financeira, investimentos, planejamento e riqueza"
      subNiches={financeSubNiches}
      backLink="/mental-financeiro"
      baseLink="/mental-financeiro/financeiro"
    />
  );
}
