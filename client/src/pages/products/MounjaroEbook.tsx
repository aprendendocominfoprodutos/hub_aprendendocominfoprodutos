import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, AlertCircle, Check, Droplet, Leaf, Clock, Users, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function MounjaroEbook() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const pains = [
    "Não sei o que comer no café, almoço e jantar",
    "Tenho medo de comer algo que piore enjoo ou desconforto",
    "Quero receitas leves, mas sem complicação",
    "Preciso organizar melhor hidratação e refeições",
    "Quero evitar improviso e escolhas ruins",
    "Não quero depender de dieta maluca"
  ];

  const benefits = [
    "Receitas simples e leves",
    "Ideias para refeições equilibradas",
    "Cuidados com hidratação e digestão",
    "Estratégias para proteína e fibras",
    "Planejamento alimentar prático",
    "Orientações para evitar alimentos problemáticos"
  ];

  const contents = [
    { title: "Introdução ao Mounjaro e alimentação", desc: "Entenda por que a alimentação faz diferença durante o uso da tirzepatida." },
    { title: "Como o Mounjaro age no corpo", desc: "Explicação simples sobre saciedade, apetite e controle alimentar." },
    { title: "Princípios da alimentação saudável", desc: "Como montar refeições mais equilibradas, leves e nutritivas." },
    { title: "Hidratação e digestão", desc: "Cuidados importantes com água, desconforto, digestão e rotina." },
    { title: "Planejamento de refeições", desc: "Como evitar decisões impulsivas e organizar melhor a semana." },
    { title: "Proteínas e fibras", desc: "Como usar esses dois pilares para mais saciedade e melhor digestão." },
    { title: "Alimentos problemáticos", desc: "O que evitar para reduzir desconfortos e melhorar a rotina." },
    { title: "Exemplos práticos de cardápio", desc: "Ideias simples para café da manhã, almoço, jantar e lanches." },
    { title: "Eventos sociais e viagens", desc: "Como manter equilíbrio fora de casa sem virar refém da dieta." },
    { title: "Autonomia e longo prazo", desc: "Como usar o medicamento como ferramenta dentro de uma rotina mais consciente." }
  ];

  const forWho = [
    "Usa Mounjaro / Tirzepatida",
    "Está começando agora e quer se organizar",
    "Quer receitas leves e práticas",
    "Tem dúvidas sobre alimentação durante o tratamento",
    "Quer melhorar hidratação, digestão e rotina",
    "Busca um material simples para consultar no celular",
    "Quer mais clareza sem depender de informações soltas da internet"
  ];

  const notForWho = [
    "Procura promessa milagrosa de emagrecimento",
    "Quer substituir médico ou nutricionista",
    "Busca uma dieta extrema e restritiva",
    "Não pretende ajustar nada na rotina",
    "Quer resultado garantido sem mudança de hábitos"
  ];

  const bonuses = [
    { title: "Checklist da Rotina", desc: "Para acompanhar água, refeições, proteína, fibras e cuidados básicos." },
    { title: "Lista de Compras Inteligente", desc: "Sugestões de alimentos práticos para facilitar a semana." },
    { title: "Cardápio Base de 3 Dias", desc: "Modelo simples para começar com mais clareza." }
  ];

  const faqs = [
    {
      q: "O e-book substitui consulta médica ou nutricional?",
      a: "Não. Ele é um material informativo e prático, mas não substitui acompanhamento profissional."
    },
    {
      q: "Serve para quem está começando agora?",
      a: "Sim. O conteúdo foi pensado para quem já usa ou vai iniciar o uso de Mounjaro / Tirzepatida."
    },
    {
      q: "O material tem receitas?",
      a: "Sim. O e-book traz ideias de receitas, refeições e combinações práticas."
    },
    {
      q: "Recebo como?",
      a: "Você recebe acesso digital ao PDF após a compra."
    },
    {
      q: "Posso acessar pelo celular?",
      a: "Sim. O material foi pensado para leitura fácil no celular."
    },
    {
      q: "É uma dieta fechada?",
      a: "Não. É um guia de apoio com receitas, cuidados e orientações gerais."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/fitness-saude/alimentacao/receitas">
            <a className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                Receitas e Cuidados para Quem Usa Mounjaro / Tirzepatida
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Um guia prático para organizar sua alimentação, hidratação e rotina durante o uso da tirzepatida — com orientações simples, refeições leves e cuidados essenciais para o dia a dia.
              </p>
              
              <div className="flex flex-col gap-4 mb-8">
                <a
                  href="SEU_LINK_CHECKOUT"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-center transition-colors"
                >
                  QUERO ACESSAR O E-BOOK AGORA
                </a>
                <p className="text-sm text-gray-600 text-center">
                  Acesso digital imediato • Material em PDF • Compra segura
                </p>
              </div>

              {/* Selos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <Leaf className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-900">Receitas Práticas</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <AlertCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-900">Cuidados Essenciais</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-900">Rotina Alimentar</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <Droplet className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-900">Hidratação</p>
                </div>
              </div>
            </div>

            {/* Right - Mockup */}
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-600 max-w-sm">
                <div className="bg-green-600 rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center text-white">
                    <BookOpen className="w-16 h-16 mx-auto mb-2" />
                    <p className="font-bold text-lg">E-book Digital</p>
                    <p className="text-sm">Receitas para Mounjaro</p>
                  </div>
                </div>
                <p className="text-center text-gray-700 font-semibold">Acesso imediato após compra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE IDENTIFICAÇÃO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 text-center">
            Você começou o Mounjaro, mas ainda tem dúvidas sobre o que comer?
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Muita gente inicia o uso da tirzepatida sem saber como adaptar a rotina alimentar. Surgem dúvidas sobre refeições, hidratação, proteína, fibras, alimentos que causam desconforto e como manter constância sem exageros.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pains.map((pain, idx) => (
              <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <p className="text-gray-800 font-medium">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO DE SOLUÇÃO */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 text-center">
            O e-book foi criado para simplificar sua rotina alimentar
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            O guia reúne receitas, cuidados e orientações práticas para ajudar quem usa Mounjaro / Tirzepatida a ter mais clareza no dia a dia. A proposta é reduzir improvisos, facilitar escolhas e tornar a alimentação mais organizada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-800 font-medium">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O QUE VOCÊ VAI ENCONTRAR */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
            O que tem dentro do e-book
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contents.map((content, idx) => (
              <div key={idx} className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-2">{idx + 1}. {content.title}</h3>
                <p className="text-gray-700">{content.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARA QUEM É */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
            Esse guia é para você se:
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {forWho.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white rounded-lg p-4">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARA QUEM NÃO É */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
            Esse guia não é para você se:
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {notForWho.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-300">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OFERTA */}
      <section className="py-16 bg-gradient-to-b from-green-100 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-4 border-green-600">
            <h2 className="text-3xl font-bold text-green-900 mb-2 text-center">
              Acesse agora o guia completo
            </h2>
            <p className="text-lg font-semibold text-green-600 text-center mb-8">
              Receitas para Quem Usa Mounjaro / Tirzepatida
            </p>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800">E-book digital em PDF</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800">Receitas e cuidados práticos</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800">Conteúdo dividido em capítulos</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800">Acesso pelo celular, tablet ou computador</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800">Material direto e fácil de consultar</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800">Acesso imediato após a compra</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 line-through mb-2">De R$ 47,00</p>
              <p className="text-4xl font-bold text-green-600 mb-4">por apenas R$ 19,90</p>
            </div>

            <a
              href="SEU_LINK_CHECKOUT"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-center transition-colors mb-4"
            >
              QUERO MEU E-BOOK AGORA
            </a>
            <p className="text-sm text-gray-600 text-center">
              Compra segura • Acesso imediato • Produto digital
            </p>
          </div>
        </div>
      </section>

      {/* 8. BÔNUS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 text-center">
            Comprando hoje, você também recebe:
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            3 bônus exclusivos para complementar seu guia
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonuses.map((bonus, idx) => (
              <div key={idx} className="bg-gradient-to-b from-green-50 to-white rounded-xl p-6 border-2 border-green-200 text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-green-900 mb-2">{bonus.title}</h3>
                <p className="text-gray-700">{bonus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GARANTIA */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 border-2 border-green-600 text-center">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              Garantia de 7 dias
            </h2>
            <p className="text-gray-700">
              Você pode acessar o material, avaliar o conteúdo e, se entender que ele não faz sentido para sua rotina, solicitar reembolso dentro do prazo de garantia da plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-2 border-green-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full bg-green-50 hover:bg-green-100 px-6 py-4 flex items-center justify-between transition-colors"
                >
                  <p className="font-semibold text-green-900 text-left">{faq.q}</p>
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

      {/* 11. CHAMADA FINAL */}
      <section className="py-16 bg-gradient-to-b from-green-100 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Organize sua alimentação com mais clareza e menos improviso
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Ter um guia simples em mãos pode tornar sua rotina mais prática. Acesse o e-book e comece a aplicar cuidados, receitas e escolhas mais conscientes no seu dia a dia.
          </p>

          <a
            href="SEU_LINK_CHECKOUT"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-lg transition-colors mb-4"
          >
            ACESSAR O E-BOOK AGORA
          </a>
        </div>
      </section>

      {/* FOOTER / AVISO IMPORTANTE */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded mb-8">
            <p className="text-sm text-gray-800">
              <strong>Aviso importante:</strong> este material é informativo e não substitui orientação médica, nutricional ou acompanhamento profissional. O uso de medicamentos como Mounjaro / Tirzepatida deve ser feito somente com prescrição e acompanhamento de profissional habilitado.
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
