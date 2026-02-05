import { services } from "@/data/services";

export default function Services() {
  return (
    <section className="bg-gray-100 py-20" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
          Servicios
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col"
            >
              <div className="h-40 bg-gray-300">
                {/* imagen de referencia */}
                {/* luego puede ser <Image /> */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col gap-3">
                <h3 className="font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
