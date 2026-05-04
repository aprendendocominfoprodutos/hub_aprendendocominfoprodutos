import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function MounjaroEbook() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const pains = [
    "Tenho pouca fome e não sei o que comer",
    "Fico sem ideias de refeições leves",
    "Tenho medo de comer algo que pese",
    "Quero manter proteína sem exagerar no volume",
    "Preciso organizar minha semana alimentar",
    "Quero opções simples para café, almoço, jantar e lanches"
  ];

  const benefits = [
    "Receitas rápidas e fáceis",
    "Opções para baixa fome",
    "Refeições leves e proteicas",
    "Ideias para café, almoço, jantar e lanches",
    "Cardápio pronto de 7 dias",
    "Lista de compras organizada",
    "Tabela de substituições inteligentes",
    "Checklists diário e semanal"
  ];

  const contents = [
    { title: "Guia rápido de alimentação com Mounjaro", desc: "Explicações simples sobre como adaptar a rotina alimentar durante o uso da tirzepatida." },
    { title: "Como montar refeições leves", desc: "Fórmula prática para montar pratos menores, nutritivos e mais fáceis de digerir." },
    { title: "Alimentos que costumam ajudar", desc: "Lista de proteínas, fibras, carboidratos leves, gorduras boas e opções de hidratação." },
    { title: "Alimentos que podem pesar mais", desc: "Orientação sobre frituras, excesso de gordura, doces pesados, refrigerantes, álcool e ultraprocessados." },
    { title: "30 receitas leves", desc: "Receitas práticas para café da manhã, almoço, jantar, lanches e dias de baixa fome." },
    { title: "Cardápio de 7 dias", desc: "Um plano semanal ajustável usando as receitas do próprio e-book." },
    { title: "Lista de compras", desc: "Itens organizados por categoria para facilitar a compra da semana." },
    { title: "Tabela de substituições inteligentes", desc: "Trocas simples para deixar a rotina mais leve." },
    { title: "Guia de montagem rápida", desc: "Fórmulas prontas para montar refeições sem pensar demais." },
    { title: "Checklists diário e semanal", desc: "Ferramentas simples para acompanhar água, proteína, fibras, sintomas e consistência." }
  ];

  const recipes = {
    "CAFÉ DA MANHÃ": [
      "Omelete leve de espinafre com queijo branco",
      "Iogurte natural com chia, aveia e frutas vermelhas",
      "Panqueca de banana com aveia e ovo",
      "Vitamina proteica leve com banana e iogurte",
      "Ovos mexidos cremosos com tomate e ervas",
      "Tapioca pequena com frango desfiado e cottage"
    ],
    "ALMOÇO": [
      "Frango grelhado com legumes coloridos",
      "Bowl leve de quinoa com ovos e salada",
      "Peixe assado com purê de abóbora",
      "Carne magra em tiras com salada morna",
      "Arroz integral com lentilha e frango desfiado",
      "Salada proteica com atum, ovos e grão-de-bico",
      "Frango com batata-doce e brócolis",
      "Tilápia grelhada com legumes no vapor"
    ],
    "JANTAR LEVE": [
      "Sopa leve de lentilha com legumes",
      "Creme de abóbora com frango desfiado",
      "Omelete de legumes para jantar",
      "Caldo proteico de frango com cenoura",
      "Sopa de legumes com carne magra",
      "Peixe com abobrinha refogada"
    ],
    "LANCHES": [
      "Cottage com tomate, azeite e ervas",
      "Ovo cozido temperado com salada simples",
      "Maçã com pasta de amendoim em pequena porção",
      "Iogurte com mamão e chia",
      "Wrap leve de frango com alface",
      "Mix controlado de castanhas com fruta"
    ],
    "DIAS DE BAIXA FOME": [
      "Smoothie leve de iogurte, banana e aveia",
      "Caldo leve de frango com legumes",
      "Creme proteico de abóbora com cottage",
      "Mini bowl nutritivo com ovo, arroz e legumes"
    ]
  };

  const practicalTools = [
    "Cardápio de 7 dias",
    "Lista de compras da semana",
    "Tabela de substituições inteligentes",
    "Guia de montagem rápida",
    "Checklist diário",
    "Checklist semanal",
    "Erros comuns",
    "Dicas para restaurantes",
    "Como manter consistência"
  ];

  const forWho = [
    "Usa Mounjaro/tirzepatida com orientação profissional",
    "Sente menos fome e não sabe como montar refeições",
    "Quer receitas leves para o dia a dia",
    "Precisa de opções para café, almoço, jantar e lanches",
    "Quer manter proteína, fibras e hidratação na rotina",
    "Busca um cardápio semanal simples",
    "Quer evitar improvisos alimentares",
    "Deseja um material prático para consultar pelo celular"
  ];

  const notForWho = [
    "Procura prescrição médica",
    "Quer substituir acompanhamento nutricional",
    "Busca promessa de emagrecimento rápido",
    "Quer uma dieta rígida e individualizada",
    "Tem condição clínica específica e quer orientação sem profissional",
    "Quer resultado garantido sem ajustar hábitos"
  ];

  const bonuses = [
    { title: "Cardápio de 7 dias", desc: "Um plano simples e ajustável usando as receitas do próprio e-book." },
    { title: "Lista de compras da semana", desc: "Ingredientes organizados por categoria para facilitar sua rotina." },
    { title: "Checklists diário e semanal", desc: "Ferramentas para acompanhar água, proteína, fibras, sintomas, fome e consistência." }
  ];

  const faqs = [
    {
      q: "O e-book substitui médico ou nutricionista?",
      a: "Não. O material é educativo e alimentar geral. Ele não substitui consulta com médico, nutricionista ou outro profissional de saúde."
    },
    {
      q: "Serve para quem usa Mounjaro?",
      a: "Sim. O e-book foi criado para pessoas que usam Mounjaro/tirzepatida com orientação profissional e querem organizar melhor a rotina alimentar."
    },
    {
      q: "Tem receitas de verdade?",
      a: "Sim. O material contém 30 receitas organizadas por café da manhã, almoço, jantar leve, lanches e dias de baixa fome."
    },
    {
      q: "Recebo como?",
      a: "Você recebe acesso digital ao material em PDF após a compra."
    },
    {
      q: "Posso acessar pelo celular?",
      a: "Sim. O e-book pode ser acessado pelo celular, tablet ou computador."
    },
    {
      q: "É uma dieta personalizada?",
      a: "Não. É um guia alimentar prático e educativo, com receitas e sugestões gerais. Para dieta individualizada, procure um nutricionista."
    },
    {
      q: "Tem cardápio?",
      a: "Sim. O e-book inclui um cardápio de 7 dias, além de lista de compras e tabela de substituições."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/fitness-saude/alimentacao/receitas">
            <a className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-green-900 via-green-800 to-green-900 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                30 RECEITAS LEVES PARA QUEM USA MOUNJARO
              </h1>
              <p className="text-xl text-amber-100 mb-4 font-semibold">
                Cardápios simples, refeições práticas e cuidados alimentares durante o uso da tirzepatida
              </p>
              <p className="text-lg text-gray-200 mb-8">
                Um guia direto, leve e fácil de consultar pelo celular, com receitas para café da manhã, almoço, jantar, lanches, dias de baixa fome e um plano pronto para facilitar sua semana.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <a
                  href="SEU_LINK_CHECKOUT"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-black py-4 px-8 rounded-lg text-center transition-colors text-lg"
                >
                  QUERO ACESSAR O E-BOOK AGORA
                </a>
                <p className="text-sm text-gray-300 text-center">
                  Acesso digital imediato • Material em PDF • Compra segura
                </p>
              </div>

              {/* Selos */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-700 rounded-lg p-3 text-center border border-amber-400">
                  <p className="text-sm font-bold text-white">30 Receitas Leves</p>
                </div>
                <div className="bg-green-700 rounded-lg p-3 text-center border border-amber-400">
                  <p className="text-sm font-bold text-white">Cardápio 7 Dias</p>
                </div>
                <div className="bg-green-700 rounded-lg p-3 text-center border border-amber-400">
                  <p className="text-sm font-bold text-white">Lista de Compras</p>
                </div>
                <div className="bg-green-700 rounded-lg p-3 text-center border border-amber-400">
                  <p className="text-sm font-bold text-white">Checklists Práticos</p>
                </div>
              </div>
            </div>

            {/* Right - Mockup 3D */}
            <div className="flex justify-center">
              <img 
                src="/manus-storage/1000442303_1979f751.png" 
                alt="Mockup 3D - 30 Receitas Leves para Quem Usa Mounjaro" 
                className="w-full max-w-sm rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE PROBLEMA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-4 text-center">
            Usar Mounjaro muda a fome. Mas a rotina alimentar ainda precisa de direção.
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Com a redução do apetite e mudanças na saciedade, muita gente fica sem saber o que comer, como montar refeições menores, como manter proteína e fibras, ou como evitar alimentos que pesam na digestão.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pains.map((pain, idx) => (
              <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <p className="text-gray-800 font-semibold">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO DE SOLUÇÃO */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-4 text-center">
            Um guia prático para comer melhor sem complicar sua rotina
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            O e-book reúne 30 receitas leves e práticas, organizadas por momento do dia, além de cardápio semanal, lista de compras, substituições inteligentes e checklists para ajudar você a ter mais clareza nas escolhas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-800 font-semibold">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O QUE VOCÊ VAI RECEBER */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-12 text-center">
            O que vem dentro do e-book
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contents.map((content, idx) => (
              <div key={idx} className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-black text-green-900 mb-2 text-lg">{idx + 1}. {content.title}</h3>
                <p className="text-gray-700">{content.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO DAS 30 RECEITAS */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-12 text-center">
            30 receitas divididas para facilitar seu dia
          </h2>

          <div className="space-y-12">
            {Object.entries(recipes).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-2xl font-black text-green-900 mb-6 pb-4 border-b-4 border-amber-400">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((recipe, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-green-600">
                      <p className="text-gray-800 font-medium">{recipe}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO DE VALOR PRÁTICO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-4 text-center">
            Não é só um livro de receitas. É um guia para organizar sua semana.
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Além das receitas, o material entrega ferramentas práticas para facilitar decisões alimentares no dia a dia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {practicalTools.map((tool, idx) => (
              <div key={idx} className="bg-green-50 rounded-lg p-4 border-2 border-green-200 text-center">
                <p className="font-semibold text-green-900">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PARA QUEM É */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-12 text-center">
            Este e-book é para você se:
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {forWho.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white rounded-lg p-4 border-l-4 border-green-600">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-800 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PARA QUEM NÃO É */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-12 text-center">
            Este e-book não é para você se:
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {notForWho.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                <p className="text-gray-800 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. OFERTA */}
      <section className="py-16 bg-gradient-to-b from-green-900 to-green-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border-4 border-amber-400">
            <h2 className="text-3xl font-black text-green-900 mb-2 text-center">
              Acesse agora o e-book completo
            </h2>
            <p className="text-lg font-bold text-green-700 text-center mb-2">
              30 Receitas Leves para Quem Usa Mounjaro
            </p>
            <p className="text-sm text-gray-600 text-center mb-8">
              Cardápios simples, refeições práticas e cuidados alimentares durante o uso da tirzepatida
            </p>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">E-book digital em PDF</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">30 receitas leves e práticas</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">Receitas para café da manhã, almoço, jantar e lanches</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">Receitas para dias de baixa fome</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">Cardápio de 7 dias</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">Lista de compras</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">Tabela de substituições inteligentes</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">Checklists diário e semanal</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 font-medium">Acesso pelo celular, tablet ou computador</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 line-through mb-2 text-lg">De R$ 47,00</p>
              <p className="text-5xl font-black text-green-600 mb-4">por apenas R$ 19,90</p>
            </div>

            <a
              href="SEU_LINK_CHECKOUT"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 px-8 rounded-lg text-center transition-colors mb-4 text-lg"
            >
              QUERO MEU E-BOOK AGORA
            </a>
            <p className="text-sm text-gray-600 text-center">
              Compra segura • Acesso imediato • Produto digital
            </p>
          </div>
        </div>
      </section>

      {/* 10. BÔNUS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-4 text-center">
            Comprando hoje, você também recebe
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            3 bônus exclusivos para complementar seu guia
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonuses.map((bonus, idx) => (
              <div key={idx} className="bg-gradient-to-b from-green-50 to-white rounded-xl p-6 border-2 border-green-200 text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-black text-lg">
                  {idx + 1}
                </div>
                <h3 className="font-black text-green-900 mb-2 text-lg">{bonus.title}</h3>
                <p className="text-gray-700">{bonus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. GARANTIA */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 border-4 border-green-600 text-center">
            <h2 className="text-3xl font-black text-green-900 mb-4">
              Garantia de 7 dias
            </h2>
            <p className="text-gray-700 font-medium">
              Você pode acessar o material, avaliar o conteúdo e, se entender que ele não faz sentido para sua rotina, solicitar reembolso dentro do prazo de garantia da plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-2 border-green-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full bg-green-50 hover:bg-green-100 px-6 py-4 flex items-center justify-between transition-colors"
                >
                  <p className="font-bold text-green-900 text-left">{faq.q}</p>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="bg-white px-6 py-4 border-t-2 border-green-200">
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CHAMADA FINAL */}
      <section className="py-16 bg-gradient-to-b from-green-100 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-4">
            Tenha receitas leves e organização alimentar na palma da mão
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Pare de improvisar suas refeições. Acesse um guia prático com 30 receitas leves, cardápio semanal, lista de compras e checklists para tornar sua rotina mais simples, organizada e possível.
          </p>

          <a
            href="SEU_LINK_CHECKOUT"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-black py-4 px-12 rounded-lg transition-colors mb-4 text-lg"
          >
            ACESSAR O E-BOOK AGORA
          </a>
        </div>
      </section>

      {/* 14. FOOTER / AVISO IMPORTANTE */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded mb-8">
            <p className="text-sm text-gray-800 leading-relaxed">
              <strong>Aviso importante:</strong> este material tem finalidade educativa e alimentar geral. Ele não substitui consulta com médico, nutricionista ou outro profissional de saúde. O uso de Mounjaro/tirzepatida deve ser feito somente com prescrição e acompanhamento profissional. Não altere dose, frequência, dieta clínica, medicações ou suplementação sem orientação individualizada.
            </p>
          </div>
          <p className="text-center text-sm">
            © 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
