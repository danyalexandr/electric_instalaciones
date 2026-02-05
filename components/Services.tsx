"use client";

import { useState } from "react";
import { services } from "@/data/services";
import ServiceModal from "./ServiceModal";

export default function Services() {
  const [selected, setSelected] = useState<any>(null);

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
              onClick={() => setSelected(service)}
              className="bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 transition"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.shortDescription}
                </p>
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
