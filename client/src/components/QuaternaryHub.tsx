import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import AutoCarousel from './AutoCarousel';

interface Product {
  id: number;
  name: string;
  price: string;
}

interface QuaternaryHubProps {
  title: string;
  description: string;
  products: Product[];
  backLink: string;
}

export default function QuaternaryHub({ title, description, products, backLink }: QuaternaryHubProps) {
  const carouselItems = products.map((product) => ({
    id: product.id.toString(),
    title: product.name,
    subtitle: 'Conteúdo em fase de criação',
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=600&fit=crop',
    price: product.price,
    link: '#',
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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

      {/* Carousel */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 p-6 bg-amber-900/20 border border-amber-700/30 rounded-lg">
          <p className="text-amber-200 text-center">
            ⚠️ Este conteúdo está em fase de criação. Em breve estarão disponíveis todos os detalhes, benefícios e informações sobre este produto.
          </p>
        </div>
        <AutoCarousel items={carouselItems} autoRotateInterval={5000} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-8 px-4 text-center text-slate-400 mt-12">
        <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
