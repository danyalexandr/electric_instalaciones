"use client";

import { useState } from "react";
import { services } from "@/data/services";
import ServiceModal from "./ServiceModal";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section className="bg-white py-24" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Nuestros servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Soluciones integrales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Brindamos servicios eléctricos de alta calidad para industria, comercio y proyectos de infraestructura.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelected(service)}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>
                
                {/* Learn more link */}
                <div className="flex items-center gap-2 text-yellow-500 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>Ver más</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <ServiceModal
          service={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
