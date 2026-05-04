import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'emotional',
    title: 'Inteligência Emocional',
    subtitle: 'Masterclass Completa',
    description: 'Domine suas emoções e relacionamentos',
    price: 'R$ 59,90',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop',
    link: '/mental-financeiro/emocional',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'financial',
    title: 'Educação Financeira',
    subtitle: 'Do Zero ao Milhão',
    description: 'Aprenda a construir riqueza de verdade',
    price: 'R$ 69,90',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    link: '/mental-financeiro/financeira',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'meditation',
    title: 'Meditação & Mindfulness',
    subtitle: '30 Dias de Transformação',
    description: 'Encontre paz e clareza mental',
    price: 'R$ 29,90',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop',
    link: '/mental-financeiro/meditacao',
    color: 'from-indigo-600 to-indigo-800',
  },
  {
    id: 'investments',
    title: 'Investimentos Inteligentes',
    subtitle: 'Guia Prático',
    description: 'Comece a investir com confiança',
    price: 'R$ 54,90',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec33a8d008?w=500&h=300&fit=crop',
    link: '/mental-financeiro/investimentos',
    color: 'from-emerald-600 to-emerald-800',
  },
];

export default function MentalFinanceHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <a className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 mb-4">
              ← Voltar ao Hub Principal
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Mental & <span className="text-blue-400">Financeiro</span>
          </h1>
          <p className="text-slate-300">Equilibre sua mente e suas finanças</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-4">
              Transforme Sua Mente e Suas Finanças
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Desenvolva inteligência emocional, aprenda a investir e encontre paz mental. Tudo em um só lugar.
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
                    <p className="text-blue-100 text-sm mb-3">{product.subtitle}</p>
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
                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-sm text-slate-400">{product.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-bold">{product.price}</p>
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
              { icon: '🧠', title: 'Saúde Mental', desc: 'Técnicas comprovadas de bem-estar' },
              { icon: '💰', title: 'Riqueza Financeira', desc: 'Estratégias reais de investimento' },
              { icon: '🎯', title: 'Clareza Mental', desc: 'Foco e propósito em sua vida' },
              { icon: '📈', title: 'Crescimento', desc: 'Evolução pessoal e financeira' },
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
