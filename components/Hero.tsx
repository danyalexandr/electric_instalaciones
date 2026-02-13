import Image from "next/image";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Instalaciones eléctricas profesionales</span>
            </div>

            {/* H1 SEO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Instalaciones{' '}
              <span className="text-yellow-500">eléctricas</span>{' '}
              industriales y comerciales
            </h1>

            {/* Subtexto */}
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Soluciones seguras, eficientes y a medida. Especialistas en proyectos
              de alta exigencia técnica con más de 20 años de experiencia.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">Certificaciones</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">Atención 24/7</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Solicitar evaluación técnica
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold hover:border-yellow-400 hover:text-yellow-500 transition-all duration-300"
              >
                Solicitar cotización de productos
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <Image
                src="/logoia.png"
                alt="Electric Instalaciones SRL"
                width={600}
                height={400}
                priority
                className="w-full h-auto"
              />
            </div>
            {/* Decorative shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
