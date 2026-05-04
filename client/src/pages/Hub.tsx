import Carousel from '@/components/Carousel';
import { ArrowRight, Sparkles, BookOpen, Zap } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Hub Principal - Netflix Style Layout
 * 
 * Design: Dark Premium com Carousel Horizontal
 * Paleta: Azul Profundo (#07101f) + Âmbar (#c9a24a)
 * Tipografia: Poppins (títulos) + Inter (corpo)
 * 
 * Estrutura:
 * 1. Hero Section
 * 2. 3 Carousels (Mitologia, Fitness, Mental/Financeiro)
 * 3. Features
 * 4. CTA Final
 * 5. Footer
 */

export default function Hub() {
  const [, setLocation] = useLocation();

  // Dados dos produtos de Mitologia
  const mythologyProducts = [
    {
      id: 'greek',
      title: 'Mitologia Grega',
      subtitle: 'Deuses e Heróis',
      image: 'https://images.unsplash.com/photo-1578926078328-123456789012?w=400&h=500&fit=crop',
      price: 'R$ 49,90',
      link: '/mitologia/grega',
    },
    {
      id: 'nordic',
      title: 'Mitologia Nórdica',
      subtitle: 'Valhala e Ragnarok',
      image: 'https://images.unsplash.com/photo-1578926078328-123456789013?w=400&h=500&fit=crop',
      price: 'R$ 39,90',
      link: '/mitologia/nordica',
    },
    {
      id: 'egyptian',
      title: 'Mitologia Egípcia',
      subtitle: 'Deuses do Nilo',
      image: 'https://images.unsplash.com/photo-1578926078328-123456789014?w=400&h=500&fit=crop',
      price: 'R$ 44,90',
      link: '/mitologia/egipcia',
    },
    {
      id: 'aztec',
      title: 'Mitologia Asteca',
      subtitle: 'Cosmologia Asteca',
      image: 'https://images.unsplash.com/photo-1578926078328-123456789015?w=400&h=500&fit=crop',
      price: 'R$ 34,90',
      link: '/mitologia/asteca',
    },
  ];

  // Dados dos produtos de Fitness
  const fitnessProducts = [
    {
      id: 'recipes',
      title: 'Receitas Saudáveis',
      subtitle: '30 Receitas Premium',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=500&fit=crop',
      price: 'R$ 29,90',
      link: '/fitness/receitas',
    },
    {
      id: 'training',
      title: 'Plano de Treino',
      subtitle: '12 Semanas',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
      price: 'R$ 39,90',
      link: '/fitness/treino',
    },
    {
      id: 'nutrition',
      title: 'Nutrição Avançada',
      subtitle: 'Guia Completo',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=500&fit=crop',
      price: 'R$ 44,90',
      link: '/fitness/nutricao',
    },
    {
      id: 'supplements',
      title: 'Suplementação',
      subtitle: 'Guia Prático',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop',
      price: 'R$ 34,90',
      link: '/fitness/suplementacao',
    },
  ];

  // Dados dos produtos de Mental/Financeiro
  const mentalFinanceProducts = [
    {
      id: 'emotional',
      title: 'Inteligência Emocional',
      subtitle: 'Desenvolvimento Pessoal',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=500&fit=crop',
      price: 'R$ 44,90',
      link: '/mental-financeiro/emocional',
    },
    {
      id: 'financial',
      title: 'Educação Financeira',
      subtitle: 'Gestão de Finanças',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec33a8d008?w=400&h=500&fit=crop',
      price: 'R$ 49,90',
      link: '/mental-financeiro/financeira',
    },
    {
      id: 'meditation',
      title: 'Meditação & Mindfulness',
      subtitle: 'Paz Interior',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=500&fit=crop',
      price: 'R$ 39,90',
      link: '/mental-financeiro/meditacao',
    },
    {
      id: 'investments',
      title: 'Investimentos Inteligentes',
      subtitle: 'Construa seu Patrimônio',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec33a8d008?w=400&h=500&fit=crop',
      price: 'R$ 54,90',
      link: '/mental-financeiro/investimentos',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Conteúdo Premium',
      description: 'Curado e desenvolvido por especialistas em cada área'
    },
    {
      icon: Zap,
      title: 'Acesso Instantâneo',
      description: 'Comece imediatamente após a compra'
    },
    {
      icon: Sparkles,
      title: 'Transformação',
      description: 'Conhecimento que realmente muda vidas'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Decorativo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
                Aprendendo com <span className="text-amber-500">InfoProdutos</span>
              </h1>
              <p className="text-slate-400 mt-1 text-sm">Conhecimento. Crescimento. Transformação.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-amber-500 text-sm font-medium">✨ Plataforma Premium de Aprendizado</span>
            </div>

            {/* Título */}
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
              Escolha Seu Caminho de <span className="text-amber-500">Aprendizado</span>
            </h2>

            {/* Descrição */}
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Explore nossos produtos premium em diferentes áreas do conhecimento. Cada nicho é uma jornada transformadora curada por especialistas.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                Começar Agora
                <ArrowRight size={18} />
              </button>
              <button className="px-8 py-3 border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 font-bold rounded-lg transition-colors">
                Saiba Mais
              </button>
            </div>
          </div>
        </section>

        {/* Carousels */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <Carousel 
            title="📚 Mitologia" 
            items={mythologyProducts}
          />
          <Carousel 
            title="💪 Fitness & Saúde" 
            items={fitnessProducts}
          />
          <Carousel 
            title="💰 Mental & Financeiro" 
            items={mentalFinanceProducts}
          />
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12" style={{ fontFamily: 'Poppins' }}>
              Por Que Escolher Nossa Plataforma
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-amber-500/10 rounded-lg">
                        <Icon size={32} className="text-amber-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
              Pronto Para Transformar Sua Vida?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Escolha um de nossos produtos e comece sua jornada hoje mesmo
            </p>
            <button className="px-12 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-lg transition-colors">
              Explorar Todos os Produtos
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-8 px-4 text-center text-slate-400 relative z-10">
        <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap');
      `}</style>
    </div>
  );
}
