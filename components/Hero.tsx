import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Logo grande */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logoWW.png"
            alt="Electric Instalaciones SRL"
            width={612}
            height={408}
            priority
          />
        </div>

        {/* H1 SEO */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Instalaciones eléctricas industriales y comerciales en Argentina
        </h1>

        {/* Subtexto */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Soluciones seguras, eficientes y a medida. Especialistas en proyectos
          de alta exigencia técnica.
        </p>

        {/* CTAs */}
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#contact"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300"
          >
            Solicitar evaluación tecnica
          </a>
          <a
            href="#services"
            className="border border-gray-400 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
