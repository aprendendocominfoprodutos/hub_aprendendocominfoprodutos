import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";

export default function PlanejamentoFinanceiro() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Venda de Produtos",
      description: "Revenda produtos físicos ou digitais com banco investimento e alto potencial de lucro.",
      icon: "🛒",
    },
    {
      title: "Prestação de Serviços",
      description: "Ofereça serviços como edição de vídeos, design, social media e muito mais.",
      icon: "📸",
    },
    {
      title: "Conteúdo que Vende",
      description: "Crie conteúdo nas redes sociais e monetize com parcerias, afiliados ou seus próprios produtos.",
      icon: "🎬",
    },
    {
      title: "Marketing de Afiliados",
      description: "Divulgue produtos de outras pessoas e ganhe comissões por cada venda realizada.",
      icon: "📈",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const faqs = [
    {
      question: "Preciso ter experiência para começar?",
      answer: "Não! O e-book foi criado para iniciantes. Você aprenderá desde o básico até estratégias avançadas.",
    },
    {
      question: "Quanto tempo leva para começar a ganhar?",
      answer: "Alguns alunos começam a ganhar na primeira semana. Tudo depende do seu esforço e dedicação.",
    },
    {
      question: "Posso fazer isso em qualquer celular?",
      answer: "Sim! Funciona em qualquer smartphone, Android ou iOS. Você só precisa do seu celular.",
    },
    {
      question: "Há garantia de dinheiro de volta?",
      answer: "Sim! Se não ficar satisfeito em 30 dias, devolvemos 100% do seu dinheiro. Sem perguntas.",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/manus-storage/1000444394_9145fe9b.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/80" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 rounded-full border border-lime-500/30 bg-lime-500/10">
            <span className="text-lime-400 text-sm font-semibold">🚀 Plataforma Premium de Aprendizado</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Renda Extra</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-300">
              Pelo Celular
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Aprenda formas reais de gerar dinheiro usando apenas o seu smartphone, mesmo começando do zero.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-950 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all transform hover:scale-105">
              QUERO COMEÇAR AGORA
            </button>
            <button className="px-8 py-4 border-2 border-lime-500 text-lime-400 font-bold text-lg rounded-lg hover:bg-lime-500/10 transition-all">
              SAIBA MAIS
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO DOR */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Você está cansado de...
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Trabalhar 8 horas por dia e ganhar pouco",
              "Não ter tempo para sua família",
              "Viver de salário em salário",
              "Não ter controle sobre sua renda",
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 flex items-start gap-4"
              >
                <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO SOLUÇÃO */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            A Solução Existe
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Gerar renda extra em poucas horas por semana",
              "Trabalhar de qualquer lugar, a qualquer hora",
              "Ter controle total sobre sua renda",
              "Começar do zero, sem experiência",
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-lime-500/10 to-lime-600/5 border border-lime-500/20 flex items-start gap-4"
              >
                <Check className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO O QUE É */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                O que é <span className="text-lime-400">Renda Extra Pelo Celular?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Um e-book completo e prático que ensina formas reais e comprovadas de gerar dinheiro usando apenas o seu smartphone.
              </p>
              <ul className="space-y-4">
                {[
                  "Passo a passo simples",
                  "Estratégias práticas",
                  "Exemplos reais",
                  "Bônus exclusivos",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg">
                    <span className="w-2 h-2 bg-lime-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center relative z-10">
              <img
                src="/manus-storage/smartphone_transparent_bg_787d2701.png"
                alt="Renda Extra pelo Celular"
                className="w-full max-w-sm rounded-xl shadow-2xl shadow-lime-500/20 relative z-20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO MÓDULOS */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            O que você vai aprender
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "Fundamentos", desc: "Entenda os princípios básicos de renda digital" },
              { num: "02", title: "Formas Reais", desc: "Descubra 6 formas comprovadas de ganhar dinheiro" },
              { num: "03", title: "Plano Prático", desc: "Siga um plano de 30 dias para começar hoje" },
              { num: "04", title: "Estratégias", desc: "Aprenda estratégias avançadas para escalar" },
              { num: "05", title: "Ferramentas", desc: "Conheça as melhores ferramentas do mercado" },
              { num: "06", title: "Suporte", desc: "Acesso a comunidade exclusiva de alunos" },
            ].map((mod, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-lime-500/10 to-slate-800 border border-lime-500/20 hover:border-lime-400/50 transition-all"
              >
                <div className="text-4xl font-black text-lime-400 mb-2">{mod.num}</div>
                <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                <p className="text-gray-400">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO VEJA POR DENTRO */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Veja por dentro
          </h2>

          <div className="relative z-10">
            <div className="flex justify-center relative z-20">
              <img
                src="/manus-storage/1000444393_3b99a8de.png"
                alt="Conteúdo do E-book"
                className="w-full max-w-2xl rounded-xl shadow-2xl shadow-lime-500/20 relative z-30"
              />
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-lime-500/20 border border-lime-500/50 hover:bg-lime-500/30 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-lime-400" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-lime-500/20 border border-lime-500/50 hover:bg-lime-500/30 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-lime-400" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? "bg-lime-400 w-8" : "bg-lime-500/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO BÔNUS */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Bônus Exclusivos
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Mensagens Prontas", desc: "Templates de mensagens para vender mais" },
              { title: "Checklist de Fotos", desc: "Guia completo para tirar fotos profissionais" },
              { title: "Calendário de Conteúdo", desc: "30 dias de ideias de conteúdo prontas" },
            ].map((bonus, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-slate-800 border border-amber-500/20"
              >
                <div className="text-3xl mb-3">🎁</div>
                <h3 className="text-xl font-bold mb-2 text-amber-300">{bonus.title}</h3>
                <p className="text-gray-400">{bonus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO PLANO 30 DIAS */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Plano Prático de 30 Dias
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { phase: "DIAS 1-7", title: "PREPARAÇÃO", items: ["Defina seu objetivo", "Escolha uma fonte de renda", "Organize seu espaço"] },
                { phase: "DIAS 8-15", title: "AÇÃO", items: ["Crie seu primeiro produto", "Divulgue nas redes", "Conecte-se com clientes"] },
                { phase: "DIAS 16-23", title: "OTIMIZAÇÃO", items: ["Melhore sua oferta", "Automatize processos", "Expanda sua divulgação"] },
                { phase: "DIAS 24-30", title: "ESCALA", items: ["Analise resultados", "Invista no que funciona", "Planeje os próximos 30 dias"] },
              ].map((plan, i) => (
                <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-lime-500/10 to-slate-800 border border-lime-500/20">
                  <div className="text-sm font-bold text-lime-400 mb-2">{plan.phase}</div>
                  <h3 className="text-xl font-bold mb-3">{plan.title}</h3>
                  <ul className="space-y-2">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <img
                src="/manus-storage/1000444391_315247e5.png"
                alt="Plano 30 Dias"
                className="w-full max-w-sm rounded-xl shadow-2xl shadow-lime-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO OBJEÇÕES */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Este e-book é para você?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-lime-400">✅ Para quem é:</h3>
              <ul className="space-y-4">
                {[
                  "Quer gerar renda extra",
                  "Está começando do zero",
                  "Tem pouco tempo disponível",
                  "Quer trabalhar de qualquer lugar",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-lime-400" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-400">❌ Não é para:</h3>
              <ul className="space-y-4">
                {[
                  "Procura ficar rico rápido",
                  "Não quer fazer nenhum esforço",
                  "Busca esquemas ilegais",
                  "Espera resultados instantâneos",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-400" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO OFERTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Oferta <span className="text-lime-400">Especial</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Acesso completo ao e-book + todos os bônus exclusivos + comunidade de alunos
              </p>

              <div className="mb-8">
                <div className="text-5xl font-black mb-2">
                  <span className="text-lime-400">R$ 97</span>
                </div>
                <p className="text-gray-400">Pagamento único, acesso vitalício</p>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-950 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all transform hover:scale-105 mb-4">
                QUERO ACESSAR O E-BOOK AGORA
              </button>

              <p className="text-center text-gray-400 text-sm">
                Garantia de 30 dias de dinheiro de volta
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/manus-storage/1000444390_475b2269.png"
                alt="Oferta Especial"
                className="w-full max-w-sm rounded-xl shadow-2xl shadow-lime-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO CTA INTERMEDIÁRIO */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/manus-storage/1000444389_1e631ca3.png"
              alt="CTA Intermediário"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent flex items-center justify-start p-8">
              <div className="max-w-md">
                <h3 className="text-3xl md:text-4xl font-black mb-4">
                  Não deixe para depois
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Cada dia que passa é uma oportunidade perdida de começar a ganhar dinheiro
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-950 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all transform hover:scale-105">
                  COMEÇAR AGORA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FAQ */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-lime-500/20 bg-gradient-to-br from-lime-500/5 to-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-lime-500/10 transition-all"
                >
                  <h3 className="text-lg font-bold text-left">{faq.question}</h3>
                  <ChevronRight
                    className={`w-5 h-5 text-lime-400 transition-transform ${
                      expandedFaq === i ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6 text-gray-300 border-t border-lime-500/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO FECHAMENTO FINAL */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/manus-storage/1000444394_9145fe9b.png"
              alt="Fechamento"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/70 flex items-center justify-start p-8">
              <div className="max-w-md">
                <h3 className="text-4xl md:text-5xl font-black mb-6">
                  Transforme seu celular em uma <span className="text-lime-400">fonte de renda</span>
                </h3>
                <p className="text-lg text-gray-300 mb-8">
                  Comece hoje mesmo e mude seus resultados
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-950 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all transform hover:scale-105 w-full">
                  QUERO COMEÇAR AGORA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-slate-950 border-t border-lime-500/10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="mb-4">
            © 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.
          </p>
          <p className="text-sm">
            Este e-book é apenas para fins educacionais. Resultados podem variar de pessoa para pessoa.
          </p>
        </div>
      </footer>

      {/* FLOATING CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-slate-950 to-transparent p-4 pointer-events-none">
        <button className="w-full py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-950 font-bold rounded-lg pointer-events-auto hover:shadow-lg hover:shadow-lime-500/50 transition-all">
          QUERO ACESSAR AGORA
        </button>
      </div>
    </div>
  );
}
