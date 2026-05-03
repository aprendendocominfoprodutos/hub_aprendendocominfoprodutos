import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Hub from "./pages/Hub";
import MythologyLanding from "./pages/MythologyLanding";
import FitnessLanding from "./pages/FitnessLanding";
import MentalLanding from "./pages/MentalLanding";


/**
 * Router Multi-Nicho
 * 
 * Estrutura de rotas:
 * /mythcuriotvbrasil → Landing page de Mitologia
 * /mythcuriotvbrasil/* → Subrotas de Mitologia (produtos específicos)
 * 
 * /fitnessesaude → Landing page de Fitness/Saúde
 * /fitnessesaude/* → Subrotas de Fitness (produtos específicos)
 * 
 * /mentalefinanceiro → Landing page de Mental/Financeiro
 * /mentalefinanceiro/* → Subrotas de Mental (produtos específicos)
 */
function Router() {
  return (
    <Switch>
      {/* Fitness/Saúde - Rotas (Light Theme) */}
      <Route path="/fitnessesaude" component={FitnessLanding} />
      <Route path="/fitnessesaude/*" component={FitnessLanding} />
      
      {/* Mental/Financeiro - Rotas (Dark Theme) */}
      <Route path="/mentalefinanceiro" component={MentalLanding} />
      <Route path="/mentalefinanceiro/*" component={MentalLanding} />
      
      {/* Mitologia - Rotas (Dark Theme) - Deve vir por último para não sobrescrever outras rotas */}
      <Route path="/mythcuriotvbrasil" component={MythologyLanding} />
      <Route path="/mythcuriotvbrasil/*" component={MythologyLanding} />
      
      {/* Página inicial - Hub/Marketplace Premium */}
      <Route path="/" component={Hub} />
      
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
 * Rotas:
 * / → Hub/Marketplace Premium (vitrine dos 3 produtos)
 * /mythcuriotvbrasil → Landing page de Mitologia
 * /fitnessesaude → Landing page de Fitness
 * /mentalefinanceiro → Landing page de Mental/Financeiro
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
