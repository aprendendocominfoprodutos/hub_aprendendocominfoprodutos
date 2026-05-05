import { useState, useEffect } from 'react';
import { ChevronDown, Check, Smartphone, Zap, Target, Users, TrendingUp, Clock } from 'lucide-react';

export default function PlanejamentoFinanceiro() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems = [
    {
      question: 'Preciso de computador?',
      answer: 'Não. O material foi pensado para quem quer começar usando apenas o celular.'
    },
    {
      question: 'O ebook promete dinheiro fácil?',
      answer: 'Não. O guia mostra caminhos práticos, mas o resultado depende da execução.'
    },
    {
      question: 'Serve para iniciantes?',
      answer: 'Sim. O conteúdo foi estruturado para quem está começando do zero.'
    },
    {
      question: 'Como recebo o material?',
      answer: 'Após a compra, o acesso ao arquivo digital é enviado conforme a configuração da plataforma de pagamento.'
    },
    {
      question: 'Posso aplicar mesmo com pouco tempo?',
      answer: 'Sim. O ebook sugere uma rotina mínima de 1 hora por dia.'
    }
  ];

  const modules = [
    {
      title: 'Mentalidade e organização',
      description: 'Aprenda a usar o celular como ferramenta de trabalho, não apenas como distração.'
    },
    {
      title: 'Venda de produtos usados',
      description: 'Veja como transformar itens parados em dinheiro usando fotos, anúncios e plataformas certas.'
    },
    {
      title: 'Serviços digitais pelo celular',
      description: 'Descubra serviços simples que você pode oferecer para pequenos negócios usando Canva, CapCut e WhatsApp.'
    },
    {
      title: 'Afiliados pelo celular',
      description: 'Entenda como divulgar produtos físicos ou digitais e ganhar comissão com estratégia.'
    },
    {
      title: 'Aplicativos essenciais',
      description: 'Conheça os apps que realmente ajudam e entenda a diferença entre renda baixa e renda escalável.'
    },
    {
      title: 'Plano de ação de 30 dias',
      description: 'Siga um roteiro semanal para executar, testar e ajustar suas fontes de renda extra.'
    }
  ];

  const painPoints = [
    'Tempo perdido no feed',
    'Produtos parados em casa',
    'Falta de ideia para começar',
    'Medo de não saber vender',
    'Celular desorganizado',
    'Falta de plano'
  ];

  const solutions = [
    'Venda produtos usados',
    'Ofereça serviços digitais',
    'Comece com afiliados',
    'Use aplicativos certos',
    'Organize sua rotina',
    'Siga um plano de ação'
  ];

  const bonuses = [
    {
      title: 'Mensagens prontas para WhatsApp',
      description: 'Modelos de mensagens para vender produtos, oferecer serviços, fazer follow-up e conversar com possíveis clientes.'
    },
    {
      title: 'Checklist de fotos que vendem',
      description: 'Um guia rápido para tirar fotos melhores dos seus produtos usando apenas o celular.'
    },
    {
      title: 'Calendário de conteúdo',
      description: 'Modelo de 7 dias para quem quer divulgar serviços, afiliados ou produtos com consistência.'
    }
  ];

  const weeks = [
    {
      week: 'Semana 1',
      title: 'Dinheiro rápido',
      description: 'Separe produtos parados, tire boas fotos e publique seus primeiros anúncios.'
    },
    {
      week: 'Semana 2',
      title: 'Preparação',
      description: 'Organize o celular, instale os aplicativos certos e escolha sua rota principal.'
    },
    {
      week: 'Semana 3',
      title: 'Prospecção',
      description: 'Busque oportunidades, ofereça serviços e publique conteúdos estratégicos.'
    },
    {
      week: 'Semana 4',
      title: 'Ajuste e escala',
      description: 'Analise resultados, melhore o que funcionou e defina a próxima meta.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Transforme seu celular em uma ferramenta de <span className="text-[#00ff88]">renda extra</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Um guia prático para quem quer começar a ganhar dinheiro usando apenas o smartphone — vendendo produtos, oferecendo serviços simples, divulgando ofertas e seguindo um plano de execução de 30 dias.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  '32 páginas de conteúdo prático',
                  'Plano de ação de 30 dias',
                  'Mensagens prontas para copiar',
                  'Checklist de fotos que vendem',
                  'Calendário de conteúdo',
                  'Comece com o que você já tem'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-200">
                    <Check className="w-5 h-5 text-[#00ff88]" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="w-full sm:w-auto bg-[#00ff88] hover:bg-[#00dd66] text-black font-black py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg mb-3">
                QUERO COMEÇAR AGORA
              </button>
              <p className="text-sm text-gray-400 text-center sm:text-left">
                Acesso digital imediato após a compra.
              </p>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="bg-gradient-to-br from-[#00ff88] to-[#00dd66] p-1 rounded-2xl">
                <div className="bg-[#0a0e27] rounded-xl p-8 flex items-center justify-center min-h-[400px]">
                  <Smartphone className="w-32 h-32 text-[#00ff88]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1535]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 text-center">
            Você usa o celular todos os dias. Mas ele está te fazendo ganhar dinheiro?
          </h2>
          <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            A maioria das pessoas passa horas no celular apenas consumindo conteúdo, vendo vídeos, respondendo mensagens e rolando o feed. O problema não é o celular. O problema é usar uma ferramenta poderosa sem direção.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((point, idx) => (
              <div key={idx} className="bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg p-6 hover:border-[#00ff88] transition-all duration-300">
                <p className="text-white font-semibold">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 text-center">
            Um guia direto para sair da ideia e começar a <span className="text-[#00ff88]">executar</span>
          </h2>
          <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            O ebook Renda Extra pelo Celular foi criado para quem quer começar de forma simples, sem depender de computador, estoque ou grande estrutura.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((solution, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#00ff88]/10 to-[#00ff88]/5 border border-[#00ff88] rounded-lg p-6 hover:from-[#00ff88]/20 transition-all duration-300">
                <Zap className="w-8 h-8 text-[#00ff88] mb-3" />
                <p className="text-white font-semibold">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1535]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-12 text-center">
            O que você vai encontrar dentro do ebook
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, idx) => (
              <div key={idx} className="bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg p-8 hover:border-[#00ff88] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#00ff88]/20 border border-[#00ff88]">
                      <span className="text-[#00ff88] font-black text-lg">{idx + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">{module.title}</h3>
                    <p className="text-gray-400">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 text-center">
            Além do ebook, você recebe <span className="text-[#00ff88]">bônus práticos</span>
          </h2>
          <p className="text-lg text-gray-300 text-center mb-12">
            Ferramentas prontas para usar no seu dia a dia
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonuses.map((bonus, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1535] border border-[#00ff88]/50 rounded-lg p-8 hover:border-[#00ff88] transition-all duration-300">
                <div className="w-12 h-12 bg-[#00ff88]/20 border border-[#00ff88] rounded-lg flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-[#00ff88]" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{bonus.title}</h3>
                <p className="text-gray-400">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 30 Days Plan */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1535]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-12 text-center">
            Um plano simples para começar em <span className="text-[#00ff88]">30 dias</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weeks.map((week, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1535] border border-[#00ff88]/30 rounded-lg p-6 hover:border-[#00ff88] transition-all duration-300">
                <div className="text-sm font-black text-[#00ff88] mb-2">{week.week}</div>
                <h3 className="text-lg font-black text-white mb-3">{week.title}</h3>
                <p className="text-gray-400 text-sm">{week.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For/Not For Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-black text-white mb-6">Esse guia é para você se...</h3>
              <ul className="space-y-3">
                {[
                  'Você quer começar uma renda extra, mas não sabe por onde iniciar',
                  'Você só tem o celular para trabalhar',
                  'Você não quer depender de promessas milagrosas',
                  'Você precisa de um plano simples e direto',
                  'Você quer vender produtos, serviços ou divulgar ofertas',
                  'Você quer algo prático para aplicar no dia a dia'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-[#00ff88] flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white mb-6">Esse guia <span className="text-[#ff4444]">não</span> é para você se...</h3>
              <ul className="space-y-3">
                {[
                  'Você procura dinheiro fácil sem esforço',
                  'Você não pretende executar nenhuma ação',
                  'Você quer uma fórmula mágica de enriquecimento rápido'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400">
                    <div className="w-5 h-5 rounded-full border border-[#ff4444] flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00ff88]/10 to-[#00ff88]/5">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a1f3a] border-2 border-[#00ff88] rounded-lg p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 text-center">
              Comece hoje com o que você já tem na mão
            </h2>

            <div className="bg-[#0f1535] rounded-lg p-6 mb-8">
              <h3 className="text-lg font-black text-[#00ff88] mb-4">Você recebe:</h3>
              <ul className="space-y-2">
                {[
                  'Ebook Renda Extra pelo Celular',
                  '32 páginas práticas',
                  'Plano de ação de 30 dias',
                  'Mensagens prontas',
                  'Checklist de fotos',
                  'Calendário de conteúdo',
                  'Acesso digital imediato'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white">
                    <Check className="w-4 h-4 text-[#00ff88]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mb-8">
              <div className="text-4xl font-black text-[#00ff88] mb-2">R$ XX,XX</div>
              <p className="text-gray-400">Preço a definir</p>
            </div>

            <button className="w-full bg-[#00ff88] hover:bg-[#00dd66] text-black font-black py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg mb-4">
              QUERO ACESSAR O EBOOK AGORA
            </button>
            <p className="text-sm text-gray-400 text-center">
              Compra segura. Produto digital. Acesso imediato.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-12 text-center">
            Perguntas frequentes
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-[#1a1f3a] border border-[#00ff88]/30 rounded-lg overflow-hidden hover:border-[#00ff88] transition-all duration-300">
                <button
                  onClick={() => setActiveTab(activeTab === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 hover:bg-[#0f1535] transition-colors"
                >
                  <span className="text-lg font-black text-white text-left">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00ff88] transition-transform ${
                      activeTab === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeTab === idx && (
                  <div className="px-6 pb-6 text-gray-400 border-t border-[#00ff88]/20">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1535]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            O celular está na sua mão. A próxima ação também.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Você não precisa esperar o cenário perfeito. Comece pequeno, escolha uma rota e execute com consistência. O primeiro resultado pode ser simples, mas ele prova que é possível começar com o que você já tem.
          </p>
          <button className="bg-[#00ff88] hover:bg-[#00dd66] text-black font-black py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg">
            COMEÇAR AGORA
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-[#00ff88]/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          <p className="mb-2">Renda Extra pelo Celular</p>
          <p className="mb-4">
            Este produto não garante resultados financeiros. Os resultados dependem da aplicação individual.
          </p>
          <div className="flex justify-center gap-6 text-xs">
            <a href="#" className="hover:text-[#00ff88] transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-[#00ff88] transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-[#00ff88] transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Import Gift icon
function Gift(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <path d="M12 22v-7"></path>
      <path d="M12 7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2"></path>
      <path d="M12 7V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v2"></path>
    </svg>
  );
}
