"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoginModal from "./LoginModal";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;

    async function fetchContacts() {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setContacts(data);
      }

      setLoading(false);
    }

    fetchContacts();
  }, [session]);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  // 🔒 No logueado → modal
  if (!session) {
    return <LoginModal />;
  }

  // ⏳ Cargando
  if (loading) {
    return (
      <div className="p-8 text-gray-900">
        Cargando contactos…
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-gray-900 2xl font-semibold">
          Panel de Contactos
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 underline"
        >
          Cerrar sesión
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="text-gray-900">
          No hay contactos todavía.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Teléfono</th>
                <th className="p-3 text-left">Mensaje</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="border-t hover:bg-gray-50 text-gray-900"
                >
                  <td className="p-3">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3 max-w-xs truncate">
                    {c.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
