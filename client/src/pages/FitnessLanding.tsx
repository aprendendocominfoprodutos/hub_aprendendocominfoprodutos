import { useState, useEffect } from 'react';

/**
 * Landing Page Premium - Fitness & Saúde (Receitas com Tirzepatida)
 * 
 * Design: Wellness Moderno - Light Mode
 * - Fundo: Branco/Cinza claro
 * - Cores: Verde escuro (#2d5a4a) + Verde claro (#7cb342)
 * - Tipografia: Serif elegante (títulos) + Sans-serif (corpo)
 * - Imagens: Fotos reais de pratos
 * - Vibe: Limpo, profissional, saudável
 * - Totalmente diferente da Mitologia
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
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="container max-w-6xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-green-700">🌿 30 Receitas Mounjaro</span>
          </div>
          <button className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold">
            Comprar Agora
          </button>
        </div>
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="relative w-full py-16 md:py-24 px-4">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Texto Hero */}
            <div>
              <div className="text-sm font-semibold text-green-600 mb-2">🌱 Especial para Mounjaro</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                Alimentação Leve, Resultados Reais
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                30 receitas práticas e saborosas desenvolvidas especialmente para quem usa Mounjaro/Tirzepatida. Otimize seu tratamento com uma alimentação que funciona.
              </p>
              
              <div className="flex gap-4 mb-8">
                <button className="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold">
                  Comprar E-book
                </button>
                <button className="px-8 py-3 bg-white text-green-700 border-2 border-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                  Ver Prévia Grátis
                </button>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>61 páginas com design premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Cardápios prontos para a semana</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Suporte nutricional especializado</span>
                </div>
              </div>
            </div>

            {/* Imagem Hero */}
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/manus-storage/hero_receitas_0ab2296f.png"
                  alt="Prato saudável com frango e legumes"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POR QUE DIFERENTE ============ */}
      <section className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12" style={{ fontFamily: "'Georgia', serif" }}>
            Por que este e-book é diferente?
          </h2>
          
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Desenvolvido especificamente para usuários de Mounjaro que buscam otimizar seus resultados com uma alimentação prática e deliciosa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🍽️', title: 'Receitas Leves', desc: 'Todas as 30 receitas foram criadas pensando em digestão fácil e refeições que não pesam no estômago, perfeitas para quem usa Mounjaro.' },
              { icon: '📋', title: 'Guia Completo', desc: 'Mais que receitas: cardápios prontos, listas de compras, tabelas de substituições e dicas práticas para manter a consistência.' },
              { icon: '✨', title: 'Design Premium', desc: 'Apresentação profissional e elegante, com design sofisticado que transmite qualidade e credibilidade.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VEJA ALGUMAS RECEITAS ============ */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Veja algumas receitas
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Exemplos das receitas incluídas no e-book, desenvolvidas para ser práticas, saudáveis e deliciosas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: '/manus-storage/receita_omelete_66b60397.png', title: 'Omelete Leve de Espinafre', desc: 'Rápida, prática e perfeita para café da manhã', time: '10 min', servings: '1 porção' },
              { img: '/manus-storage/receita_buddha_bowl_abdb3814.png', title: 'Buddha Bowl Colorido', desc: 'Nutritiva e visualmente atraente para almoço', time: '20 min', servings: '1 porção' },
              { img: '/manus-storage/receita_sopa_0fa7ade4.png', title: 'Sopa Leve de Legumes', desc: 'Reconfortante e fácil de digerir para dias difíceis', time: '25 min', servings: '2 porções' },
            ].map((recipe, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <img src={recipe.img} alt={recipe.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{recipe.desc}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>⏱️ {recipe.time}</span>
                    <span>🍽️ {recipe.servings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ O QUE VOCÊ RECEBE ============ */}
      <section className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12" style={{ fontFamily: "'Georgia', serif" }}>
            O que você recebe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '✓', title: '30 Receitas Completas', desc: 'Café da manhã, almoço, jantar, lanches e receitas para dias de baixa fome' },
              { icon: '✓', title: 'Cardápio de 7 Dias', desc: 'Planejamento pronto para usar, com opções variadas e balanceadas' },
              { icon: '✓', title: 'Lista de Compras', desc: 'Organizada e fácil de usar para suas compras do mês' },
              { icon: '✓', title: 'Tabelas de Substituições', desc: 'Adapte as receitas conforme sua preferência e tolerância' },
              { icon: '✓', title: 'Dicas Práticas', desc: 'Como adaptar em restaurantes, gerenciar efeitos colaterais e manter consistência' },
              { icon: '✓', title: 'Design Premium', desc: '61 páginas com layout elegante e profissional' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-green-600 font-bold">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PREÇO & CTA FINAL ============ */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Georgia', serif" }}>
            Pronto para otimizar seu tratamento?
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Comece hoje com as 30 receitas que vão transformar sua alimentação e seus resultados com Mounjaro.
          </p>

          <div className="bg-white border-2 border-green-700 rounded-lg p-8 mb-8">
            <div className="text-5xl font-bold text-green-700 mb-2">R$ 29,90</div>
            <p className="text-gray-600 mb-6">Acesso imediato após a compra • Garantia de satisfação • Suporte dedicado</p>
            <button className="w-full px-8 py-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-bold text-lg">
              Comprar E-book Agora
            </button>
          </div>

          {/* Countdown */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-4">Oferta especial expira em:</p>
            <div className="flex justify-center gap-4">
              {[
                { value: timeLeft.hours, label: 'Horas' },
                { value: timeLeft.minutes, label: 'Minutos' },
                { value: timeLeft.seconds, label: 'Segundos' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-100 border-2 border-green-700 rounded-lg p-4 min-w-20">
                  <div className="text-2xl md:text-3xl font-bold text-green-700">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios Finais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm text-gray-600">Acesso imediato em PDF</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">♾️</div>
              <p className="text-sm text-gray-600">Acesso vitalício</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm text-gray-600">Compra segura e protegida</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-gray-100 border-t border-gray-200 py-12 px-4">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                Receitas com Tirzepatida
              </h4>
              <p className="text-sm text-gray-600">
                Guia prático para manter a nutrição em dia durante o uso de Mounjaro.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-700 transition-colors">Sobre o E-book</a></li>
                <li><a href="#" className="hover:text-green-700 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-700 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-green-700 transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 Receitas com Tirzepatida. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
