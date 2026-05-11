import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import AutoCarousel from '@/components/AutoCarousel';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  link: string;
}

// Carousel 1: Receitas para Quem Toma Tirzepatida (Mounjaro)
const mounjaro: CarouselItem[] = [
  {
    id: '1',
    title: 'Receitas para Quem Toma Tirzepatida',
    subtitle: 'Mounjaro - 30 Receitas Leves',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop',
    price: 'R$ 47,00',
    link: '/fitness-saude/alimentacao/receitas/mounjaro',
  },
  {
    id: '2',
    title: 'Guia Completo de Alimentação',
    subtitle: 'Com Mounjaro - Nutrição Otimizada',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
    price: 'R$ 37,00',
    link: '#',
  },
  {
    id: '3',
    title: 'Cardápios Semanais',
    subtitle: 'Planejamento Alimentar com Mounjaro',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
    price: 'R$ 27,00',
    link: '#',
  },
  {
    id: '4',
    title: 'Dicas de Armazenamento',
    subtitle: 'Conserve suas Refeições Preparadas',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&h=600&fit=crop',
    price: 'R$ 17,00',
    link: '#',
  }
];

// Carousel 2: Receitas Cetogênicas
const keto: CarouselItem[] = [
  {
    id: '1',
    title: 'Receitas Cetogênicas',
    subtitle: 'Dieta Keto - Em Breve',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '2',
    title: 'Café da Manhã Keto',
    subtitle: 'Receitas Baixas em Carboidratos',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '3',
    title: 'Almoços e Jantares',
    subtitle: 'Pratos Principais Keto',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '4',
    title: 'Sobremesas Keto',
    subtitle: 'Doces sem Culpa',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
];

// Carousel 3: Receitas Veganas
const vegana: CarouselItem[] = [
  {
    id: '1',
    title: 'Receitas Veganas',
    subtitle: 'Alimentação 100% Vegetais - Em Breve',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '2',
    title: 'Proteínas Vegetais',
    subtitle: 'Alternativas Nutritivas',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '3',
    title: 'Refeições Completas',
    subtitle: 'Pratos Balanceados e Saudáveis',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '4',
    title: 'Sobremesas Veganas',
    subtitle: 'Delícias Sem Produtos de Origem Animal',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
];

// Carousel 4: Receitas Low Carb
const lowCarb: CarouselItem[] = [
  {
    id: '1',
    title: 'Receitas Low Carb',
    subtitle: 'Baixo Carboidrato - Em Breve',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '2',
    title: 'Café da Manhã Low Carb',
    subtitle: 'Opções Nutritivas e Leves',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '3',
    title: 'Almoços Low Carb',
    subtitle: 'Refeições Principais Equilibradas',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
  {
    id: '4',
    title: 'Lanches Low Carb',
    subtitle: 'Opções Práticas Entre Refeições',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=600&fit=crop',
    price: 'Em Breve',
    link: '#',
  },
];

export default function RecipesHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950/95 via-slate-900/80 to-transparent">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/fitness-saude/alimentacao">
            <a className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-4">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            Receitas por Tipo
          </h1>
          <p className="text-slate-400 mt-2">Explore diferentes tipos de receitas e dietas</p>
        </div>
      </header>

      {/* Carousels */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Carousel 1: Mounjaro */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
            💊 Receitas para Quem Toma Tirzepatida (Mounjaro)
          </h2>
          <AutoCarousel items={mounjaro} autoRotateInterval={5000} />
        </section>

        {/* Carousel 2: Keto */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
            🥑 Receitas Cetogênicas
          </h2>
          <AutoCarousel items={keto} autoRotateInterval={5000} />
        </section>

        {/* Carousel 3: Vegana */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
            🌱 Receitas Veganas
          </h2>
          <AutoCarousel items={vegana} autoRotateInterval={5000} />
        </section>

        {/* Carousel 4: Low Carb */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
            ⚡ Receitas Low Carb
          </h2>
          <AutoCarousel items={lowCarb} autoRotateInterval={5000} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-8 px-4 text-center text-slate-400 mt-12">
        <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
