"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoginModal from "../LoginModal";
import ContactsSection from "@/components/ContactsSection";
import QuotesSection from "@/components/QuotesSection";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [tab, setTab] = useState<"contacts" | "quotes">("contacts");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return <LoginModal />;
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Panel de Administración
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("contacts")}
          className={`px-4 py-2 rounded ${
            tab === "contacts"
              ? "bg-yellow-500 text-black"
              : "bg-gray-200"
          }`}
        >
          Contactos
        </button>

        <button
          onClick={() => setTab("quotes")}
          className={`px-4 py-2 rounded ${
            tab === "quotes"
              ? "bg-yellow-500 text-black"
              : "bg-gray-200"
          }`}
        >
          Cotizaciones
        </button>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 underline"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Secciones */}
      {tab === "contacts" && <ContactsSection />}
      {tab === "quotes" && <QuotesSection />}
    </section>
  );
}
