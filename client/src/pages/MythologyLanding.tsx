import { useState, useEffect } from 'react';

/**
 * Landing Page Premium - Mitologia Grega
 * 
 * Design: Classicismo Cinematográfico Premium
 * - Cores: Azul-marinho + Dourado envelhecido + Branco marfim
 * - Fundo: Degradê radial + linear cinematográfico
 * - Botões: Gradient dourado com sombra
 * - Foco: Conversão direta, sem distrações
 * 
 * Estrutura: 9 seções
 * 1. Hero - Headline + Mockup + CTA
 * 2. Promessa - Frase impactante
 * 3. Kit - Mockup empilhado + valor
 * 4. Demonstração - Páginas internas + mapa + guia
 * 5. Conteúdo - Cards de tópicos
 * 6. Planos - 4 opções de compra
 * 7. Benefícios - 5 pontos principais
 * 8. Segurança - Compra segura + acesso automático
 * 9. CTA Final - Urgência + botão final
 */
export default function MythologyLanding() {
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
      
      {/* ============ 1. HERO SECTION ============ */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Texto Hero */}
            <div className="order-2 md:order-1">
              <h1 className="headline-primary mb-4 text-foreground">
                Entenda a Mitologia Grega Sem Complicação
              </h1>
              <p className="subtitle text-accent mb-6">
                Com Deuses, Heróis, Criaturas e Significados Ocultos em Um Só Kit Visual
              </p>
              <p className="body-text text-muted-foreground mb-8">
                Material visual, direto e envolvente
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
                  src="/manus-storage/ChatGPT_Image_27_de_abr._de_2026__17_44_23-removebg-preview_aa9c78c7.png"
                  alt="Ebook Mitologia Grega"
                  className="relative w-full h-auto rounded-lg shadow-2xl"
                  style={{ boxShadow: '0 0 40px rgba(201,162,74,0.3)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. PROMESSA ============ */}
      <section className="py-16 md:py-24 bg-card/50 border-t border-border">
        <div className="container max-w-4xl text-center">
          <h2 className="headline-primary mb-8 text-accent">
            Os deuses mudaram. Os padrões humanos não.
          </h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A mitologia grega revela verdades atemporais sobre poder, desejo, destino e comportamento humano. 
            Compreender esses padrões ancestrais é compreender a si mesmo e o mundo que o cerca.
          </p>
        </div>
      </section>

      {/* ============ 3. KIT ============ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Mockup Kit */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-2xl"></div>
                <img
                  src="/manus-storage/ChatGPT_Image_1_de_mai._de_2026__03_13_22-removebg-preview_03336fc2.png"
                  alt="Kit Empilhado"
                  className="relative w-full h-auto rounded-lg shadow-2xl"
                  style={{ boxShadow: '0 0 40px rgba(201,162,74,0.3)' }}
                />
              </div>
            </div>

            {/* Texto Kit */}
            <div>
              <h2 className="headline-primary mb-6 text-foreground">
                Olha o que você vai receber
              </h2>
              <p className="body-text text-muted-foreground mb-8">
                Um kit completo e visual que transforma conhecimento ancestral em compreensão prática. 
                Cada elemento foi cuidadosamente desenhado para revelar os segredos da mitologia grega 
                de forma clara, organizada e envolvente.
              </p>
              <ul className="space-y-3">
                {['E-book completo em PDF', 'Mapa visual dos deuses', 'Guia rápido de referência', 'Cards de símbolos e significados'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. DEMONSTRAÇÃO ============ */}
      <section className="py-16 md:py-24 bg-card/50 border-t border-border">
        <div className="container">
          <h2 className="headline-primary text-center mb-12 text-foreground">
            Veja o Conteúdo Por Dentro
          </h2>

          {/* Grid de Exemplos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Página Interna 1 */}
            <div className="card-premium">
              <img
                src="/manus-storage/ChatGPTImage1demai.de2026,03_13_38_8b7c5979.png"
                alt="Página Interna - A Origem do Mundo"
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                A Origem do Mundo
              </h3>
              <p className="text-sm text-muted-foreground">
                Compreenda como tudo começou na mitologia grega, desde o Caos até os Titãs.
              </p>
            </div>

            {/* Página Interna 2 */}
            <div className="card-premium">
              <img
                src="/manus-storage/MITOLOGIAGREGA-Deuses,HeróiseSignificadosOcultos(1)_dda1af0f.png"
                alt="Página Interna - Poder e Controle"
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                Poder e Controle
              </h3>
              <p className="text-sm text-muted-foreground">
                Os deuses que governam o mundo e moldam o destino: Zeus, Poseidon e Hades.
              </p>
            </div>
          </div>

          {/* Espaços para Mapa e Guia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-premium bg-muted/30 border-dashed flex items-center justify-center min-h-64">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Mapa Visual dos Deuses Gregos</p>
                <p className="text-xs text-muted-foreground mt-2">(Espaço reservado para sua imagem)</p>
              </div>
            </div>

            <div className="card-premium bg-muted/30 border-dashed flex items-center justify-center min-h-64">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Guia Rápido de Referência</p>
                <p className="text-xs text-muted-foreground mt-2">(Espaço reservado para sua imagem)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. CONTEÚDO ============ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <h2 className="headline-primary text-center mb-12 text-foreground">
            Tópicos Principais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {['Deuses', 'Heróis', 'Criaturas', 'Mitos', 'Símbolos'].map((topic, i) => (
              <div key={i} className="card-premium text-center">
                <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>
                  {topic}
                </h3>
                <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. PLANOS ============ */}
      <section className="py-16 md:py-24 bg-card/50 border-t border-border">
        <div className="container">
          <h2 className="headline-primary text-center mb-12 text-foreground">
            Escolha Seu Plano
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Básico */}
            <div className="card-premium">
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                BÁSICO
              </h3>
              <div className="text-3xl font-bold text-primary mb-1">R$ 19,90</div>
              <p className="text-xs text-muted-foreground mb-6">E-book</p>
              <button className="btn-cta w-full">COMPRAR AGORA</button>
            </div>

            {/* Essencial */}
            <div className="card-premium">
              <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">
                MAIS POPULAR
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                ESSENCIAL
              </h3>
              <div className="text-3xl font-bold text-primary mb-1">R$ 29,90</div>
              <p className="text-xs text-muted-foreground mb-6">E-book + Mapa</p>
              <button className="btn-cta w-full">COMPRAR AGORA</button>
            </div>

            {/* Premium - Destaque */}
            <div className="card-premium border-2 border-primary lg:scale-110 lg:z-10">
              <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">
                MELHOR CUSTO-BENEFÍCIO
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                PREMIUM
              </h3>
              <div className="text-3xl font-bold text-primary mb-1">R$ 39,90</div>
              <p className="text-xs text-muted-foreground mb-6">E-book + Mapa + Guia + Cards</p>
              <button className="btn-cta w-full">COMPRAR AGORA</button>
            </div>

            {/* Lendário */}
            <div className="card-premium">
              <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">
                MAIS COMPLETO
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                OLIMPO
              </h3>
              <div className="text-3xl font-bold text-primary mb-1">R$ 49,90</div>
              <p className="text-xs text-muted-foreground mb-2">Tudo + Bônus</p>
              <p className="text-xs text-accent mb-6">De R$ 149,90 por R$ 49,90</p>
              <button className="btn-cta w-full">COMPRAR AGORA</button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            💝 Leve mapa e guia gratuitamente nos planos Essencial e Premium
          </p>
        </div>
      </section>

      {/* ============ 6.5 DEPOIMENTOS ============ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <h2 className="headline-primary text-center mb-12 text-foreground">
            O Que Nossos Leitores Dizem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Depoimento 1 */}
            <div className="card-premium text-center">
              <img
                src="/manus-storage/testimonial_1_2b4eed09.png"
                alt="Marina Silva"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              />
              <h3 className="font-bold text-foreground mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                Marina Silva
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Professora de História</p>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                "Finalmente entendi os padrões por trás dos mitos. Transformou minha forma de ensinar!"
              </p>
            </div>

            {/* Depoimento 2 */}
            <div className="card-premium text-center">
              <img
                src="/manus-storage/testimonial_2_86d72c9c.png"
                alt="Carlos Mendes"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              />
              <h3 className="font-bold text-foreground mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                Carlos Mendes
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Psicólogo</p>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                "Os arquétipos mitológicos explicam tanto sobre comportamento humano. Indispensável!"
              </p>
            </div>

            {/* Depoimento 3 */}
            <div className="card-premium text-center">
              <img
                src="/manus-storage/testimonial_3_9564556d.png"
                alt="Juliana Costa"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              />
              <h3 className="font-bold text-foreground mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                Juliana Costa
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Escritora</p>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                "Referência perfeita para pesquisa. O visual torna tudo muito mais acessível."
              </p>
            </div>

            {/* Depoimento 4 */}
            <div className="card-premium text-center">
              <img
                src="/manus-storage/testimonial_4_aff0f950.png"
                alt="Roberto Alves"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              />
              <h3 className="font-bold text-foreground mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                Roberto Alves
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Empresário</p>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                "Aplicável ao mundo dos negócios. Poder, estratégia e destino nunca fizeram tanto sentido."
              </p>
            </div>

            {/* Depoimento 5 */}
            <div className="card-premium text-center">
              <img
                src="/manus-storage/testimonial_5_6f8beeb9.png"
                alt="Fernanda Rocha"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              />
              <h3 className="font-bold text-foreground mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                Fernanda Rocha
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Coach de Vida</p>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                "Ferramenta poderosa para autoconhecimento. Meus clientes amaram!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. BENEFÍCIOS ============ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <h2 className="headline-primary text-center mb-12 text-foreground">
            Por Que Escolher Nosso Kit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { icon: '✨', title: 'Simples', desc: 'Sem jargão, sem complicação' },
              { icon: '🎨', title: 'Visual', desc: 'Imagens e diagramas claros' },
              { icon: '⚡', title: 'Direto', desc: 'Informação sem fluff' },
              { icon: '📋', title: 'Organizado', desc: 'Estrutura lógica e fácil' },
              { icon: '⚙️', title: 'Imediato', desc: 'Acesso instantâneo após compra' },
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  {benefit.title}
                </h3>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. SEGURANÇA ============ */}
      <section className="py-16 md:py-24 bg-card/50 border-t border-border">
        <div className="container max-w-2xl text-center">
          <h2 className="headline-primary mb-8 text-foreground">
            Compra Segura & Acesso Automático
          </h2>
          <p className="body-text text-muted-foreground mb-8">
            Sua compra é 100% segura. Após o pagamento, você recebe acesso instantâneo ao seu kit completo 
            via email. Sem esperas, sem complicações.
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span>🔒 Pagamento Seguro</span>
            <span>⚡ Acesso Instantâneo</span>
            <span>📧 Entrega por Email</span>
          </div>
        </div>
      </section>

      {/* ============ 9. CTA FINAL ============ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container max-w-3xl text-center">
          <h2 className="headline-primary mb-8 text-accent">
            Mitos Antigos Ainda Explicam o Mundo Atual
          </h2>

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

          {/* CTA Final */}
          <button className="btn-cta text-lg px-10 py-5 mb-8">
            QUERO MEU E-BOOK AGORA
          </button>

          {/* Garantia */}
          <div className="bg-card border border-border rounded-lg p-6 inline-block">
            <p className="text-sm text-foreground mb-2">
              <span className="text-primary font-bold">✓ Garantia de 7 Dias</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Se não ficar satisfeito, devolva 100% do seu dinheiro. Sem perguntas, sem complicações.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-card border-t border-border py-12 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                Mitologia Grega
              </h4>
              <p className="text-sm text-muted-foreground">
                Desvende os segredos ancestrais que transformam sua vida.
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
            <p>© 2026 Mitologia Grega. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
