/**
 * Landing Page Premium - Mental & Financeiro
 * 
 * Design: Equilíbrio & Prosperidade
 * - Cores: Roxo + Dourado + Branco
 * - Fundo: Degradê equilibrado
 * - Botões: Gradient roxo com sombra
 * - Foco: Conversão direta, sem distrações
 * 
 * Status: PLACEHOLDER - Aguardando conteúdo e produtos
 */
export default function MentalLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex items-center justify-center px-4">
      <div className="container max-w-2xl text-center">
        <h1 className="headline-primary mb-6 text-foreground">
          Mental & Financeiro
        </h1>
        <p className="body-text text-muted-foreground mb-8">
          Esta seção está em desenvolvimento. Em breve, você terá acesso a conteúdos premium sobre saúde mental, inteligência emocional e educação financeira.
        </p>
        <div className="card-premium">
          <p className="text-sm text-muted-foreground">
            🚀 Volte em breve para acompanhar os lançamentos!
          </p>
        </div>
      </div>
    </div>
  );
}
