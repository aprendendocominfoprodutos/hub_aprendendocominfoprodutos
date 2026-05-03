import { useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';

/**
 * Página Hub - Porta de Entrada
 * 
 * Design: Limpo e minimalista
 * Função: Mostrar thumbnails dos 3 nichos
 * Cada thumbnail leva para o subdomínio correspondente
 */

export default function Hub() {
  const [, setLocation] = useLocation();

  const niches = [
    {
      id: 'mythology',
      title: 'Mitologia Grega',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_thumbnail_mitologia-Q7ARDN36sX5wAtFynv5C7u.webp',
      path: '/mythcuriotvbrasil'
    },
    {
      id: 'fitness',
      title: 'Fitness & Receitas',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_thumbnail_fitness-RSQMuwKbQqsYaSSfsUbaJv.webp',
      path: '/fitnessesaude'
    },
    {
      id: 'mental',
      title: 'Mental & Financeiro',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/hub_thumbnail_mental-TfuEbDtAX4oAdJLSv8y6Fq.webp',
      path: '/mentalefinanceiro'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">
            Aprendendo com Info<span className="text-amber-500">Produtos</span>
          </h1>
          <p className="text-slate-400 mt-1">Conhecimento. Crescimento. Transformação.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha Seu Caminho de Aprendizado
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore nossos produtos premium em diferentes áreas do conhecimento
          </p>
        </div>

        {/* Niches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {niches.map((niche) => (
            <div
              key={niche.id}
              className="group cursor-pointer"
              onClick={() => setLocation(niche.path)}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl h-96 bg-slate-800">
                {/* Image */}
                <img
                  src={niche.image}
                  alt={niche.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {niche.title}
                  </h3>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(niche.path);
                    }}
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                  >
                    Explorar
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center text-slate-400 py-8 border-t border-slate-700/50">
          <p>Cada nicho possui conteúdo premium, curado e desenvolvido por especialistas</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; 2026 Aprendendo com InfoProdutos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
