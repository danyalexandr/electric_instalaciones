"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";


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
    <section className="bg-gray-200 py-20" id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Contacto
        </h2>

        <p className="text-gray-600 mb-10">
          Solicite una evaluación técnica o presupuesto. Nos comunicaremos a la
          brevedad.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 rounded-lg p-8 space-y-6"
        >
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">
              Cuanto más detalle nos brindes, mejor podremos ayudarte.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-white px-6 py-3 rounded-md hover:bg-yellow-300 disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Solicitar evaluación técnica"}
          </button>

          {/* Éxito */}
          {success && (
            <p className="text-green-600 text-sm mt-4">
              Gracias por su consulta. Nuestro equipo se comunicará a la brevedad.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
