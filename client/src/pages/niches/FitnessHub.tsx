import AutoCarousel from '@/components/AutoCarousel';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const fitnessProducts = [
  {
    id: 'recipes',
    title: 'Receitas Saudáveis',
    subtitle: '30 Receitas Deliciosas',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    price: 'R$ 29,90',
    link: '/fitness/receitas',
  },
  {
    id: 'training',
    title: 'Plano de Treino',
    subtitle: '12 Semanas de Transformação',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    price: 'R$ 39,90',
    link: '/fitness/treino',
  },
  {
    id: 'nutrition',
    title: 'Nutrição Completa',
    subtitle: 'Guia Essencial de Nutrição',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    price: 'R$ 34,90',
    link: '/fitness/nutricao',
  },
  {
    id: 'supplements',
    title: 'Suplementação',
    subtitle: 'Guia Completo de Suplementos',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=600&fit=crop',
    price: 'R$ 24,90',
    link: '/fitness/suplementacao',
  },
];

export default function FitnessHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950/95 via-slate-900/80 to-transparent">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-4">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            Fitness & Saúde
          </h1>
          <p className="text-slate-400 mt-2">Transforme seu corpo e sua saúde</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <AutoCarousel items={fitnessProducts} autoRotateInterval={5000} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-8 px-4 text-center text-slate-400 mt-12">
        <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');
      `}</style>
    </div>
  );
}
