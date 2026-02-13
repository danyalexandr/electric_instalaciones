"use client";

import Image from "next/image";
import { X, ArrowRight } from "lucide-react";

export default function ServiceModal({ service, onClose }: any) {
  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200"
      onClick={onClose} // clic fuera cierra
    >
      {/* Modal */}
      <div
        className="bg-white w-full max-w-2xl rounded-2xl relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-colors shadow-lg"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagen */}
        <div className="relative h-56 md:h-72 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-3xl font-bold text-white mb-2">
              {service.title}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                Servicio
              </span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8">
          <p className="text-gray-600 leading-relaxed text-lg">
            {service.description}
          </p>

          {/* Features if available */}
          {service.features && service.features.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">Características:</h4>
              <ul className="space-y-2">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
            >
              Solicitar presupuesto
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
