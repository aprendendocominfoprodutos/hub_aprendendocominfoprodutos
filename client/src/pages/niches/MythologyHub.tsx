import AutoCarousel from '@/components/AutoCarousel';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const mythologyProducts = [
  {
    id: 'greek',
    title: 'Mitologia Grega',
    subtitle: 'Deuses e Heróis da Grécia Antiga',
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=600&fit=crop',
    price: 'R$ 49,90',
    link: '/mitologia/grega',
  },
  {
    id: 'nordic',
    title: 'Mitologia Nórdica',
    subtitle: 'Valhala e Ragnarok',
    image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=800&h=600&fit=crop',
    price: 'R$ 39,90',
    link: '/mitologia/nordica',
  },
  {
    id: 'egyptian',
    title: 'Mitologia Egípcia',
    subtitle: 'Deuses do Nilo',
    image: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=800&h=600&fit=crop',
    price: 'R$ 44,90',
    link: '/mitologia/egipcia',
  },
  {
    id: 'aztec',
    title: 'Mitologia Asteca',
    subtitle: 'Cosmologia Asteca',
    image: 'https://images.unsplash.com/photo-1578926314433-c6e7ad7eb744?w=800&h=600&fit=crop',
    price: 'R$ 34,90',
    link: '/mitologia/asteca',
  },
];

export default function MythologyHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950/95 via-slate-900/80 to-transparent">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-4">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            Mitologia
          </h1>
          <p className="text-slate-400 mt-2">Explore os mistérios das civilizações antigas</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <AutoCarousel items={mythologyProducts} autoRotateInterval={5000} />
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
