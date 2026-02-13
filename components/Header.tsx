"use client";

import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image 
              src="/logobg.png" 
              alt="Electric Instalaciones SRL" 
              width={48} 
              height={48}
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-gray-900 leading-tight">
                Electric Instalaciones
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                SRL
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#services" 
              className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-200"
            >
              Servicios
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-200"
            >
              Contacto
            </a>
            <a 
              href="/admin" 
              className="text-gray-700 hover:text-yellow-500 font-medium transition-colors duration-200"
            >
              Admin
            </a>
            <a 
              href="#contact"
              className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>Llámanos</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-yellow-500 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 space-y-3">
            <a 
              href="#services" 
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-yellow-500 font-medium py-2 transition-colors"
            >
              Servicios
            </a>
            <a 
              href="#contact" 
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-yellow-500 font-medium py-2 transition-colors"
            >
              Contacto
            </a>
            <a 
              href="/admin" 
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-yellow-500 font-medium py-2 transition-colors"
            >
              Admin
            </a>
            <a 
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Llámanos</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}


