import { useState, useEffect } from 'react';

/**
 * Landing Page Premium - Fitness & Saúde
 * 
 * Design: Wellness Moderno
 * - Cores: Verde vibrante + Azul claro + Branco
 * - Fundo: Degradê wellness
 * - Botões: Gradient verde com sombra
 * - Foco: Conversão direta, sem distrações
 * 
 * Estrutura: Landing page do Ebook de Receitas com Tirzepatida
 */
export default function FitnessLanding() {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
          if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* ============ HERO SECTION ============ */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Texto Hero */}
            <div className="order-2 md:order-1">
              <h1 className="headline-primary mb-4 text-foreground">
                30 Receitas Leves Para Quem Usa Mounjaro
              </h1>
              <p className="subtitle text-accent mb-6">
                Cardápios Simples, Refeições Práticas e Cuidados Alimentares Durante o Uso da Tirzepatida
              </p>
              <p className="body-text text-muted-foreground mb-8">
                Guia completo com 30 receitas, cardápio de 7 dias, lista de compras e dicas para manter a nutrição em dia.
              </p>
              <button className="btn-cta mb-4">
                QUERO ACESSAR AGORA
              </button>
              <p className="text-sm text-muted-foreground">
                ✓ Acesso imediato após pagamento
              </p>
            </div>

            {/* Mockup Ebook */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-2xl"></div>
                <img
                  src="/manus-storage/ebook_receitas_mockup_bdeeb5c9.png"
                  alt="Ebook Receitas com Tirzepatida"
                  className="relative w-full h-auto rounded-lg shadow-2xl"
                  style={{ boxShadow: '0 0 40px rgba(201,162,74,0.3)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROMESSA ============ */}
      <section className="py-16 md:py-24 bg-card/50 border-t border-border">
        <div className="container max-w-4xl text-center">
          <h2 className="headline-primary mb-8 text-accent">
            Coma bem. Mantenha a nutrição. Sinta-se melhor.
          </h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Quando você usa Mounjaro/tirzepatida, a alimentação muda. Este guia oferece 30 receitas práticas, 
            leves e nutritivas para facilitar seu dia a dia, mantendo a qualidade de vida e o bem-estar.
          </p>
        </div>
      </section>

      {/* ============ O QUE VOCÊ RECEBE ============ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container max-w-6xl">
          <h2 className="headline-primary text-center mb-12 text-foreground">
            O Que Você Vai Receber
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🍽️', title: '30 Receitas Leves', desc: 'Café da manhã, almoço, jantar e lanches' },
              { icon: '📋', title: 'Cardápio de 7 Dias', desc: 'Planejamento pronto para usar' },
              { icon: '🛒', title: 'Lista de Compras', desc: 'Organizada por categoria' },
              { icon: '🔄', title: 'Tabela de Substituições', desc: 'Flexibilidade nas receitas' },
              { icon: '🍴', title: 'Guia de Montagem Rápida', desc: 'Refeições em minutos' },
              { icon: '🏪', title: 'Dicas para Restaurantes', desc: 'Como comer fora com segurança' },
            ].map((item, i) => (
              <div key={i} className="card-premium text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTEÚDO DETALHADO ============ */}
      <section className="py-16 md:py-24 bg-card/50 border-t border-border">
        <div className="container max-w-4xl">
          <h2 className="headline-primary text-center mb-12 text-foreground">
            Conteúdo Completo
          </h2>

          <div className="space-y-6">
            {[
              { title: 'Seção 1: Guia Rápido de Alimentação', items: ['Os 4 pilares do prato', 'Como montar refeições leves', 'Alimentos que funcionam bem', 'Alimentos que podem pesar'] },
              { title: 'Seção 2: 30 Receitas Práticas', items: ['6 receitas de café da manhã', '8 receitas de almoço', '6 receitas de jantar leve', '4 receitas de lanches', '4 receitas para dias de baixa fome'] },
              { title: 'Seção 3: Ferramentas & Dicas', items: ['Cardápio de 7 dias completo', 'Lista de compras organizada', 'Tabela de substituições inteligentes', 'Checklist diário e semanal', 'Erros comuns e como evitar'] },
            ].map((section, i) => (
              <div key={i} className="card-premium">
                <h3 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-foreground">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PREÇO & CTA ============ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container max-w-3xl text-center">
          <h2 className="headline-primary mb-8 text-foreground">
            Invista em Sua Saúde
          </h2>

          <div className="card-premium border-2 border-primary mb-8">
            <div className="text-5xl font-bold text-primary mb-2">R$ 29,90</div>
            <p className="text-muted-foreground mb-6">Acesso completo ao ebook + todos os recursos</p>
            <button className="btn-cta w-full text-lg px-10 py-5 mb-6">
              COMPRAR AGORA
            </button>
            <p className="text-xs text-muted-foreground">
              Garantia de 7 dias - Devolução 100% sem perguntas
            </p>
          </div>

          {/* Countdown */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4">Oferta especial expira em:</p>
            <div className="flex justify-center gap-4 mb-8">
              {[
                { value: timeLeft.hours, label: 'Horas' },
                { value: timeLeft.minutes, label: 'Minutos' },
                { value: timeLeft.seconds, label: 'Segundos' },
              ].map((item, i) => (
                <div key={i} className="bg-card border-2 border-primary rounded-lg p-4 min-w-20">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios Finais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm text-muted-foreground">Acesso imediato em PDF</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">♾️</div>
              <p className="text-sm text-muted-foreground">Acesso vitalício</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm text-muted-foreground">Compra segura e protegida</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-card border-t border-border py-12 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                Receitas com Tirzepatida
              </h4>
              <p className="text-sm text-muted-foreground">
                Guia prático para manter a nutrição em dia durante o uso de Mounjaro.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Receitas com Tirzepatida. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
