"use client";

import Image from "next/image";

export default function ServiceModal({ service, onClose }: any) {
  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose} // clic fuera cierra
    >
      {/* Modal */}
      <div
        className="bg-white max-w-2xl w-full rounded-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Imagen */}
        <div className="relative h-56 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {service.title}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}
