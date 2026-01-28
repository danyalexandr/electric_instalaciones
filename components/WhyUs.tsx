export default function WhyUs() {
  const reasons = [
    "Experiencia en entornos críticos",
    "Cumplimiento de normas de seguridad",
    "Soluciones a medida",
    "Personal técnico capacitado",
  ];

  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        ¿Por qué elegirnos?
      </h2>

      <ul className="max-w-3xl mx-auto space-y-4 text-gray-300">
        {reasons.map((reason, i) => (
          <li key={i}>✔ {reason}</li>
        ))}
      </ul>
    </section>
  );
}
