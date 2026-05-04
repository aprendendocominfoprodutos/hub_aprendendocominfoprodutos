import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Hub Principal
import Hub from "./pages/Hub";

// Niches Hubs - Secondary Level
import MythologySecondary from "./pages/niches/MythologySecondary";
import FitnessHealthSecondary from "./pages/niches/FitnessHealthSecondary";
import MentalFinanceSecondary from "./pages/niches/MentalFinanceSecondary";

// Fitness & Health - Tertiary Level
import FitnessTertiary from "./pages/niches/FitnessTertiary";
import HealthTertiary from "./pages/niches/HealthTertiary";
import FoodTertiary from "./pages/niches/FoodTertiary";

// Mental & Finance - Tertiary Level
import MentalTertiary from "./pages/niches/MentalTertiary";
import FinanceTertiary from "./pages/niches/FinanceTertiary";

// Mythology - Tertiary Level
import MythologyGreekTertiary from "./pages/niches/MythologyGreekTertiary";

// Mythology - Quaternary Level (Greek)
import MythologyGreekGods from "./pages/niches/MythologyGreekGods";
import MythologyGreekHeroes from "./pages/niches/MythologyGreekHeroes";
import MythologyGreekBattles from "./pages/niches/MythologyGreekBattles";
import MythologyGreekGeneral from "./pages/niches/MythologyGreekGeneral";

// Mythology Products
import GreekMythology from "./pages/products/GreekMythology";
import NordicMythology from "./pages/products/NordicMythology";
import EgyptianMythology from "./pages/products/EgyptianMythology";
import AztecMythology from "./pages/products/AztecMythology";

// Recipes Hub
import RecipesHub from "./pages/niches/RecipesHub";
import RecipesCarousel from "./pages/niches/RecipesCarousel";

// Fitness Products
import HealthyRecipes from "./pages/products/HealthyRecipes";
import TrainingPlan from "./pages/products/TrainingPlan";
import Nutrition from "./pages/products/Nutrition";
import Supplementation from "./pages/products/Supplementation";

// Mental/Finance Products
import EmotionalIntelligence from "./pages/products/EmotionalIntelligence";
import FinancialEducation from "./pages/products/FinancialEducation";
import Meditation from "./pages/products/Meditation";
import Investments from "./pages/products/Investments";

/**
 * Router Hub de Hubs - 3 Níveis
 * 
 * NÍVEL 1: Hub Principal
 * / → Hub/Marketplace Premium (vitrine dos 3 nichos)
 * 
 * NÍVEL 2: Hub de Nicho
 * /mitologia → Hub de Mitologia (4 produtos)
 * /fitness → Hub de Fitness (4 produtos)
 * /mental-financeiro → Hub de Mental/Financeiro (4 produtos)
 * 
 * NÍVEL 3: Landing Pages de Produtos
 * /mitologia/grega → Landing page de Mitologia Grega
 * /mitologia/nordica → Landing page de Mitologia Nórdica
 * /mitologia/egipcia → Landing page de Mitologia Egípcia
 * /mitologia/asteca → Landing page de Mitologia Asteca
 * 
 * /fitness/receitas → Landing page de Receitas
 * /fitness/treino → Landing page de Treino
 * /fitness/nutricao → Landing page de Nutrição
 * /fitness/suplementacao → Landing page de Suplementação
 * 
 * /mental-financeiro/emocional → Landing page de Inteligência Emocional
 * /mental-financeiro/financeira → Landing page de Educação Financeira
 * /mental-financeiro/meditacao → Landing page de Meditação
 * /mental-financeiro/investimentos → Landing page de Investimentos
 */
function Router() {
  return (
    <Switch>
      {/* Hub Principal */}
      <Route path="/" component={Hub} />

      {/* MITOLOGIA - 4 Níveis */}
      {/* Nível 2: Hub Secundário */}
      <Route path="/mitologia" component={MythologySecondary} />
      
      {/* Nível 3: Hub Terciário */}
      <Route path="/mitologia/grega" component={MythologyGreekTertiary} />
      
      {/* Nível 4: Quaternário com AutoCarousel */}
      <Route path="/mitologia/grega/deuses" component={MythologyGreekGods} />
      <Route path="/mitologia/grega/herois" component={MythologyGreekHeroes} />
      <Route path="/mitologia/grega/batalhas" component={MythologyGreekBattles} />
      <Route path="/mitologia/grega/geral" component={MythologyGreekGeneral} />

      {/* FITNESS & HEALTH - 4 Níveis */}
      {/* Nível 2: Hub Secundário */}
      <Route path="/fitness-saude" component={FitnessHealthSecondary} />
         {/* Fitness & Health - Tertiary Level */}
      <Route path="/fitness-saude/fitness" component={FitnessTertiary} />
      <Route path="/fitness-saude/saude" component={HealthTertiary} />
      <Route path="/fitness-saude/alimentacao" component={FoodTertiary} />
      <Route path="/fitness-saude/alimentacao/receitas" component={RecipesHub} />
      <Route path="/fitness-saude/alimentacao/receitas/mounjaro" component={RecipesCarousel} />
      
      {/* MENTAL & FINANCE - 4 Níveis */}
      {/* Nível 2: Hub Secundário */}
      <Route path="/mental-financeiro" component={MentalFinanceSecondary} />
      
      {/* Nível 3: Hub Terciário */}
      <Route path="/mental-financeiro/mental" component={MentalTertiary} />
      <Route path="/mental-financeiro/financeiro" component={FinanceTertiary} />

      {/* Legacy Routes - Redirect to new structure */}
      <Route path="/mythcuriotvbrasil" component={MythologySecondary} />
      <Route path="/fitnessesaude" component={FitnessHealthSecondary} />
      <Route path="/mentalefinanceiro" component={MentalFinanceSecondary} />
      
      {/* Redirect routes without hyphens */}
      <Route path="/fitness" component={FitnessHealthSecondary} />
      <Route path="/saude" component={HealthTertiary} />
      <Route path="/mental" component={MentalTertiary} />
      <Route path="/financeiro" component={FinanceTertiary} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Tema: Dark Premium (Multi-Nicho) + Hub/Marketplace
 * - Background: Preto profundo (#050506)
 * - Foreground: Branco marfim (#f8f5ec)
 * - Primary: Dourado envelhecido (#c9a24a)
 * - Tema escuro é a identidade visual padrão
 * 
 * Estrutura de Hubs:
 * / → Hub/Marketplace Premium (vitrine dos 3 nichos)
 * /mitologia → Hub de Mitologia
 * /fitness → Hub de Fitness
 * /mental-financeiro → Hub de Mental/Financeiro
 * 
 * Cada Hub tem 4 produtos com suas respectivas landing pages
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
