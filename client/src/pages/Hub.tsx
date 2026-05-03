import { useLocation } from 'wouter';
import { ArrowRight, Shield, Award, Star, Zap } from 'lucide-react';

/**
 * Página Hub/Marketplace Premium
 * 
 * Funciona como vitrine dos 3 produtos:
 * - Mitologia Grega
 * - Fitness & Receitas
 * - Mental & Financeiro
 * 
 * Design: Premium, profissional, conversível
 * Tema: Azul-marinho + Dourado (holding)
 */

export default function Hub() {
  const [, setLocation] = useLocation();

  const products = [
    {
      id: 'mythology',
      title: 'Mitologia Grega',
      subtitle: 'Deuses, Heróis e Significados Ocultos',
      description: 'Compreenda os padrões ancestrais que moldam o comportamento humano. Um kit visual completo com e-book, mapa de deuses, guia rápido e cards de símbolos.',
      price: 'R$ 49,90',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_products_showcase-bkM3thkyyn9tReucivRW9m.webp',
      benefits: ['E-book completo', 'Mapa visual', 'Guia rápido', 'Cards de símbolos'],
      path: '/mythcuriotvbrasil',
      color: 'from-yellow-600 to-amber-600',
      icon: '📚'
    },
    {
      id: 'fitness',
      title: 'Fitness & Receitas',
      subtitle: '30 Receitas para Mounjaro/Tirzepatida',
      description: 'Otimize seu tratamento com 30 receitas leves e saborosas. Cardápios prontos, lista de compras, tabelas de substituições e dicas práticas.',
      price: 'R$ 29,90',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_products_showcase-bkM3thkyyn9tReucivRW9m.webp',
      benefits: ['30 receitas', 'Cardápio de 7 dias', 'Lista de compras', 'Dicas práticas'],
      path: '/fitnessesaude',
      color: 'from-green-500 to-emerald-600',
      icon: '💪'
    },
    {
      id: 'finance',
      title: 'Mental & Financeiro',
      subtitle: 'Saúde Mental, Inteligência Emocional e Educação Financeira',
      description: 'Transforme sua relação com dinheiro e emoções. Conteúdo premium sobre bem-estar mental, inteligência emocional e estratégias financeiras práticas.',
      price: 'Em breve',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_products_showcase-bkM3thkyyn9tReucivRW9m.webp',
      benefits: ['Saúde mental', 'Inteligência emocional', 'Educação financeira', 'Estratégias práticas'],
      path: '/mentalefinanceiro',
      color: 'from-blue-600 to-indigo-600',
      icon: '💰'
    }
  ];

  const testimonials = [
    {
      name: 'Marina Silva',
      role: 'Professora de História',
      text: 'A plataforma é incrível! Encontrei exatamente o que procurava em um só lugar.',
      rating: 5
    },
    {
      name: 'Carlos Mendes',
      role: 'Psicólogo',
      text: 'Qualidade premium, conteúdo relevante e preços acessíveis. Recomendo!',
      rating: 5
    },
    {
      name: 'Juliana Costa',
      role: 'Empreendedora',
      text: 'Cada produto é uma obra-prima. Vale cada centavo investido.',
      rating: 5
    }
  ];

  const whyChoose = [
    {
      icon: Shield,
      title: 'Seguro & Confiável',
      description: 'Pagamento 100% seguro com proteção ao comprador'
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Conteúdo curado e desenvolvido por especialistas'
    },
    {
      icon: Zap,
      title: 'Acesso Instantâneo',
      description: 'Receba seu produto imediatamente após a compra'
    },
    {
      icon: Star,
      title: 'Satisfação Garantida',
      description: 'Garantia de 7 dias ou seu dinheiro de volta'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_hero_banner-mnd7EKxN2veUNuBbHD5us2.webp"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="headline-primary mb-6">
              Conhecimento. Crescimento. Transformação.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Plataforma premium de infoprodutos que empodera cada aspecto da sua melhor vida
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
            <button
              onClick={() => setLocation('/mythcuriotvbrasil')}
              className="btn-cta inline-flex items-center justify-center gap-2"
            >
              Explorar Produtos
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className="btn-cta-outline inline-flex items-center justify-center gap-2"
            >
              Saiba Mais
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Compra Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Acesso Instantâneo</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span>Garantia 7 Dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="headline-primary mb-4">Nossos Produtos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada produto é cuidadosamente desenvolvido para entregar máximo valor e transformação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="card-premium group hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-30`}></div>
                  <div className="absolute top-4 right-4 text-4xl">{product.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-2 text-foreground">{product.title}</h3>
                <p className="text-primary font-semibold mb-3">{product.subtitle}</p>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="mb-6 space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="border-t border-border pt-6">
                  <div className="text-3xl font-bold text-primary mb-4">{product.price}</div>
                  <button
                    onClick={() => setLocation(product.path)}
                    className="btn-cta w-full"
                  >
                    Acessar Produto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="headline-primary mb-4">Por Que Nos Escolher</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Qualidade, confiança e resultados comprovados
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {whyChoose.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="card-premium text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="headline-primary mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Milhares de pessoas já transformaram suas vidas com nossos produtos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="card-premium">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="card-premium p-8 md:p-12 text-center">
            <h2 className="headline-primary mb-12">Compre com Confiança</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">100% Seguro</h3>
                <p className="text-sm text-muted-foreground">Transações criptografadas</p>
              </div>
              <div>
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Verificado</h3>
                <p className="text-sm text-muted-foreground">Conteúdo de qualidade comprovada</p>
              </div>
              <div>
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Acesso Instantâneo</h3>
                <p className="text-sm text-muted-foreground">Receba em segundos</p>
              </div>
              <div>
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Garantia</h3>
                <p className="text-sm text-muted-foreground">7 dias de garantia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="headline-primary mb-6">Pronto para Transformar?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Escolha o produto que mais combina com você e comece sua jornada de transformação hoje mesmo
          </p>
          <button
            onClick={() => setLocation('/mythcuriotvbrasil')}
            className="btn-cta inline-flex items-center justify-center gap-2"
          >
            Explorar Todos os Produtos
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Sobre</h3>
              <p className="text-sm text-muted-foreground">Plataforma premium de infoprodutos que empodera transformação pessoal e profissional.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Produtos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setLocation('/mythcuriotvbrasil')} className="hover:text-primary transition">Mitologia Grega</button></li>
                <li><button onClick={() => setLocation('/fitnessesaude')} className="hover:text-primary transition">Fitness & Receitas</button></li>
                <li><button onClick={() => setLocation('/mentalefinanceiro')} className="hover:text-primary transition">Mental & Financeiro</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:contato@aprendendocominfoprodutos.com.br" className="hover:text-primary transition">
                  contato@aprendendocominfoprodutos.com.br
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
