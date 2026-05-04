import ProductLanding from './ProductLanding';

export default function Supplementation() {
  return (
    <ProductLanding
      title="Suplementação Inteligente"
      subtitle="Otimize Seus Resultados"
      description="Guia prático sobre suplementos, como usar e qual escolher para seus objetivos!"
      price="R$ 34,90"
      image="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=600&fit=crop"
      benefits={[
        'Quais suplementos realmente funcionam',
        'Como escolher a marca certa',
        'Dosagem e timing corretos',
        'Suplementos para cada objetivo',
        'Mitos e verdades sobre suplementação',
        'Segurança e efeitos colaterais',
      ]}
      modules={[
        'Fundamentos - O que são suplementos',
        'Principais - Whey, creatina, BCAA, etc',
        'Seleção - Como escolher o melhor',
        'Uso - Dosagem e timing ideal',
      ]}
      testimonials={[
        {
          name: 'Dr. Gustavo Alves',
          text: 'Informações muito precisas e baseadas em ciência!',
          role: 'Médico do Esporte',
        },
        {
          name: 'Thiago Ribeiro',
          text: 'Aprendi muito! Economizei dinheiro com suplementos!',
          role: 'Atleta',
        },
        {
          name: 'Isabela Martins',
          text: 'Guia completo e muito útil!',
          role: 'Nutricionista',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/fitness"
      accentColor="from-red-600 to-red-800"
      textColor="text-red-400"
    />
  );
}
