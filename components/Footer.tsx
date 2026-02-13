export default function Footer() {
  return (
    <footer className="bg-gray-400 border-t border-gray-500">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-700">
        {/* Empresa */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Electric Instalaciones SRL
          </h3>
          <p>
            Soluciones eléctricas para industria, comercio e infraestructura.
          </p>
        </div>

        {/* Servicios */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Servicios
          </h3>
          <ul className="space-y-1">
            <li>Instalaciones industriales</li>
            <li>Automatización de edificios</li>
            <li>Iluminación y distribución</li>
            <li>Corrientes débiles</li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Contacto
          </h3>
          <ul className="space-y-1">
            <li>Buenos Aires, Argentina</li>
            <li>Tel: +54 …</li>
            <li>Email: contacto@…</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p>
            © {new Date().getFullYear()} Electric Instalaciones SRL
          </p>
          <p className="mt-2 text-xs text-gray-700">
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
