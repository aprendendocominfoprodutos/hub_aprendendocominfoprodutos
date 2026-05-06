import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

/**
 * Landing Page Premium - Mitologia Grega (Ebook Exclusivo)
 * 
 * Design: Classicismo Cinematográfico Premium
 * - Cores: Azul-marinho + Dourado envelhecido + Branco marfim
 * - Foco: Venda exclusiva do ebook, sem distrações
 * - Estrutura: 8 seções de alta conversão
 * 
 * Paleta:
 * - Fundo principal: #050506
 * - Fundo secundário: #07101f
 * - Dourado envelhecido: #c9a24a
 * - Dourado claro: #f1d37a
 * - Texto principal: #f8f5ec
 * - Texto secundário: #c8c1ad
 */
export default function MitologiaGregaEbook() {
  const [currentPreviewSlide, setCurrentPreviewSlide] = useState(0);

  const previewSlides = [
    { id: 1, title: 'A Origem do Mundo', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/mitologia_pagina_interna_1-arQuAatKbPiKyh9tVS78J8.webp' },
    { id: 2, title: 'Poder e Controle', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/mitologia_pagina_interna_2-AMBGksS2tmGiRtAPVyM7fA.webp' },
    { id: 3, title: 'Heróis e Criaturas', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/mitologia_pagina_interna_3-38R3dAGcvyRAXy7VngGyHt.webp' },
    { id: 4, title: 'Símbolos e Significados', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028474035/MMmtQoJCAFVuuyydEuPJsU/mitologia_pagina_interna_4-S2MWzSweWx5eT7sXhvv9ws.webp' },
  ];

  const contentItems = [
    { title: 'Origem do Mundo', description: 'Caos, Gaia, Urano e os Titãs' },
    { title: 'Poder e Controle', description: 'Zeus, Poseidon e Hades' },
    { title: 'Estratégia, Impulso e Consciência', description: 'Atena, Ares e Apolo' },
    { title: 'Emoção e Desejo', description: 'Afrodite, Dionísio e Hermes' },
    { title: 'Conflito e Relações', description: 'Hera, Hefesto e Ártemis' },
    { title: 'Criação e Movimento', description: 'Deméter, Hestia e Hades' },
    { title: 'Heróis', description: 'Héracles, Perseu, Teseu e mais' },
    { title: 'Criaturas', description: 'Minotauro, Medusa, Fênix' },
    { title: 'Mitos e Conceitos', description: 'Histórias épicas e significados' },
    { title: 'Reflexão Final', description: 'Padrões universais e aplicações' },
  ];

  const differentials = [
    'Organização visual premium',
    'Conteúdo direto e sem enrolação',
    'Leitura fácil no celular',
    'Estrutura clara por temas',
    'Estética cinematográfica mitológica',
    'Excelente para mitologia, cultura e simbolismo',
  ];

  const audiences = [
    'Leitores curiosos sobre mitologia',
    'Pessoas que gostam de história e simbolismo',
    'Fãs de filmes, jogos e histórias épicas',
    'Criadores e estudiosos que querem repertório visual',
  ];

  const nextPreviewSlide = () => {
    setCurrentPreviewSlide((prev) => (prev + 1) % previewSlides.length);
  };

  const prevPreviewSlide = () => {
    setCurrentPreviewSlide((prev) => (prev - 1 + previewSlides.length) % previewSlides.length);
  };

  const handleCheckout = () => {
    // TODO: Integrar com Kiwifi/Hotmart
    alert('Redirecionando para checkout...');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050506', color: '#f8f5ec' }}>
      {/* ============ 1. HERO ============ */}
      <section className="relative py-16 md:py-32 overflow-hidden" style={{ backgroundColor: '#050506' }}>
        {/* Background glow effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ backgroundColor: '#c9a24a', filter: 'blur(120px)' }}></div>
        </div>

        <div className="container relative z-10 px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#f1d37a' }}>
                  Mitologia Grega
                </h1>
                <h2 className="text-2xl md:text-3xl font-light" style={{ color: '#c8c1ad' }}>
                  Deuses, Heróis e Significados Ocultos
                </h2>
              </div>

              <p className="text-lg md:text-xl leading-relaxed max-w-lg" style={{ color: '#c8c1ad' }}>
                Descubra os deuses, heróis, criaturas e símbolos mais marcantes da Grécia Antiga em um material visual, elegante e fácil de compreender.
              </p>

              <p className="text-base md:text-lg leading-relaxed max-w-lg" style={{ color: '#f8f5ec' }}>
                Um ebook premium para quem quer entender a mitologia grega além das histórias: com significado, organização visual e profundidade.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2" style={{ color: '#c9a24a' }}>
                  <Check size={20} />
                  <span className="text-sm md:text-base">Ebook digital</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#c9a24a' }}>
                  <Check size={20} />
                  <span className="text-sm md:text-base">Acesso imediato</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#c9a24a' }}>
                  <Check size={20} />
                  <span className="text-sm md:text-base">Leitura visual premium</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={handleCheckout}
                  className="px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: '#c9a24a',
                    color: '#050506',
                    boxShadow: '0 0 30px rgba(201, 162, 74, 0.3)',
                  }}
                >
                  Quero acessar agora
                </button>
              </div>
            </div>

            {/* Right: Mockup placeholder */}
            <div className="flex justify-center md:justify-end">
              <div
                className="w-full max-w-xs md:max-w-sm rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 0 40px rgba(201, 162, 74, 0.2)',
                }}
              >
                <img
                  src="/manus-storage/mitologia_mockup_oficial_1164a8dc.png"
                  alt="Mockup do ebook Mitologia Grega"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. SEÇÃO DE PROMESSA ============ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#07101f' }}>
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#f1d37a' }}>
            Mais do que mitos antigos
          </h2>

          <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 leading-relaxed" style={{ color: '#c8c1ad' }}>
            Este ebook foi criado para transformar a mitologia grega em uma experiência visual clara, envolvente e sofisticada. Em vez de textos confusos e cansativos, o leitor encontra uma jornada organizada por temas, personagens, conflitos, símbolos e significados.
          </p>

          {/* 3 Blocos */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Deuses e Poder', desc: 'Entenda os deuses que governam e moldam o destino' },
              { title: 'Heróis e Criaturas', desc: 'Conheça os heróis lendários e criaturas mitológicas' },
              { title: 'Símbolos e Significados', desc: 'Desvende os significados ocultos e padrões universais' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-lg border-l-4 transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: '#050506',
                  borderColor: '#c9a24a',
                  boxShadow: '0 0 20px rgba(201, 162, 74, 0.1)',
                }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#f1d37a' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#c8c1ad' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. O QUE TEM DENTRO ============ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#050506' }}>
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#f1d37a' }}>
            O que você vai encontrar neste livro
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {contentItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 md:p-6 rounded-lg text-center transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: '#07101f',
                  borderTop: '3px solid #c9a24a',
                  boxShadow: '0 0 15px rgba(201, 162, 74, 0.05)',
                }}
              >
                <div className="text-3xl mb-3" style={{ color: '#c9a24a' }}>
                  ◆
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#f1d37a' }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: '#c8c1ad' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. PRÉVIA INTERNA (CARROSSEL) ============ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#07101f' }}>
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#f1d37a' }}>
            Veja por dentro do ebook
          </h2>
          <p className="text-center mb-12" style={{ color: '#c8c1ad' }}>
            Páginas internas desenvolvidas com acabamento premium, leitura clara e identidade visual cinematográfica.
          </p>

          {/* Carrossel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              {/* Placeholder da imagem */}
              <div
                className="w-full rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 0 40px rgba(201, 162, 74, 0.2)',
                }}
              >
                <img
                  src={previewSlides[currentPreviewSlide].image}
                  alt={previewSlides[currentPreviewSlide].title}
                  className="w-full h-auto"
                />
              </div>

              {/* Navegação */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={prevPreviewSlide}
                  className="p-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: '#c9a24a',
                    color: '#050506',
                  }}
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="flex gap-2">
                  {previewSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPreviewSlide(idx)}
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: currentPreviewSlide === idx ? '#c9a24a' : '#c8c1ad',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPreviewSlide}
                  className="p-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: '#c9a24a',
                    color: '#050506',
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. DIFERENCIAIS ============ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#050506' }}>
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#f1d37a' }}>
            Por que este ebook é diferente?
          </h2>

          <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
            {differentials.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1" style={{ color: '#c9a24a' }}>
                  <Check size={24} />
                </div>
                <p className="text-lg md:text-xl" style={{ color: '#f8f5ec' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. PARA QUEM É ============ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#07101f' }}>
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#f1d37a' }}>
            Para quem este livro foi feito?
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12" style={{ color: '#c8c1ad' }}>
            Para quem gosta de mitologia grega, histórias épicas, deuses, heróis, criaturas lendárias, simbolismo, cultura antiga, filmes, jogos e narrativas que revelam padrões humanos universais.
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {audiences.map((item, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-lg text-center transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: '#050506',
                  borderColor: '#c9a24a',
                  border: '1px solid #c9a24a',
                  boxShadow: '0 0 20px rgba(201, 162, 74, 0.1)',
                }}
              >
                <p className="text-lg md:text-xl" style={{ color: '#f1d37a' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. OFERTA ============ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#050506' }}>
        <div className="container px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#f1d37a' }}>
              Tenha acesso ao ebook completo
            </h2>

            {/* Capa placeholder */}
            <div
              className="w-full max-w-xs mx-auto rounded-lg overflow-hidden mb-8"
              style={{
                boxShadow: '0 0 40px rgba(201, 162, 74, 0.2)',
              }}
            >
              <img
                src="/manus-storage/mitologia_mockup_oficial_1164a8dc.png"
                alt="Capa do ebook Mitologia Grega"
                className="w-full h-auto"
              />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#f1d37a' }}>
              MITOLOGIA GREGA — Deuses, Heróis e Significados Ocultos
            </h3>

            <p className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#c9a24a' }}>
              R$ [INSERIR PREÇO]
            </p>

            <p className="mb-8" style={{ color: '#c8c1ad' }}>
              Acesso liberado automaticamente após a confirmação do pagamento.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleCheckout}
              className="px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold rounded-lg transition-all duration-300 hover:shadow-lg mb-8"
              style={{
                backgroundColor: '#c9a24a',
                color: '#050506',
                boxShadow: '0 0 30px rgba(201, 162, 74, 0.3)',
              }}
            >
              Comprar agora
            </button>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2" style={{ color: '#c9a24a' }}>
                <Check size={20} />
                <span className="text-sm md:text-base">Compra segura</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#c9a24a' }}>
                <Check size={20} />
                <span className="text-sm md:text-base">Produto digital</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#c9a24a' }}>
                <Check size={20} />
                <span className="text-sm md:text-base">Acesso imediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. CTA FINAL ============ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#07101f' }}>
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#f1d37a' }}>
              A mitologia grega ainda revela muito sobre o mundo atual.
            </h2>

            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: '#c8c1ad' }}>
              Entenda os deuses, heróis, criaturas e padrões que atravessaram séculos e continuam explicando poder, desejo, medo, escolhas e transformação.
            </p>

            <button
              onClick={handleCheckout}
              className="px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold rounded-lg transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: '#c9a24a',
                color: '#050506',
                boxShadow: '0 0 30px rgba(201, 162, 74, 0.3)',
              }}
            >
              Quero meu ebook agora
            </button>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-8 md:py-12 border-t" style={{ backgroundColor: '#050506', borderColor: '#c9a24a' }}>
        <div className="container px-4 md:px-8 text-center" style={{ color: '#c8c1ad' }}>
          <p className="text-sm md:text-base">
            © MITOLOGIA GREGA — Produto digital
          </p>
        </div>
      </footer>
    </div>
  );
}
