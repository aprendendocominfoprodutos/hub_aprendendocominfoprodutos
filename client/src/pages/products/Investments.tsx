import ProductLanding from './ProductLanding';

export default function Investments() {
  return (
    <ProductLanding
      title="Investimentos Inteligentes"
      subtitle="Guia Prático"
      description="Comece a investir com confiança e construa seu patrimônio!"
      price="R$ 54,90"
      image="https://images.unsplash.com/photo-1579621970563-ebec33a8d008?w=800&h=600&fit=crop"
      benefits={[
        'Tipos de investimentos explicados',
        'Como abrir sua conta de investimento',
        'Análise de risco e retorno',
        'Carteira de investimentos para iniciantes',
        'Impostos e como otimizá-los',
        'Acompanhamento e rebalanceamento',
      ]}
      modules={[
        'Fundamentos - Tipos de investimentos',
        'Prática - Como começar a investir',
        'Estratégia - Construir sua carteira',
        'Avançado - Otimização e crescimento',
      ]}
      testimonials={[
        {
          name: 'Gustavo Ferreira',
          text: 'Finalmente entendi como investir!',
          role: 'Iniciante',
        },
        {
          name: 'Dra. Lucia Martins',
          text: 'Conteúdo muito bem estruturado!',
          role: 'Consultora Financeira',
        },
        {
          name: 'Roberto Gomes',
          text: 'Excelente guia prático para iniciantes!',
          role: 'Empresário',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mental-financeiro"
      accentColor="from-emerald-600 to-emerald-800"
      textColor="text-emerald-400"
    />
  );
}
