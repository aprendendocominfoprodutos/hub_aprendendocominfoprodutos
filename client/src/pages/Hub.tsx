import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

/**
 * Hub Principal - Thumbnail Navigation
 * 
 * Design: Dark Premium com 3 Thumbnails
 * Paleta: Azul Profundo (#07101f) + Âmbar (#c9a24a)
 * Tipografia: Poppins (títulos) + Inter (corpo)
 * 
 * Estrutura:
 * 1. Hero Section
 * 2. 3 Thumbnails (Mitologia, Fitness, Mental/Financeiro)
 * 3. Features
 * 4. CTA Final
 * 5. Footer
 */

const niches = [
  {
    id: 'mitologia',
    title: 'Mitologia',
    subtitle: 'Deuses, Heróis e Lendas',
    image: 'https://images.unsplash.com/photo-1578926078328-123456789012?w=600&h=400&fit=crop',
    link: '/mitologia',
    color: 'from-amber-600 to-amber-900',
  },
  {
    id: 'fitness',
    title: 'Fitness & Saúde',
    subtitle: 'Receitas, Treino e Nutrição',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    link: '/fitness',
    color: 'from-green-600 to-green-900',
  },
  {
    id: 'mental-financeiro',
    title: 'Mental & Financeiro',
    subtitle: 'Saúde Mental e Educação Financeira',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    link: '/mental-financeiro',
    color: 'from-blue-600 to-blue-900',
  },
];

export default function Hub() {
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

        {/* Thumbnails Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {niches.map((niche) => (
              <Link key={niche.id} href={niche.link} className="group cursor-pointer">
                  {/* Thumbnail Card */}
                  <div className="relative h-80 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    {/* Imagem */}
                    <img
                      src={niche.image}
                      alt={niche.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${niche.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

                    {/* Conteúdo */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>
                        {niche.title}
                      </h3>
                      <p className="text-lg text-gray-100 mb-4">
                        {niche.subtitle}
                      </p>
                      <button className="self-start bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        Explorar
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12" style={{ fontFamily: 'Poppins' }}>
              Por Que Escolher Nossa Plataforma
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Sparkles size={32} className="text-amber-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
                  Conteúdo Premium
                </h3>
                <p className="text-slate-400">
                  Curado e desenvolvido por especialistas em cada área
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Sparkles size={32} className="text-amber-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
                  Acesso Instantâneo
                </h3>
                <p className="text-slate-400">
                  Comece imediatamente após a compra
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Sparkles size={32} className="text-amber-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
                  Transformação
                </h3>
                <p className="text-slate-400">
                  Conhecimento que realmente muda vidas
                </p>
              </div>
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
              Escolha um de nossos nichos e comece sua jornada hoje mesmo
            </p>
            <button className="px-12 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-lg transition-colors">
              Explorar Todos os Nichos
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
