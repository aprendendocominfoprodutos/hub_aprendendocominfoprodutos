import { useEffect } from 'react';
import { ArrowLeft, AlertCircle, Check } from 'lucide-react';
import { Link } from 'wouter';

export default function MounjaroEbook() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/fitness-saude/alimentacao/receitas">
            <a className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-full">
              <span className="text-amber-400 text-sm font-semibold">💊 EBOOK EXCLUSIVO</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
              30 Receitas Leves para Quem Usa Mounjaro
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Cardápios simples, refeições práticas e cuidados alimentares durante o uso da tirzepatida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Comprar Agora na Kiwifi
              </button>
              <button className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Poppins' }}>
            O Que Você Vai Receber
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Café da Manhã */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="text-3xl mb-4">☀️</div>
              <h3 className="text-xl font-bold text-white mb-4">Café da Manhã</h3>
              <p className="text-slate-300 mb-4">6 receitas leves e nutritivas para começar o dia com energia</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Omelete de espinafre
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Iogurte com chia
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Panqueca de banana
                </li>
              </ul>
            </div>

            {/* Almoço */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="text-3xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-white mb-4">Almoço</h3>
              <p className="text-slate-300 mb-4">8 receitas principais com proteína e nutrientes balanceados</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Frango grelhado com legumes
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Bowl de quinoa
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Peixe assado com purê
                </li>
              </ul>
            </div>

            {/* Jantar */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="text-3xl mb-4">🌙</div>
              <h3 className="text-xl font-bold text-white mb-4">Jantar</h3>
              <p className="text-slate-300 mb-4">6 receitas leves para noites tranquilas e boa digestão</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Sopa de frango
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Ovo com salada
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Peixe com brócolis
                </li>
              </ul>
            </div>

            {/* Bônus */}
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 border border-amber-600/50 rounded-lg p-8">
              <div className="text-3xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-white mb-4">Bônus Inclusos</h3>
              <p className="text-slate-300 mb-4">Extras para potencializar seus resultados</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Cardápio de 7 dias
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Lista de compras
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <Check size={16} className="text-amber-500" />
                  Tabela de substituições
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Poppins' }}>
            Por Que Este Ebook?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500/20 text-amber-400">
                  <Check size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Receitas Testadas</h3>
                <p className="text-slate-400">Todas as receitas foram desenvolvidas especificamente para quem usa Mounjaro</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500/20 text-amber-400">
                  <Check size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Fácil de Seguir</h3>
                <p className="text-slate-400">Instruções simples e ingredientes acessíveis para o dia a dia</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500/20 text-amber-400">
                  <Check size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Nutricionalmente Denso</h3>
                <p className="text-slate-400">Máximo de nutrientes em porções menores</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500/20 text-amber-400">
                  <Check size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Suporte Contínuo</h3>
                <p className="text-slate-400">Acesso a atualizações e novas receitas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-950/50 border border-blue-700/50 rounded-lg p-8 flex gap-4">
            <AlertCircle className="text-blue-400 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Aviso Importante</h3>
              <p className="text-blue-200 text-sm mb-3">
                Este material tem finalidade educativa e alimentar geral. Ele não substitui consulta com médico, nutricionista ou outro profissional de saúde.
              </p>
              <p className="text-blue-200 text-sm">
                O uso de Mounjaro/tirzepatida deve ser feito somente com prescrição e acompanhamento profissional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
            Pronto para Transformar Sua Alimentação?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Acesse agora as 30 receitas leves e comece a cuidar da sua saúde com Mounjaro
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors">
            Comprar Agora na Kiwifi
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-8 px-4 text-center text-slate-400 mt-12">
        <p>&copy; 2026 Aprendendo com Infoprodutos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
