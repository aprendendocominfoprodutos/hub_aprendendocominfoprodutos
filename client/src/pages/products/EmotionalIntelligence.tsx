import ProductLanding from './ProductLanding';

export default function EmotionalIntelligence() {
  return (
    <ProductLanding
      title="Inteligência Emocional"
      subtitle="Masterclass Completa"
      description="Domine suas emoções e melhore seus relacionamentos pessoais e profissionais!"
      price="R$ 59,90"
      image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
      benefits={[
        'Os 5 pilares da inteligência emocional',
        'Autoconhecimento e autorregulaçãoemocional',
        'Empatia e relacionamentos saudáveis',
        'Gestão de conflitos e negociação',
        'Resiliência e lidar com adversidades',
        'Aplicação prática no dia a dia',
      ]}
      modules={[
        'Fundamentos - O que é inteligência emocional',
        'Autoconhecimento - Entenda suas emoções',
        'Relacionamentos - Conexões mais profundas',
        'Liderança - Influencie positivamente',
      ]}
      testimonials={[
        {
          name: 'Dra. Mariana Souza',
          text: 'Conteúdo excelente, baseado em psicologia científica!',
          role: 'Psicóloga',
        },
        {
          name: 'Felipe Gomes',
          text: 'Transformou minha vida pessoal e profissional!',
          role: 'Executivo',
        },
        {
          name: 'Carla Ribeiro',
          text: 'Recomendo para todos que querem crescer!',
          role: 'Coach',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/mental-financeiro"
      accentColor="from-purple-600 to-purple-800"
      textColor="text-purple-400"
    />
  );
}
