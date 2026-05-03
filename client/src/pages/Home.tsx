import BenefitsSection from '@/components/BenefitsSection';
import ContentShowcase from '@/components/ContentShowcase';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProductPresentation from '@/components/ProductPresentation';
import PricingPlans from '@/components/PricingPlans';

/**
 * Landing Page Premium - Mitologia Grega
 * 
 * Design: Classicismo Cinematográfico Premium
 * - Cores: Preto profundo (#0a0a0a) + Dourado (#d4af37) + Branco marfim (#f5f5f5)
 * - Tipografia: Cinzel (títulos) + Montserrat (corpo)
 * - Foco: Conversão, sem menu superior, responsivo mobile-first
 * 
 * Estrutura:
 * 1. Hero Section - Impacto visual cinematográfico
 * 2. Product Presentation - Mockup + Benefícios
 * 3. Content Showcase - O que você vai aprender (6 tópicos)
 * 4. Pricing Plans - 4 planos com destaque premium
 * 5. Benefits Section - Benefícios transformacionais
 * 6. Final CTA - Urgência + Countdown + Garantia
 * 7. Footer - Links e legal
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* Product Presentation */}
      <ProductPresentation />

      {/* Content Showcase */}
      <ContentShowcase />

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
