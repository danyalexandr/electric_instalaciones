"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const services = [
  {
    title: "Instalaciones Industriales y Hospitalarias",
    description:
      "Tendido de alimentadores, tableros seccionales y sistemas eléctricos para entornos críticos.",
    image: "/services/industrial.png",
  },
  {
    title: "Instalaciones Comerciales y Domiciliarias",
    description:
      "Soluciones eléctricas seguras y eficientes para comercios y viviendas.",
    image: "/services/comercial.png",
  },
  {
    title: "Automatización e Iluminación",
    description:
      "Sistemas DALI, Lutron y automatización integral de edificios.",
    image: "/services/automatizacion.png",
  },
  {
    title: "Corrientes Débiles y BMS",
    description:
      "Cableado estructurado, CCTV, control de accesos y sistemas BMS.",
    image: "/services/corrientes.png",
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let isPaused = false;

    const onEnter = () => (isPaused = true);
    const onLeave = () => (isPaused = false);

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    const interval = setInterval(() => {
      if (!isPaused) {
        scrollAmount += 1;
        container.scrollLeft = scrollAmount;

        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    }, 20);

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="servicios" className="py-20 bg-gray-200 px-6">
      <h2 className="text-gray-600 3xl font-bold text-center mb-12">Servicios</h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden md:overflow-hidden overflow-x-auto touch-pan-x max-w-6xl mx-auto"
      >
        {[...services, ...services].map((service, i) => (
          <div
            key={i}
            className="min-w-[320px] bg-white border border-gray-300 rounded-lg overflow-hidden"
          >
            <div className="h-48 relative">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
