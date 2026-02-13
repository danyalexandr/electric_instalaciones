"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Send, Check, Loader2, Mail, Phone, MapPin } from "lucide-react";


export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim()) return "El nombre es obligatorio.";
    if (!form.email.includes("@")) return "Ingrese un email válido.";
    if (form.message.trim().length < 10)
      return "El mensaje debe tener al menos 10 caracteres.";
    if (form.phone && form.phone.length < 6)
      return "El teléfono ingresado no es válido.";
    return "";
  }

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");
  setSuccess(false);

  const validationError = validate();
  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);

  const { error } = await supabase.from("contacts").insert([form]);

  setLoading(false);

  if (error) {
    setError("No se pudo enviar la consulta. Intente nuevamente.");
    return;
  }

  setSuccess(true);
  setForm({ name: "", email: "", phone: "", message: "" });
}


  return (
    <section className="bg-white py-24" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Contacto
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hablemos de tu proyecto
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Estamos listos para ayudarte con tu próximo proyecto eléctrico. Contáctanos y recibe una evaluación técnica sin costo.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                  <p className="text-gray-600">Buenos Aires, Argentina</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Phone className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                  <p className="text-gray-600">+54 11 ...</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Mail className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contacto@electricinstalaciones.com</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="mt-12 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100">
              <p className="text-gray-700 italic">
                "Notre équipe technique vous répond dans les 24 heures avec une évaluation détaillée de votre projet."
              </p>
              <p className="text-sm text-gray-500 mt-2">— Equipo técnico</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan Pérez"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-gray-50"
                />
              </div>

              {/* Email y Teléfono */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="juan@email.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+54 9 11 1234 5678"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-gray-50"
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe tu proyecto o consulta..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-gray-50 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Cuanto más detalle nos brindes, mejor podremos ayudarte.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">
                    {error}
                  </p>
                </div>
              )}

              {/* Éxito */}
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-medium">
                      Gracias por su consulta. Nuestro equipo se comunicará a la brevedad.
                    </p>
                  </div>
                </div>
              )}

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Solicitar evaluación técnica</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
