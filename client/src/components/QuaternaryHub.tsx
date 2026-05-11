import { Link } from 'wouter';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  link?: string;
  image?: string;
  subtitle?: string;
}

interface QuaternaryHubProps {
  title: string;
  description: string;
  products: Product[];
  backLink: string;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=600&fit=crop';

export default function QuaternaryHub({ title, description, products, backLink }: QuaternaryHubProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950/95 via-slate-900/80 to-transparent">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <Link href={backLink}>
            <a className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-4">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            {title}
          </h1>
          <p className="text-slate-400 mt-2">{description}</p>
        </div>
      </header>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 p-6 bg-amber-900/20 border border-amber-700/30 rounded-lg">
          <p className="text-amber-200 text-center">
            ⚠️ Este conteúdo está em fase de criação. Em breve estarão disponíveis todos os detalhes, benefícios e informações sobre este produto.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link key={product.id} href={product.link || '#'}>
              <a className="group block rounded-xl overflow-hidden bg-slate-800/60 border border-slate-700/40 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20 hover:-translate-y-1">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={product.image || DEFAULT_IMAGE}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.price}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm leading-tight mb-1 group-hover:text-amber-400 transition-colors" style={{ fontFamily: 'Poppins' }}>
                    {product.name}
                  </h3>
                  <p className="text-slate-400 text-xs mb-2 line-clamp-2">
                    {product.subtitle || 'Conteúdo em fase de criação'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-sm">{product.price}</span>
                    <span className="text-amber-500 group-hover:text-amber-400 transition-colors">
                      <ExternalLink size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-8 px-4 text-center text-slate-400 mt-12">
        <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
