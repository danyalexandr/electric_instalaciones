"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Quote = {
  id: number;
  name: string;
  email: string;
  phone: string;
  items: any; // array de productos
  created_at: string;
  status: string;
};

export default function QuotesSection() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setQuotes(data);
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-600 text-left">
          <tr>
            <th className="p-4">Fecha</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Email</th>
            <th className="p-4">Estado</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <>
              <tr
                key={quote.id}
                onClick={() =>
                  setExpanded(expanded === quote.id ? null : quote.id)
                }
                className="border-b border-gray-800 hover:bg-gray-800 cursor-pointer"
              >
                <td className="p-4">
                  {new Date(quote.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">{quote.name}</td>
                <td className="p-4">{quote.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500 text-black rounded text-xs">
                    {quote.status || "new"}
                  </span>
                </td>
              </tr>

              {expanded === quote.id && (
                <tr className="bg-black">
                  <td colSpan={4} className="p-4">
                    <div className="space-y-2">
                      <p className="text-gray-400">
                        Teléfono: {quote.phone}
                      </p>

                      <div>
                        <p className="text-yellow-400 mb-2">
                          Productos solicitados:
                        </p>

                        {quote.items?.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between text-gray-300"
                            >
                              <span>{item.title}</span>
                              <span>x{item.quantity}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {quotes.length === 0 && (
        <p className="p-6 text-gray-500">
          No hay cotizaciones aún.
        </p>
      )}
    </div>
  );
}
