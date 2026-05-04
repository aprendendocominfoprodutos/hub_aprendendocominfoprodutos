import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  time: string;
  servings: string;
  profile: string;
  ingredients: string[];
  preparation: string;
  why: string;
  substitutions: string;
}

const breakfastRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Omelete leve de espinafre',
    time: '10 min',
    servings: '1 porção',
    profile: 'Proteica / Boa para baixa fome',
    ingredients: ['2 ovos', '1 xícara de espinafre picado', '1 fatia de queijo branco', 'Sal e orégano', 'Um fio de azeite'],
    preparation: 'Bata os ovos com um garfo. Adicione o espinafre, o queijo em cubos, sal e orégano. Aqueça uma frigideira antiaderente com um fio de azeite e despeje a mistura. Cozinhe em fogo baixo até firmar, vire e doure o outro lado.',
    why: 'Rica em proteínas e fácil de digerir. O espinafre adiciona fibras sem pesar no estômago.',
    substitutions: 'Troque o espinafre por tomate picado ou o queijo branco por cottage.'
  },
  {
    id: '2',
    name: 'Iogurte natural com chia',
    time: '5 min',
    servings: '1 porção',
    profile: 'Leve / Rica em fibras',
    ingredients: ['1 pote de iogurte natural desnatado', '1 colher de sopa de chia', '1 colher de sopa de aveia', '½ xícara de frutas vermelhas'],
    preparation: 'Em um bowl, misture o iogurte com a chia e a aveia. Deixe descansar por 2 minutos para a chia hidratar. Cubra com as frutas vermelhas lavadas e picadas.',
    why: 'As fibras da chia e da aveia ajudam na saciedade e no trânsito intestinal.',
    substitutions: 'Use mamão ou maçã picada no lugar das frutas vermelhas.'
  },
  {
    id: '3',
    name: 'Panqueca de banana',
    time: '10 min',
    servings: '1 porção',
    profile: 'Leve / Energia rápida',
    ingredients: ['1 banana prata amassada', '1 ovo', '2 colheres de sopa de aveia em flocos', 'Canela a gosto'],
    preparation: 'Amasse bem a banana e misture com o ovo, a aveia e a canela até formar uma massa homogênea. Despeje em uma frigideira antiaderente aquecida e doure dos dois lados.',
    why: 'Oferece energia rápida e é muito leve para o estômago.',
    substitutions: 'Pode adicionar 1 colher de whey protein para aumentar a proteína.'
  },
  {
    id: '4',
    name: 'Vitamina proteica leve',
    time: '5 min',
    servings: '1 porção',
    profile: 'Líquida / Boa para dias de enjoo',
    ingredients: ['1 banana congelada', '1 pote de iogurte natural', '100 ml de água ou leite desnatado', '1 colher de sopa de pasta de amendoim (opcional)'],
    preparation: 'Bata todos os ingredientes no liquidificador até obter uma mistura cremosa e homogênea. Beba em seguida.',
    why: 'Refeições líquidas são excelentes para dias em que a fome é quase zero.',
    substitutions: 'Troque a banana por mamão para ajudar ainda mais na digestão.'
  },
  {
    id: '5',
    name: 'Ovos mexidos cremosos',
    time: '8 min',
    servings: '1 porção',
    profile: 'Proteica / Leve',
    ingredients: ['2 ovos', '½ tomate picado sem sementes', '1 colher de sopa de creme de ricota', 'Sal, pimenta e ervas finas'],
    preparation: 'Bata os ovos levemente. Em uma frigideira, refogue o tomate rapidamente. Adicione os ovos e mexa sem parar em fogo baixo. Antes de secar totalmente, adicione o creme de ricota.',
    why: 'A textura cremosa facilita a ingestão e a digestão.',
    substitutions: 'Omitir o tomate se houver sensibilidade ou acidez estomacal.'
  },
  {
    id: '6',
    name: 'Tapioca pequena com frango',
    time: '10 min',
    servings: '1 porção',
    profile: 'Equilibrada',
    ingredients: ['2 colheres de sopa de goma de tapioca', '3 colheres de sopa de frango cozido', '1 colher de sopa de queijo cottage', 'Temperos a gosto'],
    preparation: 'Espalhe a tapioca em uma frigideira pequena aquecida. Quando unir, vire. Misture o frango desfiado com o cottage e recheie a tapioca. Dobre ao meio e sirva.',
    why: 'Uma porção menor de carboidrato com proteína magra de alta qualidade.',
    substitutions: 'Substitua o frango por atum em água.'
  }
];

const lunchRecipes: Recipe[] = [
  {
    id: '7',
    name: 'Frango grelhado com legumes',
    time: '20 min',
    servings: '1 porção',
    profile: 'Proteica / Rica em fibras',
    ingredients: ['1 filé de peito de frango (120 g)', '1 xícara de legumes picados', 'Sal, limão e ervas', '1 colher de chá de azeite'],
    preparation: 'Tempere o frango com sal, limão e ervas. Grelhe em uma frigideira com o azeite. Cozinhe os legumes no vapor até ficarem al dente. Sirva juntos.',
    why: 'Refeição clássica, magra e que exige pouca energia digestiva.',
    substitutions: 'Troque o frango por lombo suíno magro.'
  },
  {
    id: '8',
    name: 'Bowl leve de quinoa',
    time: '15 min',
    servings: '1 porção',
    profile: 'Equilibrada / Rica em fibras',
    ingredients: ['3 colheres de sopa de quinoa cozida', '2 ovos cozidos', 'Folhas verdes variadas', 'Tomate cereja', 'Fio de azeite e limão'],
    preparation: 'Cozinhe os ovos. Em um bowl, disponha as folhas verdes, os tomates cortados, a quinoa cozida e os ovos fatiados. Tempere com azeite e limão.',
    why: 'A quinoa é um carboidrato leve e rico em proteínas.',
    substitutions: 'Troque a quinoa por arroz integral.'
  },
  {
    id: '9',
    name: 'Peixe assado com purê',
    time: '30 min',
    servings: '1 porção',
    profile: 'Leve / Fácil digestão',
    ingredients: ['1 filé de peixe branco', '1 xícara de abóbora cabotiá', 'Sal, alho e limão', '1 colher de chá de azeite'],
    preparation: 'Tempere o peixe e asse por 20 minutos a 200 °C. Cozinhe a abóbora até amolecer, amasse com um garfo, adicione sal e um fio de azeite.',
    why: 'O peixe branco é a proteína de mais fácil digestão.',
    substitutions: 'Troque a abóbora por batata-doce.'
  },
  {
    id: '10',
    name: 'Carne magra em tiras',
    time: '15 min',
    servings: '1 porção',
    profile: 'Rica em ferro',
    ingredients: ['100 g de patinho ou filé mignon', '1 xícara de repolho e cenoura ralados', '1 colher de chá de azeite', 'Sal e pimenta'],
    preparation: 'Refogue a carne rapidamente na frigideira. Retire e, na mesma panela, murche levemente o repolho e a cenoura. Junte a carne e sirva.',
    why: 'Fornece ferro e proteína sem a gordura excessiva.',
    substitutions: 'Pode usar frango em tiras no lugar da carne.'
  },
  {
    id: '11',
    name: 'Arroz integral com lentilha',
    time: '20 min',
    servings: '1 porção',
    profile: 'Energia sustentada',
    ingredients: ['2 colheres de sopa de arroz integral cozido', '2 colheres de sopa de lentilha cozida', '3 colheres de sopa de frango desfiado', 'Cebolinha picada'],
    preparation: 'Misture o arroz, a lentilha e o frango desfiado já aquecidos. Finalize com cebolinha fresca por cima.',
    why: 'Combinação perfeita de aminoácidos e fibras.',
    substitutions: 'Substitua a lentilha por feijão.'
  },
  {
    id: '12',
    name: 'Salada proteica com atum',
    time: '10 min',
    servings: '1 porção',
    profile: 'Sem fogão',
    ingredients: ['½ lata de atum em água', '1 ovo cozido', '2 colheres de sopa de grão-de-bico', 'Folhas verdes', 'Limão e azeite'],
    preparation: 'Misture as folhas, o grão-de-bico, o atum escorrido e o ovo fatiado. Tempere com limão, sal e azeite.',
    why: 'Prática para dias corridos, não precisa cozinhar.',
    substitutions: 'Troque o atum por frango desfiado.'
  },
  {
    id: '13',
    name: 'Frango com batata-doce',
    time: '25 min',
    servings: '1 porção',
    profile: 'Clássica',
    ingredients: ['1 filé de frango (120 g)', '½ batata-doce média cozida', '1 xícara de brócolis cozido', 'Temperos a gosto'],
    preparation: 'Grelhe o frango temperado. Sirva com a batata-doce em rodelas e o brócolis cozido no vapor.',
    why: 'Almoço simples, seguro e que dificilmente causa desconforto.',
    substitutions: 'Troque a batata-doce por mandioca.'
  },
  {
    id: '14',
    name: 'Tilápia grelhada com legumes',
    time: '15 min',
    servings: '1 porção',
    profile: 'Muito leve',
    ingredients: ['1 filé de tilápia', '1 xícara de mix de legumes', 'Limão e sal'],
    preparation: 'Grelhe a tilápia com algumas gotas de limão. Cozinhe os legumes no vapor.',
    why: 'Ideal para os dias logo após a aplicação da medicação.',
    substitutions: 'Pode usar pescada branca.'
  }
];

const dinnerRecipes: Recipe[] = [
  {
    id: '15',
    name: 'Sopa de frango com legumes',
    time: '25 min',
    servings: '1 porção',
    profile: 'Leve / Reconfortante',
    ingredients: ['100 g de frango cozido desfiado', '1 cenoura picada', '1 abobrinha picada', '500 ml de caldo de frango caseiro', 'Sal e ervas'],
    preparation: 'Aqueça o caldo. Adicione a cenoura e a abobrinha, cozinhe até amolecer. Adicione o frango desfiado, tempere e deixe aquecer.',
    why: 'Refeição líquida e quente, perfeita para noites frias e fácil digestão.',
    substitutions: 'Pode adicionar macarrão integral em pequena quantidade.'
  },
  {
    id: '16',
    name: 'Ovo cozido com salada',
    time: '10 min',
    servings: '1 porção',
    profile: 'Muito leve',
    ingredients: ['2 ovos cozidos', 'Folhas verdes variadas', 'Tomate', 'Pepino', 'Azeite e limão'],
    preparation: 'Cozinhe os ovos. Prepare uma salada fresca com as folhas, tomate e pepino. Fatie os ovos e coloque por cima. Tempere com azeite e limão.',
    why: 'Proteína pura com salada fresca, ideal para jantares leves.',
    substitutions: 'Pode adicionar queijo branco em cubos.'
  },
  {
    id: '17',
    name: 'Peixe branco com brócolis',
    time: '20 min',
    servings: '1 porção',
    profile: 'Proteica / Fácil digestão',
    ingredients: ['1 filé de peixe branco (150 g)', '1 xícara de brócolis', 'Limão, sal e alho', '1 colher de chá de azeite'],
    preparation: 'Tempere o peixe e asse por 15 minutos a 200 °C. Cozinhe o brócolis no vapor. Sirva juntos.',
    why: 'Combinação clássica que não causa desconforto à noite.',
    substitutions: 'Pode usar sardinha fresca no lugar do peixe branco.'
  },
  {
    id: '18',
    name: 'Frango com abóbora',
    time: '25 min',
    servings: '1 porção',
    profile: 'Equilibrada',
    ingredients: ['1 filé de frango (100 g)', '1 xícara de abóbora picada', '1 colher de chá de azeite', 'Sal e ervas'],
    preparation: 'Grelhe o frango. Cozinhe a abóbora no vapor ou refogada. Sirva juntos.',
    why: 'Refeição leve e nutritiva para o jantar.',
    substitutions: 'Pode usar batata-doce no lugar da abóbora.'
  },
  {
    id: '19',
    name: 'Iogurte com granola leve',
    time: '5 min',
    servings: '1 porção',
    profile: 'Leve / Rápida',
    ingredients: ['1 pote de iogurte natural', '2 colheres de sopa de granola caseira', '½ xícara de frutas vermelhas'],
    preparation: 'Em um bowl, coloque o iogurte. Cubra com a granola e as frutas vermelhas.',
    why: 'Opção rápida e leve para noites em que a fome é mínima.',
    substitutions: 'Pode usar mel no lugar da granola.'
  },
  {
    id: '20',
    name: 'Caldo proteico',
    time: '15 min',
    servings: '1 porção',
    profile: 'Muito leve',
    ingredients: ['500 ml de caldo de frango caseiro', '100 g de frango cozido desfiado', '1 colher de sopa de aveia em flocos', 'Sal a gosto'],
    preparation: 'Aqueça o caldo. Adicione a aveia e deixe cozinhar por 2 minutos. Adicione o frango desfiado e tempere.',
    why: 'Refeição mínima e reconfortante para dias de muito baixa fome.',
    substitutions: 'Pode adicionar um ovo cozido picado.'
  }
];

interface CarouselSectionProps {
  title: string;
  recipes: Recipe[];
}

function RecipeCarousel({ title, recipes }: CarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentRecipe = recipes[currentIndex];

  return (
    <div className="mb-12 bg-card rounded-lg border border-border p-8">
      <h2 className="text-3xl font-bold mb-2 text-foreground">{title}</h2>
      <p className="text-muted-foreground mb-6">
        {currentIndex + 1} de {recipes.length} receitas
      </p>

      <div className="bg-background rounded-lg p-8 mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-4">{currentRecipe.name}</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{currentRecipe.time}</span>
          </div>
          <div className="text-muted-foreground">{currentRecipe.servings}</div>
          <div className="col-span-2 text-sm text-amber-600">{currentRecipe.profile}</div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-3">Ingredientes:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {currentRecipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-3">Modo de Preparo:</h4>
          <p className="text-muted-foreground">{currentRecipe.preparation}</p>
        </div>

        <div className="mb-6 bg-amber-50 dark:bg-amber-950 p-4 rounded border border-amber-200 dark:border-amber-800">
          <h4 className="font-semibold text-foreground mb-2">Por que funciona:</h4>
          <p className="text-muted-foreground">{currentRecipe.why}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-800">
          <h4 className="font-semibold text-foreground mb-2">Substituições possíveis:</h4>
          <p className="text-muted-foreground">{currentRecipe.substitutions}</p>
        </div>
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
          {recipes.map((_, idx) => (
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

export default function RecipesCarousel() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <a href="/fitness-saude/alimentacao" className="text-amber-600 hover:text-amber-700 mb-4 inline-flex items-center gap-2">
            ← Voltar
          </a>
          <h1 className="text-4xl font-bold text-foreground mb-4">Receitas para Quem Usa Mounjaro</h1>
          <p className="text-lg text-muted-foreground">
            30 receitas leves, práticas e saborosas. Navegue pelos carousséis para explorar cada categoria.
          </p>
        </div>

        <RecipeCarousel title="☀️ Café da Manhã" recipes={breakfastRecipes} />
        <RecipeCarousel title="🍽️ Almoço" recipes={lunchRecipes} />
        <RecipeCarousel title="🌙 Jantar" recipes={dinnerRecipes} />

        <div className="mt-12 bg-blue-50 dark:bg-blue-950 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold text-foreground mb-4">📌 Aviso Importante</h3>
          <p className="text-muted-foreground mb-4">
            Este material tem finalidade educativa e alimentar geral. Ele não substitui consulta com médico, nutricionista ou outro profissional de saúde.
          </p>
          <p className="text-muted-foreground">
            O uso de Mounjaro/tirzepatida deve ser feito somente com prescrição e acompanhamento profissional.
          </p>
        </div>
      </div>
    </div>
  );
}
