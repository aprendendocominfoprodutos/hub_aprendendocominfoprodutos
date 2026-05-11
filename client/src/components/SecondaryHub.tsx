import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface SecondaryHubProps {
  title: string;
  description: string;
  categories: Category[];
  backLink: string;
  baseLink: string;
}

export default function SecondaryHub({ title, description, categories, backLink, baseLink }: SecondaryHubProps) {
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

      {/* Categories Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`${baseLink}/${category.id}`}>
              <a className="group">
                <div className="relative h-80 rounded-xl overflow-hidden cursor-pointer">
                  {/* Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-3xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-slate-200 text-sm">{category.description}</p>
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
