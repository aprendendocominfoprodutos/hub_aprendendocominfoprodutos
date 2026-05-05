import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RendaExtraEbook() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel items - adicione mais imagens aqui depois
  const carouselItems = [
    {
      id: 1,
      title: "Renda Extra com Celular",
      subtitle: "Transforme seu celular em uma máquina de fazer dinheiro",
      price: "R$ 97,00",
      image: "https://via.placeholder.com/400x300?text=Renda+Extra", // Substitua com imagem real
    },
    // Adicione mais items aqui quando tiver imagens
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-100 border-b border-yellow-600 bg-black/95">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-500">Aprendendo com Infoprodutos</div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="hover:text-yellow-500 transition">
              Início
            </a>
            <a href="#beneficios" className="hover:text-yellow-500 transition">
              Benefícios
            </a>
            <a href="#preco" className="hover:text-yellow-500 transition">
              Preço
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Guia Prático: <span className="text-yellow-500">Renda Extra com Celular</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Descubra como transformar seu celular em uma máquina de fazer dinheiro. Guia prático com
          métodos reais e testados.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition">
            Comprar Agora
          </button>
          <button className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500/10 transition">
            Saiba Mais
          </button>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Conheça o <span className="text-yellow-500">Conteúdo</span>
        </h2>

        <div className="relative bg-gray-900/50 rounded-lg overflow-hidden border border-yellow-500/20">
          {/* Carousel Container */}
          <div className="relative h-96 flex items-center justify-center overflow-hidden">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex h-full">
                  {/* Image */}
                  <div className="w-1/2 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-6 text-lg">{item.subtitle}</p>
                    <div className="mb-6">
                      <p className="text-gray-500 text-sm mb-2">Preço</p>
                      <p className="text-4xl font-bold text-yellow-500">{item.price}</p>
                    </div>
                    <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition w-full">
                      Explorar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {carouselItems.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-yellow-500/20 hover:bg-yellow-500/40 p-2 rounded-full transition"
              >
                <ChevronLeft className="w-6 h-6 text-yellow-500" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-yellow-500/20 hover:bg-yellow-500/40 p-2 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6 text-yellow-500" />
              </button>
            </>
          )}

          {/* Indicators */}
          {carouselItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentSlide ? "bg-yellow-500 w-8" : "bg-yellow-500/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="bg-gray-900/50 py-20 my-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Por que este <span className="text-yellow-500">Guia é Especial</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📱",
                title: "Métodos Reais",
                desc: "Técnicas testadas e comprovadas para ganhar dinheiro com celular",
              },
              {
                icon: "⚡",
                title: "Rápido e Prático",
                desc: "Comece a ganhar em poucas horas após aprender os métodos",
              },
              {
                icon: "💰",
                title: "Sem Investimento",
                desc: "Não precisa de dinheiro inicial, apenas seu celular",
              },
              {
                icon: "📚",
                title: "Passo a Passo",
                desc: "Instruções detalhadas e fáceis de seguir para iniciantes",
              },
              {
                icon: "🎯",
                title: "Resultados Comprovados",
                desc: "Centenas de pessoas já ganharam renda extra com esses métodos",
              },
              {
                icon: "🔄",
                title: "Atualizações Grátis",
                desc: "Receba novos métodos e atualizações regularmente",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/0 border border-yellow-500/20 p-6 rounded-lg hover:border-yellow-500/50 transition"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-500">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Preview */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          O que você vai <span className="text-yellow-500">Aprender</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ul className="space-y-4">
              {[
                "Apps que pagam por tarefas simples",
                "Como monetizar redes sociais",
                "Métodos de cashback e cupons",
                "Pesquisas remuneradas online",
                "Venda de fotos e conteúdo",
                "Affiliate marketing no celular",
                "Estratégias de crescimento rápido",
                "Dicas para maximizar ganhos",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg">
                  <span className="text-yellow-500 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/30 rounded-lg p-12 text-center min-h-96 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-yellow-500 mb-4">Guia Completo</h3>
            <p className="text-gray-400 text-lg">
              +50 páginas de conteúdo prático e testado para você começar a ganhar renda extra
              imediatamente
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preco" className="bg-gray-900/50 py-20 my-12">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Investimento <span className="text-yellow-500">Acessível</span>
          </h2>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">Preço especial de lançamento</p>
            <div className="text-5xl font-bold text-yellow-500 mb-2">R$ 97,00</div>
            <p className="text-gray-400 mb-8">Acesso vitalício ao guia completo</p>

            <ul className="text-left space-y-3 mb-8 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">✓</span> Acesso imediato ao guia
              </li>
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">✓</span> Atualizações grátis
              </li>
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">✓</span> Suporte por email
              </li>
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">✓</span> Garantia de 7 dias
              </li>
            </ul>

            <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition">
              Comprar Agora - R$ 97,00
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-t border-b border-yellow-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para transformar seu celular em renda?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Não deixe essa oportunidade passar. Comece hoje mesmo!
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition">
            Comprar Agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">
            Aviso: Este guia é apenas informativo. Resultados podem variar de pessoa para pessoa.
          </p>
        </div>
      </footer>
    </div>
  );
}
