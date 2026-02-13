"use client";

import { useEffect, useState } from "react";
import { Fragment } from "react";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: string;
  name: string;
  category: string;
};

type QuoteItem = {
  id: string;
  quantity: number;
  product: Product;
};

type Quote = {
  id: string; // uuid
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  quote_items: QuoteItem[];
};

export default function QuotesSection() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    const { data, error } = await supabase
      .from("quotes")
      .select(`
        id,
        name,
        email,
        phone,
        status,
        created_at,
        quote_items (
          id,
          quantity,
          product:products (
            id,
            name,
            category
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Map quote_items.product from array to single object
      const mappedQuotes = data.map((quote: any) => ({
        ...quote,
        quote_items: quote.quote_items?.map((item: any) => ({
          ...item,
          product: Array.isArray(item.product) ? item.product[0] : item.product,
        })) ?? [],
      }));
      setQuotes(mappedQuotes);
    } else {
      console.error(error);
    }
  }

  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-300 text-left">
          <tr>
            <th className="p-4">Fecha</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Email</th>
            <th className="p-4">Estado</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <Fragment key={quote.id}>
              <tr
                onClick={() =>
                  setExpanded(expanded === quote.id ? null : quote.id)
                }
                className="border-gray-400 hover:bg-gray-400 cursor-pointer"
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
                <tr className="bg-white border-t border-gray-300">
                  <td colSpan={4} className="p-4">
                    <div className="space-y-2">
                      <p className="text-gray-900">
                        Teléfono: {quote.phone}
                      </p>

                      <div>
                        <p className="text-gray-900 mb-2">
                          Productos solicitados:
                        </p>

                        {quote.quote_items?.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-gray-500"
                          >
                            <span>{item.product?.name}</span>
                            <span>x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
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
