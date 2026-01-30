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
        <span className="text-2xl md:text-3xl font-semibold tracking-wide">
          Electric Instalaciones SRL
        </span>
      </div>

      <h1 className="text-3xl md:text-6xl font-bold max-w-4xl">
        Instalaciones Eléctricas Industriales, Comerciales y Hospitalarias
      </h1>

      <p className="text-gray-600 mt-6 max-w-2xl text-sm md:text-base">
        Brindamos soluciones eléctricas seguras, eficientes y a medida para
        proyectos de alta exigencia.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="#contacto"
          className="bg-orange-500 text-white px-6 py-3 font-semibold rounded hover:bg-orange-400"
        >
          Solicitar presupuesto sin cargo
        </a>
        <a
          href="#servicios"
          className="border border-orange-500 text-orange-500 px-6 py-3 rounded hover:bg-orange-500 hover:text-white"
        >
          Ver servicios
        </a>
      </div>
    </section>
  );
}
