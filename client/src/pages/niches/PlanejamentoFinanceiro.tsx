import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";

export default function PlanejamentoFinanceiro() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paginasInternas = [
    { id: 1, title: "Como usar o guia", image: "/manus-storage/04_livro_aberto_paginas_internas_1ad81c2f.jpg" },
    { id: 2, title: "Quanto cobrar no começo", image: "/manus-storage/04_livro_aberto_paginas_internas_1ad81c2f.jpg" },
    { id: 3, title: "Roteiro para afiliado", image: "/manus-storage/04_livro_aberto_paginas_internas_1ad81c2f.jpg" },
    { id: 4, title: "Plano de execução de 30 dias", image: "/manus-storage/08_mockup_topo_completo_4714037f.jpg" },
    { id: 5, title: "Mensagens prontas", image: "/manus-storage/04_livro_aberto_paginas_internas_1ad81c2f.jpg" },
    { id: 6, title: "Checklist de fotos", image: "/manus-storage/04_livro_aberto_paginas_internas_1ad81c2f.jpg" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % paginasInternas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + paginasInternas.length) % paginasInternas.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27]">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 md:pt-20 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <div className="text-white">
              <div className="inline-block px-4 py-2 rounded-full border border-[#00ff88] bg-[#00ff88]/10 mb-6">
                <span className="text-[#00ff88] text-sm font-semibold">🚀 Transformação Digital</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                Transforme seu celular em uma <span className="text-[#00ff88]">ferramenta de renda extra</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Um guia prático para quem quer começar a ganhar dinheiro usando apenas o smartphone — vendendo produtos, oferecendo serviços simples, divulgando ofertas e seguindo um plano de execução de 30 dias.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-200">
                  <Check className="w-5 h-5 text-[#00ff88] mt-1 flex-shrink-0" />
                  <span>32 páginas de conteúdo prático</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200">
                  <Check className="w-5 h-5 text-[#00ff88] mt-1 flex-shrink-0" />
                  <span>Plano de ação de 30 dias</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200">
                  <Check className="w-5 h-5 text-[#00ff88] mt-1 flex-shrink-0" />
                  <span>Mensagens prontas para copiar</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200">
                  <Check className="w-5 h-5 text-[#00ff88] mt-1 flex-shrink-0" />
                  <span>Checklist de fotos que vendem</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200">
                  <Check className="w-5 h-5 text-[#00ff88] mt-1 flex-shrink-0" />
                  <span>Calendário de conteúdo</span>
                </li>
                <li className="flex items-start gap-3 text-gray-200">
                  <Check className="w-5 h-5 text-[#00ff88] mt-1 flex-shrink-0" />
                  <span>Comece com o que você já tem</span>
                </li>
              </ul>
              <button className="w-full md:w-auto px-8 py-4 bg-[#00ff88] text-black font-black text-lg rounded-lg hover:bg-[#00ff88]/90 transition-all duration-300 shadow-lg shadow-[#00ff88]/50">
                QUERO COMEÇAR AGORA
              </button>
              <p className="text-gray-400 text-sm mt-4">Acesso digital imediato após a compra.</p>
            </div>

            {/* Right: Image */}
            <div className="hidden md:flex justify-center">
              <img
                src="/manus-storage/09_mockup_kit_completo_sem_frase_8ace8b91.jpg"
                alt="Kit Completo Renda Extra"
                className="max-w-full h-auto rounded-lg shadow-2xl shadow-[#00ff88]/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOR */}
      <section className="py-16 px-4 bg-[#0f1535]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Você usa o celular todos os dias. Mas ele está te fazendo ganhar dinheiro?
          </h2>
          <p className="text-gray-300 text-center text-lg mb-12 max-w-3xl mx-auto">
            A maioria das pessoas passa horas no celular apenas consumindo conteúdo, vendo vídeos, respondendo mensagens e rolando o feed. O problema não é o celular. O problema é usar uma ferramenta poderosa sem direção.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {["Tempo perdido no feed", "Produtos parados em casa", "Falta de ideia para começar", "Medo de não saber vender", "Celular desorganizado", "Falta de plano"].map((pain, idx) => (
              <div key={idx} className="p-4 bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg text-center">
                <X className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-gray-200 font-semibold">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE SOLUÇÃO */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Um guia direto para sair da ideia e começar a executar
          </h2>
          <p className="text-gray-300 text-center text-lg mb-12 max-w-3xl mx-auto">
            O ebook Renda Extra pelo Celular foi criado para quem quer começar de forma simples, sem depender de computador, estoque ou grande estrutura.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {["Venda produtos usados", "Ofereça serviços digitais", "Comece com afiliados", "Use aplicativos certos", "Organize sua rotina", "Siga um plano de ação"].map((solution, idx) => (
              <div key={idx} className="p-4 bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg text-center hover:border-[#00ff88] transition-all">
                <Check className="w-6 h-6 text-[#00ff88] mx-auto mb-2" />
                <p className="text-gray-200 font-semibold">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE É */}
      <section className="py-16 px-4 bg-[#0f1535]/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src="/manus-storage/03_livro_capa_dura_mockup_e663814c.jpg"
              alt="Capa do Ebook"
              className="rounded-lg shadow-2xl shadow-[#00ff88]/20 max-w-sm mx-auto"
            />
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                O que é o <span className="text-[#00ff88]">Renda Extra pelo Celular?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                É um ebook prático de 32 páginas criado para quem quer começar uma renda extra usando apenas o celular. O material mostra caminhos reais e simples para vender produtos usados, oferecer serviços digitais, trabalhar com afiliados, usar aplicativos úteis e seguir um plano de execução de 30 dias.
              </p>
              <div className="space-y-3">
                {["Não precisa de computador", "Não precisa de estoque inicial", "Não promete dinheiro fácil", "Mostra ações práticas para começar", "Ideal para iniciantes"].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#00ff88]" />
                    <span className="text-gray-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            O que você vai encontrar dentro do ebook
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Mentalidade e organização", desc: "Aprenda a usar o celular como ferramenta de trabalho, não apenas como distração." },
              { title: "Venda de produtos usados", desc: "Veja como transformar itens parados em dinheiro usando fotos, anúncios e plataformas certas." },
              { title: "Serviços digitais pelo celular", desc: "Descubra serviços simples que você pode oferecer para pequenos negócios usando Canva, CapCut e WhatsApp." },
              { title: "Afiliados pelo celular", desc: "Entenda como divulgar produtos físicos ou digitais e ganhar comissão com estratégia." },
              { title: "Aplicativos essenciais", desc: "Conheça os apps que realmente ajudam e entenda a diferença entre renda baixa e renda escalável." },
              { title: "Plano de ação de 30 dias", desc: "Siga um roteiro semanal para executar, testar e ajustar suas fontes de renda extra." },
            ].map((modulo, idx) => (
              <div key={idx} className="p-6 bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg hover:border-[#00ff88] transition-all">
                <div className="w-10 h-10 rounded-full bg-[#00ff88]/20 flex items-center justify-center mb-4">
                  <span className="text-[#00ff88] font-black">{idx + 1}</span>
                </div>
                <h3 className="text-white font-black text-lg mb-2">{modulo.title}</h3>
                <p className="text-gray-300">{modulo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VEJA POR DENTRO */}
      <section className="py-16 px-4 bg-[#0f1535]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Veja por dentro do material
          </h2>
          <p className="text-gray-300 text-center text-lg mb-12 max-w-3xl mx-auto">
            O ebook foi estruturado com visual profissional, páginas objetivas, checklists, tabelas, modelos prontos e exemplos práticos para facilitar a execução.
          </p>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img
                src={paginasInternas[currentSlide].image}
                alt={paginasInternas[currentSlide].title}
                className="w-full h-96 object-cover rounded-lg shadow-2xl shadow-[#00ff88]/20"
              />
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#00ff88] text-black rounded-full hover:bg-[#00ff88]/90 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#00ff88] text-black rounded-full hover:bg-[#00ff88]/90 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {paginasInternas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide ? "bg-[#00ff88] w-8" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            {/* Labels */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-6">
              {paginasInternas.map((pagina, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`text-xs text-center py-2 px-2 rounded border transition-all ${
                    idx === currentSlide
                      ? "bg-[#00ff88] text-black border-[#00ff88] font-bold"
                      : "text-gray-300 border-gray-600 hover:border-[#00ff88]"
                  }`}
                >
                  {pagina.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Além do ebook, você recebe bônus práticos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Mensagens prontas para WhatsApp", desc: "Modelos de mensagens para vender produtos, oferecer serviços, fazer follow-up, negociar com segurança e conversar com possíveis clientes.", image: "/manus-storage/06_selos_beneficios_mockup_6666bbb2.jpg" },
              { title: "Checklist de fotos que vendem", desc: "Um guia simples para tirar fotos melhores dos seus produtos usando apenas o celular, aumentando a confiança e a chance de venda.", image: "/manus-storage/06_selos_beneficios_mockup_6666bbb2.jpg" },
              { title: "Calendário de conteúdo", desc: "Modelo de 7 dias para quem quer divulgar serviços, afiliados ou produtos com mais consistência e estratégia.", image: "/manus-storage/06_selos_beneficios_mockup_6666bbb2.jpg" },
            ].map((bonus, idx) => (
              <div key={idx} className="p-6 bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg hover:border-[#00ff88] transition-all">
                <img src={bonus.image} alt={bonus.title} className="w-full h-40 object-cover rounded mb-4" />
                <h3 className="text-white font-black text-lg mb-2">{bonus.title}</h3>
                <p className="text-gray-300">{bonus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANO 30 DIAS */}
      <section className="py-16 px-4 bg-[#0f1535]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Um plano simples para começar em 30 dias
          </h2>
          <p className="text-gray-300 text-center text-lg mb-12 max-w-3xl mx-auto">
            O guia organiza sua execução em 4 semanas, para você sair da ideia e começar a agir com direção.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { week: "Semana 1", title: "Dinheiro rápido", desc: "Separe produtos parados, tire boas fotos e publique seus primeiros anúncios." },
              { week: "Semana 2", title: "Preparação", desc: "Organize o celular, instale os aplicativos certos e escolha sua rota principal." },
              { week: "Semana 3", title: "Prospecção", desc: "Busque oportunidades, ofereça serviços e publique conteúdos estratégicos." },
              { week: "Semana 4", title: "Ajuste e escala", desc: "Analise resultados, melhore o que funcionou e defina a próxima meta." },
            ].map((week, idx) => (
              <div key={idx} className="p-4 bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg">
                <div className="text-[#00ff88] font-black text-sm mb-2">{week.week}</div>
                <h3 className="text-white font-black text-lg mb-2">{week.title}</h3>
                <p className="text-gray-300 text-sm">{week.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJEÇÕES */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Esse guia é para você se...
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-[#00ff88] font-black text-lg mb-4">✓ PARA VOCÊ</h3>
              <ul className="space-y-3">
                {[
                  "Você quer começar uma renda extra, mas não sabe por onde iniciar",
                  "Você só tem o celular para trabalhar",
                  "Você não quer depender de promessas milagrosas",
                  "Você precisa de um plano simples e direto",
                  "Você quer vender produtos, serviços ou divulgar ofertas",
                  "Você quer algo prático para aplicar no dia a dia",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200">
                    <Check className="w-5 h-5 text-[#00ff88] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-red-500 font-black text-lg mb-4">✗ NÃO É PARA VOCÊ</h3>
              <ul className="space-y-3">
                {[
                  "Você procura dinheiro fácil sem esforço",
                  "Você não pretende executar nenhuma ação",
                  "Você quer uma fórmula mágica de enriquecimento rápido",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className="py-16 px-4 bg-[#0f1535]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Comece hoje com o que você já tem na mão
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src="/manus-storage/03_livro_capa_dura_mockup_e663814c.jpg"
              alt="Capa do Ebook"
              className="rounded-lg shadow-2xl shadow-[#00ff88]/20 max-w-sm mx-auto"
            />
            <div className="p-8 bg-[#1a1f3a] border-2 border-[#00ff88] rounded-lg">
              <h3 className="text-white font-black text-2xl mb-6">Você recebe:</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Ebook Renda Extra pelo Celular",
                  "32 páginas práticas",
                  "Plano de ação de 30 dias",
                  "Mensagens prontas para WhatsApp",
                  "Checklist de fotos que vendem",
                  "Calendário simples de conteúdo",
                  "Acesso digital imediato",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-200">
                    <Check className="w-5 h-5 text-[#00ff88]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Preço:</p>
                <p className="text-[#00ff88] font-black text-4xl">R$ XX,XX</p>
              </div>
              <button className="w-full px-8 py-4 bg-[#00ff88] text-black font-black text-lg rounded-lg hover:bg-[#00ff88]/90 transition-all duration-300 shadow-lg shadow-[#00ff88]/50 mb-4">
                QUERO ACESSAR O EBOOK AGORA
              </button>
              <p className="text-gray-400 text-xs text-center">Compra segura. Produto digital. Acesso imediato.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            {[
              { q: "Preciso de computador?", a: "Não. O material foi pensado para quem quer começar usando apenas o celular." },
              { q: "O ebook promete dinheiro fácil?", a: "Não. O guia mostra caminhos práticos, mas o resultado depende da execução individual." },
              { q: "Serve para iniciantes?", a: "Sim. O conteúdo foi estruturado para quem está começando do zero." },
              { q: "Como recebo o material?", a: "Após a compra, o acesso ao arquivo digital é enviado conforme a configuração da plataforma de pagamento." },
              { q: "Posso aplicar mesmo com pouco tempo?", a: "Sim. O ebook sugere uma rotina mínima de 1 hora por dia." },
              { q: "O que vem incluso?", a: "Você recebe o ebook principal com 32 páginas, mensagens prontas, checklist de fotos, calendário de conteúdo e plano de ação de 30 dias." },
            ].map((faq, idx) => (
              <div key={idx} className="p-4 bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg">
                <h3 className="text-white font-black mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="py-16 px-4 bg-[#0f1535]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            O celular está na sua mão. A próxima ação também.
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Você não precisa esperar o cenário perfeito. Comece pequeno, escolha uma rota e execute com consistência. O primeiro resultado pode ser simples, mas ele prova que é possível começar com o que você já tem.
          </p>
          <button className="px-8 py-4 bg-[#00ff88] text-black font-black text-lg rounded-lg hover:bg-[#00ff88]/90 transition-all duration-300 shadow-lg shadow-[#00ff88]/50">
            COMEÇAR AGORA
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-[#0a0e27] border-t border-[#00ff88]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-black mb-2">Produto</h3>
              <p className="text-gray-400">Renda Extra pelo Celular</p>
            </div>
            <div>
              <h3 className="text-white font-black mb-2">Aviso Importante</h3>
              <p className="text-gray-400 text-sm">Este produto não garante resultados financeiros. Os resultados dependem da aplicação individual.</p>
            </div>
            <div>
              <h3 className="text-white font-black mb-2">Links</h3>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#00ff88] transition-all">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-[#00ff88] transition-all">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-[#00ff88] transition-all">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#00ff88]/20 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
