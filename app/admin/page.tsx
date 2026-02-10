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
  status: string;
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
      },
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
    return <div className="p-8 text-gray-900">Cargando contactos…</div>;
  }

  function StatusBadge({ status }: { status: string }) {
    const styles = {
      new: "bg-yellow-100 text-yellow-800",
      read: "bg-gray-200 text-gray-700",
      replied: "bg-green-100 text-green-700",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded ${
          styles[status as keyof typeof styles]
        }`}
      >
        {status.toUpperCase()}
      </span>
    );
  }

  function exportToCSV() {
    const headers = [
      "Fecha",
      "Nombre",
      "Email",
      "Teléfono",
      "Mensaje",
      "Estado",
    ];

    const rows = contacts.map((c) => [
      new Date(c.created_at).toLocaleString(),
      c.name,
      c.email,
      c.phone,
      c.message.replace(/\n/g, " "),
      c.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell ?? ""}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `contacts-${Date.now()}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  async function markAsRead(id: number) {
    await supabase.from("contacts").update({ status: "read" }).eq("id", id);

    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "read" } : c)),
    );
  }

  const newCount = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-gray-900 2xl font-semibold">Panel de Contactos</h1>

        {newCount > 0 && (
          <span className="bg-yellow-400 text-black text-sm px-2 py-1 rounded-full">
            {newCount} nuevo{newCount > 1 ? "s" : ""}
          </span>
        )}

        <button
          onClick={exportToCSV}
          className="text-gray-900 sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          Exportar CSV
        </button>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 underline"
        >
          Cerrar sesión
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="text-gray-900">No hay contactos todavía.</p>
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
                <th className="p-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => c.status === "new" && markAsRead(c.id)}
                  className={`border-t cursor-pointer ${
                    c.status === "new" ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="p-3 text-gray-900">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-900">{c.name}</td>
                  <td className="p-3 text-gray-900">{c.email}</td>
                  <td className="p-3 text-gray-900">{c.phone}</td>
                  <td className="p-3 max-w-xs truncate text-gray-900">
                    {c.message}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={c.status} />
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
