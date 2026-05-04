import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'recipes',
    title: '30 Receitas Saudáveis',
    subtitle: 'E-book Completo',
    description: 'Receitas práticas e deliciosas para sua saúde',
    price: 'R$ 29,90',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
    link: '/fitness/receitas',
    color: 'from-green-600 to-green-800',
  },
  {
    id: 'training',
    title: 'Plano de Treino 90 Dias',
    subtitle: 'Transformação Garantida',
    description: 'Programa completo para resultados visíveis',
    price: 'R$ 49,90',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop',
    link: '/fitness/treino',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'nutrition',
    title: 'Guia de Nutrição Completo',
    subtitle: 'Ciência da Alimentação',
    description: 'Entenda como alimentar seu corpo corretamente',
    price: 'R$ 39,90',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=300&fit=crop',
    link: '/fitness/nutricao',
    color: 'from-orange-600 to-orange-800',
  },
  {
    id: 'supplements',
    title: 'Suplementação Inteligente',
    subtitle: 'Otimize Seus Resultados',
    description: 'Guia prático sobre suplementos e como usar',
    price: 'R$ 34,90',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=300&fit=crop',
    link: '/fitness/suplementacao',
    color: 'from-red-600 to-red-800',
  },
];

export default function FitnessHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-green-50 to-slate-50">
      {/* Header */}
      <div className="border-b border-green-200 bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <a className="text-sm text-green-600 hover:text-green-700 transition-colors flex items-center gap-2 mb-4">
              ← Voltar ao Hub Principal
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Fitness & <span className="text-green-600">Receitas Saudáveis</span>
          </h1>
          <p className="text-slate-600">Transforme seu corpo e sua saúde</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Sua Jornada Para a Saúde Começa Aqui
            </h2>
            <p className="text-xl text-slate-700 mb-8">
              Escolha entre receitas, treinos, nutrição e suplementação. Tudo que você precisa para transformar seu corpo.
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
                <div className="relative h-80 rounded-xl overflow-hidden mb-4 cursor-pointer shadow-lg hover:shadow-2xl transition-shadow">
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-50 group-hover:opacity-60 transition-opacity`}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-3xl font-bold text-white mb-1">{product.title}</h3>
                    <p className="text-green-100 text-sm mb-3">{product.subtitle}</p>
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
                    <h4 className="text-lg font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-sm text-slate-600">{product.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold">{product.price}</p>
                    <p className="text-xs text-slate-500">Acesso instantâneo</p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-green-50 py-16 border-t border-green-200">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            O Que Você Recebe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '💪', title: 'Treinos Eficazes', desc: 'Programas cientificamente comprovados' },
              { icon: '🥗', title: 'Receitas Deliciosas', desc: 'Saudável nunca foi tão gostoso' },
              { icon: '📊', title: 'Acompanhamento', desc: 'Ferramentas para monitorar progresso' },
              { icon: '🎯', title: 'Resultados Reais', desc: 'Transformação visível em 90 dias' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
