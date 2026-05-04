import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'greek',
    title: 'Mitologia Grega',
    subtitle: 'Kit Completo',
    description: 'Deuses, heróis e lendas da Grécia Antiga',
    price: 'R$ 49,90',
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=300&fit=crop',
    link: '/mitologia/grega',
    color: 'from-amber-600 to-amber-800',
  },
  {
    id: 'nordic',
    title: 'Mitologia Nórdica',
    subtitle: 'Guia Essencial',
    description: 'Deuses nórdicos, Valhala e o Ragnarok',
    price: 'R$ 39,90',
    image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=300&fit=crop',
    link: '/mitologia/nordica',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'egyptian',
    title: 'Mitologia Egípcia',
    subtitle: 'Deuses e Mistérios',
    description: 'Deuses egípcios, faraós e o além-vida',
    price: 'R$ 44,90',
    image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&h=300&fit=crop',
    link: '/mitologia/egipcia',
    color: 'from-yellow-600 to-yellow-800',
  },
  {
    id: 'aztec',
    title: 'Mitologia Asteca',
    subtitle: 'Cosmologia',
    description: 'Deuses astecas, sacrifícios e calendário',
    price: 'R$ 34,90',
    image: 'https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=500&h=300&fit=crop',
    link: '/mitologia/asteca',
    color: 'from-red-600 to-red-800',
  },
];

export default function MythologyHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <a className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2 mb-4">
              ← Voltar ao Hub Principal
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Mitologia <span className="text-amber-400">Grega, Nórdica, Egípcia & Asteca</span>
          </h1>
          <p className="text-slate-300">Explore os mistérios das antigas civilizações</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-4">
              Escolha Sua Jornada Mitológica
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Cada nicho oferece uma experiência única e completa sobre as mitologias mais fascinantes do mundo.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={product.link}>
              <a className="group">
                <div className="relative h-80 rounded-xl overflow-hidden mb-4 cursor-pointer">
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-3xl font-bold text-white mb-1">{product.title}</h3>
                    <p className="text-amber-200 text-sm mb-3">{product.subtitle}</p>
                    <p className="text-slate-100 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">{product.price}</span>
                      <div className="bg-white/20 backdrop-blur p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-sm text-slate-400">{product.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-bold">{product.price}</p>
                    <p className="text-xs text-slate-400">Acesso instantâneo</p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-800/50 py-16 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            O Que Você Recebe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '📚', title: 'Conteúdo Completo', desc: 'Material detalhado e bem estruturado' },
              { icon: '🎓', title: 'Aprendizado Profundo', desc: 'Análise completa de cada mitologia' },
              { icon: '⚡', title: 'Acesso Instantâneo', desc: 'Comece imediatamente após compra' },
              { icon: '🔒', title: 'Acesso Vitalício', desc: 'Seu para sempre, sem expirações' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
