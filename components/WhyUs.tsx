export default function WhyUs() {
  const reasons = [
    {
      title: "Experiencia en entornos críticos",
      description:
        "Proyectos en industrias, centros de salud y entornos donde la continuidad eléctrica es clave.",
    },
    {
      title: "Cumplimiento normativo y seguridad",
      description:
        "Trabajamos bajo normas vigentes, priorizando la seguridad de personas e instalaciones.",
    },
    {
      title: "Soluciones técnicas a medida",
      description:
        "Cada proyecto se analiza y diseña según las necesidades reales del cliente.",
    },
    {
      title: "Equipo técnico capacitado",
      description:
        "Personal calificado con experiencia en instalaciones complejas y sistemas especiales.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white border border-gray-300 rounded-lg p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
