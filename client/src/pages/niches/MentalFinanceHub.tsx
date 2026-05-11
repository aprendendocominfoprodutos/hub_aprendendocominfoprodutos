import AutoCarousel from '@/components/AutoCarousel';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const mentalFinanceProducts = [
  {
    id: 'emotional',
    title: 'Inteligência Emocional',
    subtitle: 'Masterclass Completa',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    price: 'R$ 59,90',
    link: '/mental-financeiro/emocional',
  },
  {
    id: 'financial',
    title: 'Educação Financeira',
    subtitle: 'Do Zero ao Milhão',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    price: 'R$ 69,90',
    link: '/mental-financeiro/financeira',
  },
  {
    id: 'meditation',
    title: 'Meditação & Mindfulness',
    subtitle: '30 Dias de Transformação',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    price: 'R$ 29,90',
    link: '/mental-financeiro/meditacao',
  },
  {
    id: 'investments',
    title: 'Investimentos Inteligentes',
    subtitle: 'Guia Prático',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec33a8d008?w=800&h=600&fit=crop',
    price: 'R$ 54,90',
    link: '/mental-financeiro/investimentos',
  },
];

export default function MentalFinanceHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950/95 via-slate-900/80 to-transparent">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-4">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            Mental & Financeiro
          </h1>
          <p className="text-slate-400 mt-2">Equilibre sua mente e suas finanças</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <AutoCarousel items={mentalFinanceProducts} autoRotateInterval={5000} />
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
