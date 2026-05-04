import ProductLanding from './ProductLanding';

export default function HealthyRecipes() {
  return (
    <ProductLanding
      title="30 Receitas Saudáveis"
      subtitle="E-book Completo"
      description="Receitas práticas, deliciosas e saudáveis para transformar sua alimentação!"
      price="R$ 29,90"
      image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
      benefits={[
        '30 receitas saudáveis e deliciosas',
        'Ingredientes acessíveis e de fácil encontro',
        'Modo de preparo passo a passo',
        'Informações nutricionais completas',
        'Dicas de substituições e adaptações',
        'Cardápio semanal sugerido',
      ]}
      modules={[
        'Café da Manhã - 8 receitas nutritivas',
        'Almoço - 10 pratos principais',
        'Lanches - 6 opções saudáveis',
        'Sobremesas - 6 doces sem culpa',
      ]}
      testimonials={[
        {
          name: 'Juliana Silva',
          text: 'Receitas deliciosas e fáceis de fazer!',
          role: 'Nutricionista',
        },
        {
          name: 'Bruno Costa',
          text: 'Comecei a comer melhor com essas receitas!',
          role: 'Cliente',
        },
        {
          name: 'Camila Santos',
          text: 'Perfeito para quem quer emagrecer sem sofrimento!',
          role: 'Personal Trainer',
        },
      ]}
      paymentLink="https://hotmart.com/seu-link-aqui"
      backLink="/fitness"
      accentColor="from-green-600 to-green-800"
      textColor="text-green-400"
    />
  );
}
