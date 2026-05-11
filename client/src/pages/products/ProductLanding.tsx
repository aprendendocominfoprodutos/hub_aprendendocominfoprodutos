import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Check } from 'lucide-react';

interface ProductLandingProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  benefits: string[];
  modules: string[];
  testimonials: Array<{ name: string; text: string; role: string }>;
  paymentLink: string;
  backLink: string;
  accentColor: string; // ex: 'from-amber-600 to-amber-800'
  textColor: string; // ex: 'text-amber-600'
}

export default function ProductLanding({
  title,
  subtitle,
  description,
  price,
  image,
  benefits,
  modules,
  testimonials,
  paymentLink,
  backLink,
  accentColor,
  textColor,
}: ProductLandingProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900/95 via-slate-800/80 to-transparent">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link href={backLink}>
            <a className={`text-sm ${textColor} hover:opacity-80 transition-opacity flex items-center gap-2`}>
              <ArrowLeft className="w-4 h-4" /> Voltar
            </a>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className={`text-sm font-semibold ${textColor} mb-3 uppercase tracking-wider`}>
                {subtitle}
              </p>
              <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
              <p className="text-xl text-slate-300 mb-8">{description}</p>

              {/* CTA Button */}
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block bg-gradient-to-r ${accentColor} text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all transform hover:scale-105`}
              >
                Comprar Agora - {price}
              </a>

              {/* Trust Badges */}
              <div className="flex gap-6 mt-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Acesso Instantâneo
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Acesso Vitalício
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} rounded-2xl blur-3xl opacity-20`}></div>
              <img
                src={image}
                alt={title}
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12">O Que Você Vai Aprender</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${accentColor} flex items-center justify-center`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-200">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="py-16 bg-slate-800/50 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12">Módulos Inclusos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${accentColor} flex items-center justify-center font-bold text-white`}>
                    {idx + 1}
                  </div>
                  <p className="text-slate-100 text-lg">{module}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <div className="py-16 border-t border-slate-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-12">O Que Dizem Nossos Alunos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-slate-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className={`text-sm ${textColor}`}>{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto Para Começar?</h2>
          <p className="text-xl text-slate-300 mb-8">Acesso instantâneo após a compra. Comece sua transformação agora!</p>
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-gradient-to-r ${accentColor} text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105`}
          >
            Comprar Agora - {price}
          </a>
        </div>
      </div>
    </div>
  );
}
