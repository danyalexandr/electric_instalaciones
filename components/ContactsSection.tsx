"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  status: string;
};

export default function ContactsSection() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function updateStatus(id: number, status: string) {
    await supabase
      .from("contacts")
      .update({ status })
      .eq("id", id);

    fetchContacts();
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Cargando contactos...</p>;
  }

  return (
    <div className="space-y-6">
      {contacts.length === 0 && (
        <p className="text-gray-500">No hay mensajes.</p>
      )}

      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white border border-gray-300 rounded-lg p-6 space-y-3"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900">
                {contact.name}
              </h3>
              <p className="text-sm text-gray-600">
                {contact.email} {contact.phone && `• ${contact.phone}`}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                contact.status === "new"
                  ? "bg-yellow-100 text-yellow-800"
                  : contact.status === "read"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {contact.status}
            </span>
          </div>

          <p className="text-gray-700 text-sm whitespace-pre-line">
            {contact.message}
          </p>

          <div className="flex gap-3 pt-2">
            {contact.status === "new" && (
              <button
                onClick={() => updateStatus(contact.id, "read")}
                className="text-xs px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Marcar como leído
              </button>
            )}

            {contact.status !== "responded" && (
              <button
                onClick={() => updateStatus(contact.id, "responded")}
                className="text-xs px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Marcar como respondido
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
