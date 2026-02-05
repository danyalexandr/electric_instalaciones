import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen pt-32 flex flex-col justify-center items-center text-center px-6 bg-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/logo.png"
          alt="Electric Instalaciones SRL"
          width={80}
          height={80}
        />
        <span className="text-gray-600 2xl md:text-3xl font-semibold tracking-wide">
          Electric Instalaciones SRL
        </span>
      </div>

      <h1 className="text-gray-600 3xl md:text-6xl font-bold max-w-4xl">
        Instalaciones eléctricas profesionales para entornos exigentes
      </h1>

      <p className="text-gray-600 mt-6 max-w-2xl text-sm md:text-base">
        Desarrollamos y mantenemos sistemas eléctricos industriales, comerciales y de infraestructura, priorizando seguridad, continuidad operativa y cumplimiento normativo.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="#contacto"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md hover:bg-yellow-500 disabled:opacity-60"
        >
          Solicitar evaluación técnica
        </a>
        <a
          href="#servicios"
          className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded hover:bg-yellow-400 hover:text-white"
        >
          Ver servicios
        </a>
      </div>
    </section>
  );
}
