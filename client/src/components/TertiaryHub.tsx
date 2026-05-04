import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

interface SubNiche {
  id: string;
  title: string;
}

interface TertiaryHubProps {
  title: string;
  description: string;
  subNiches: SubNiche[];
  backLink: string;
  baseLink: string;
}

export default function TertiaryHub({ title, description, subNiches, backLink, baseLink }: TertiaryHubProps) {
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

      {/* Sub-Niches Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subNiches.map((subNiche) => (
            <Link key={subNiche.id} href={`${baseLink}/${subNiche.id}`}>
              <a className="group">
                <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-amber-600 to-amber-800">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{subNiche.title}</h3>
                    <p className="text-slate-200 text-sm">Clique para explorar</p>
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
