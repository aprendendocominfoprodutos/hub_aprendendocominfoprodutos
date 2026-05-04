import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

interface RecipeCategory {
  id: string;
  name: string;
  description: string;
}

interface RecipeItem {
  id: string;
  title: string;
  link?: string;
}

const mounjaro: RecipeItem[] = [
  { id: '1', title: 'Café da Manhã', link: '/fitness-saude/alimentacao/receitas/mounjaro' },
  { id: '2', title: 'Almoço', link: '/fitness-saude/alimentacao/receitas/mounjaro' },
  { id: '3', title: 'Jantar', link: '/fitness-saude/alimentacao/receitas/mounjaro' },
  { id: '4', title: 'Lanches', link: '/fitness-saude/alimentacao/receitas/mounjaro' },
];

const keto: RecipeItem[] = [
  { id: '1', title: 'Café da Manhã' },
  { id: '2', title: 'Almoço' },
  { id: '3', title: 'Jantar' },
  { id: '4', title: 'Lanches' },
];

const vegana: RecipeItem[] = [
  { id: '1', title: 'Café da Manhã' },
  { id: '2', title: 'Almoço' },
  { id: '3', title: 'Jantar' },
  { id: '4', title: 'Lanches' },
];

const lowCarb: RecipeItem[] = [
  { id: '1', title: 'Café da Manhã' },
  { id: '2', title: 'Almoço' },
  { id: '3', title: 'Jantar' },
  { id: '4', title: 'Lanches' },
];

const recipeCategories: RecipeCategory[] = [
  { id: 'mounjaro', name: '💊 Mounjaro', description: 'Receitas leves para quem usa Mounjaro' },
  { id: 'keto', name: '🥑 Cetogênica', description: 'Receitas baixas em carboidratos' },
  { id: 'vegana', name: '🌱 Vegana', description: 'Receitas 100% vegetais' },
  { id: 'lowcarb', name: '⚡ Low Carb', description: 'Receitas com baixo teor de carboidratos' },
];

interface CarouselProps {
  category: RecipeCategory;
  items: RecipeItem[];
}

function RecipeCarousel({ category, items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleItems = items.slice(currentIndex, currentIndex + 1);

  return (
    <div className="mb-12 bg-card rounded-lg border border-border p-8">
      <h2 className="text-3xl font-bold mb-2 text-foreground">{category.name}</h2>
      <p className="text-muted-foreground mb-6">{category.description}</p>

      <div className="bg-background rounded-lg p-8 mb-6 min-h-64 flex items-center justify-center">
        {visibleItems.map((item) => (
          <div key={item.id} className="text-center w-full">
            {item.link ? (
              <Link href={item.link}>
                <a className="inline-block">
                  <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg p-12 cursor-pointer hover:shadow-lg transition">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </a>
              </Link>
            ) : (
              <div className="bg-slate-700 rounded-lg p-12 opacity-60">
                <h3 className="text-2xl font-bold text-slate-400">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-2">Em fase de criação</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevious}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>

        <div className="flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentIndex ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
        >
          Próxima
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function RecipesHub() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Link href="/fitness-saude/alimentacao">
            <a className="text-amber-600 hover:text-amber-700 mb-4 inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">Receitas por Tipo</h1>
          <p className="text-lg text-muted-foreground">
            Explore diferentes tipos de receitas. Navegue pelos carousséis para ver cada categoria.
          </p>
        </div>

        <RecipeCarousel category={recipeCategories[0]} items={mounjaro} />
        <RecipeCarousel category={recipeCategories[1]} items={keto} />
        <RecipeCarousel category={recipeCategories[2]} items={vegana} />
        <RecipeCarousel category={recipeCategories[3]} items={lowCarb} />
      </div>
    </div>
  );
}
