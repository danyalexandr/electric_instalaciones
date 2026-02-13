import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Empresa */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/logobg.png" 
                alt="Electric Instalaciones SRL" 
                width={48} 
                height={48}
                className="w-12 h-12"
              />
              <div>
                <span className="font-bold text-lg block">Electric Instalaciones</span>
                <span className="text-sm text-gray-400">SRL</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Soluciones eléctricas profesionales para industria, comercio e infraestructura en Argentina.
            </p>
            
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-bold text-lg mb-6">Servicios</h3>
            <ul className="space-y-3">
              {[
                "Instalaciones industriales",
                "Automatización de edificios",
                "Iluminación y distribución",
                "Corrientes débiles",
                "Mantenimiento eléctrico",
                "Proyectos llave en mano",
              ].map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-3 h-3" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <a href="tel:+5491165446872" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  +54 9 11 6544 6872
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <a href="mailto:contacto@electricinstalaciones.com" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  contacto@electricinstalaciones.com
                </a>
              </li>
            </ul>

            {/* Working hours */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
              <h4 className="font-semibold mb-2">Horario de atención</h4>
              <p className="text-gray-400 text-sm">Lunes a Viernes: 8:00 - 18:00</p>
              <p className="text-gray-400 text-sm">Sábados: 9:00 - 13:00</p>
            </div>
          </div>

          {/* Newsletter */}
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Electric Instalaciones SRL. Todos los derechos reservados.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
