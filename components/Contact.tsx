"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
      );
      setSent(true);
      form.reset();
    } catch (error) {
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <section id="contacto" className="min-h-screen pt-32 flex flex-col justify-center items-center text-center px-6 bg-gray-200">
      <h2 className="text-gray-600 3xl font-bold text-center mb-8">Contacto</h2>

      <form onSubmit={sendEmail} className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
          className="w-full p-3 bg-white border border-gray-300 rounded text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 bg-white border border-gray-300 rounded text-black"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          required
          className="w-full p-3 bg-white border border-gray-300 rounded text-black"
        />

        <textarea
          name="message"
          placeholder="Mensaje"
          required
          className="w-full p-3 bg-white border border-gray-300 rounded text-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-while font-semibold py-3 rounded hover:bg-orange-400 transition disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar consulta"}
        </button>

        {sent && (
          <p className="text-orange-500 text-center">
            Mensaje enviado correctamente.
          </p>
        )}
      </form>
    </section>
  );
}
