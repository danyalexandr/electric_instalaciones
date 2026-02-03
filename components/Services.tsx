import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Instalaciones Eléctricas Industriales y Hospitalarias",
      description:
        "Diseño y ejecución de instalaciones eléctricas de potencia, fabricación de tableros seccionales y de comando, y tendido de alimentadores, garantizando continuidad operativa y seguridad.",
      image: "/services/industrial.png",
    },
    {
      title: "Instalaciones Eléctricas Comerciales y Domiciliarias",
      description:
        "Montaje, adecuación y mantenimiento de instalaciones eléctricas en comercios y viviendas, cumpliendo normativas vigentes y optimizando el consumo energético.",
      image: "/services/comercial.png",
    },
    {
      title: "Protección y Extinción de Incendios",
      description:
        "Instalación de sistemas eléctricos asociados a detección, alarma y extinción de incendios, asegurando funcionamiento confiable en situaciones críticas.",
      image: "/services/industrial.png",
    },
    {
      title: "Iluminación y Distribución Inteligente",
      description:
        "Implementación de sistemas de iluminación eficiente mediante tecnologías DALI y Lutron, orientadas al control, automatización y ahorro energético.",
      image: "/services/corrientes.png",
    },
    {
      title: "Automatización de Edificios",
      description:
        "Integración de sistemas eléctricos y de control para automatización de edificios, mejorando la gestión operativa, la seguridad y la eficiencia.",
      image: "/services/automatizacion.png",
    },
    {
      title: "Corrientes Débiles y Sistemas Especiales",
      description:
        "Instalación de cableado estructurado, control de accesos, CCTV, BMS y sistemas especiales para entornos comerciales e industriales.",
      image: "/services/corrientes.png",
    },
  ];

  return (
    <section className="bg-gray-200 py-20" id="services">
      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Nuestros servicios
        </h2>

        {/* Intro */}
        <p className="text-gray-600 mb-12 max-w-3xl">
          Brindamos soluciones eléctricas integrales para proyectos industriales,
          comerciales y de infraestructura, adaptadas a las necesidades de cada
          cliente.
        </p>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={240}
                className="object-cover w-full h-[200px]"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <a
            href="#contact"
            className="inline-block bg-yellow-400 text-white px-6 py-3 rounded-md hover:bg-yellow-300 transition"
          >
            Solicitar evaluación técnica
          </a>
        </div>
      </div>
    </section>
  );
}
