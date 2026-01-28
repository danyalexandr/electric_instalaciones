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
        "service_bbx1e4k",
        "template_3olmmua",
        form,
        "B0LWo3aUbmUTjgYop"
      );
      setSent(true);
      form.reset();
    } catch (error) {
      alert("Error al enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-zinc-900 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Contacto
      </h2>

      <form
        onSubmit={sendEmail}
        className="max-w-xl mx-auto space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
          className="w-full p-3 bg-black border border-zinc-700 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 bg-black border border-zinc-700 rounded"
        />
        <textarea
          name="message"
          placeholder="Mensaje"
          required
          className="w-full p-3 bg-black border border-zinc-700 rounded h-32"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-black font-semibold py-3 rounded hover:bg-orange-400 transition disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar consulta"}
        </button>

        {sent && (
          <p className="text-green-500 text-center">
            Mensaje enviado correctamente.
          </p>
        )}
      </form>
    </section>
  );
}
