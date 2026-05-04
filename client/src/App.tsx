import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Hub Principal
import Hub from "./pages/Hub";

// Niches Hubs
import MythologyHub from "./pages/niches/MythologyHub";
import FitnessHub from "./pages/niches/FitnessHub";
import MentalFinanceHub from "./pages/niches/MentalFinanceHub";

// Mythology Products
import GreekMythology from "./pages/products/GreekMythology";
import NordicMythology from "./pages/products/NordicMythology";
import EgyptianMythology from "./pages/products/EgyptianMythology";
import AztecMythology from "./pages/products/AztecMythology";

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

      {/* MITOLOGIA - Nível 2 e 3 */}
      <Route path="/mitologia" component={MythologyHub} />
      <Route path="/mitologia/grega" component={GreekMythology} />
      <Route path="/mitologia/nordica" component={NordicMythology} />
      <Route path="/mitologia/egipcia" component={EgyptianMythology} />
      <Route path="/mitologia/asteca" component={AztecMythology} />

      {/* FITNESS - Nível 2 e 3 */}
      <Route path="/fitness" component={FitnessHub} />
      <Route path="/fitness/receitas" component={HealthyRecipes} />
      <Route path="/fitness/treino" component={TrainingPlan} />
      <Route path="/fitness/nutricao" component={Nutrition} />
      <Route path="/fitness/suplementacao" component={Supplementation} />

      {/* MENTAL/FINANCEIRO - Nível 2 e 3 */}
      <Route path="/mental-financeiro" component={MentalFinanceHub} />
      <Route path="/mental-financeiro/emocional" component={EmotionalIntelligence} />
      <Route path="/mental-financeiro/financeira" component={FinancialEducation} />
      <Route path="/mental-financeiro/meditacao" component={Meditation} />
      <Route path="/mental-financeiro/investimentos" component={Investments} />

      {/* Legacy Routes - Redirect to new structure */}
      <Route path="/mythcuriotvbrasil" component={MythologyHub} />
      <Route path="/fitnessesaude" component={FitnessHub} />
      <Route path="/mentalefinanceiro" component={MentalFinanceHub} />

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
