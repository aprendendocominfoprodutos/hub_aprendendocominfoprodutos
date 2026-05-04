import { useLocation } from 'wouter';
import { ArrowRight, Sparkles, BookOpen, Zap } from 'lucide-react';

/**
 * Página Hub - Porta de Entrada da Plataforma
 * 
 * Manual de Marca: BRAND_GUIDELINES_HUB.md
 * 
 * Design: Profissional, moderno, convergência de conhecimentos
 * Cores: Azul profundo (#0F172A) + Âmbar (#F59E0B)
 * Tipografia: Poppins (headlines) + Inter (body)
 */

export default function Hub() {
  const [, setLocation] = useLocation();

  const niches = [
    {
      id: 'mythology',
      title: 'Mitologia Grega',
      subtitle: 'Deuses, Heróis e Significados Ocultos',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_thumbnail_mitologia-Q7ARDN36sX5wAtFynv5C7u.webp',
      path: '/mythcuriotvbrasil',
      icon: '📚'
    },
    {
      id: 'fitness',
      title: 'Fitness & Receitas',
      subtitle: '30 Receitas para Mounjaro/Tirzepatida',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_thumbnail_fitness-RSQMuwKbQqsYaSSfsUbaJv.webp',
      path: '/fitnessesaude',
      icon: '💪'
    },
    {
      id: 'mental',
      title: 'Mental & Financeiro',
      subtitle: 'Saúde Mental, Inteligência Emocional e Educação Financeira',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_thumbnail_mental-TfuEbDtAX4oAdJLSv8y6Fq.webp',
      path: '/mentalefinanceiro',
      icon: '💰'
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-amber-500 text-sm font-medium">Plataforma Premium de Aprendizado</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
            Escolha Seu Caminho de <span className="text-amber-500">Aprendizado</span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore nossos produtos premium em diferentes áreas do conhecimento. 
            Cada nicho é uma jornada transformadora curada por especialistas.
          </p>
        </div>

        {/* Niches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {niches.map((niche, index) => (
            <div
              key={niche.id}
              className="group cursor-pointer"
              onClick={() => setLocation(niche.path)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl h-96 bg-slate-800 border border-slate-700/50 transition-all duration-300 hover:shadow-2xl hover:border-amber-500/30">
                {/* Image */}
                <img
                  src={niche.image}
                  alt={niche.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Icon */}
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {niche.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
                    {niche.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-slate-200 mb-4 line-clamp-2">
                    {niche.subtitle}
                  </p>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(niche.path);
                    }}
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full group/btn hover:shadow-lg"
                  >
                    Explorar
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-12 mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: 'Poppins' }}>
            Por Que Escolher Nossa Plataforma
          </h3>

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
                  <h4 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
                    {feature.title}
                  </h4>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-slate-700/30">
          <p className="text-slate-300 mb-6">
            Cada nicho possui conteúdo premium, curado e desenvolvido por especialistas em suas áreas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLocation('/mythcuriotvbrasil')}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Começar Agora
            </button>
            <button
              className="px-8 py-3 border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 font-semibold rounded-lg transition-all duration-300"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700/30 py-8 mt-20 relative z-10">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; 2026 Aprendendo com InfoProdutos. Todos os direitos reservados.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap');
      `}</style>
    </div>
  );
}
