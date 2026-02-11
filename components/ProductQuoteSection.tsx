"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: string;
  name: string;
  category: string;
};

type SelectedProduct = {
  productId: string;
  name: string;
  quantity: number;
};

export default function ProductQuoteSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase
        .from("products")
        .select("id, name, category")
        .eq("active", true)
        .order("category");

      setProducts(data || []);
    }

    loadProducts();
  }, []);

  function addProduct(product: Product) {
    setSelected((prev) => {
      const existing = prev.find((p) => p.productId === product.id);

      if (existing) {
        return prev.map((p) =>
          p.productId === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          quantity: 1,
        },
      ];
    });
  }

  function updateQuantity(productId: string, qty: number) {
    setSelected((prev) =>
      prev
        .map((p) => (p.productId === productId ? { ...p, quantity: qty } : p))
        .filter((p) => p.quantity > 0),
    );
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitQuote() {
    if (selected.length === 0) return;

    setSending(true);

    // 1️⃣ crear cotización
    const { data: quote, error } = await supabase
      .from("quotes")
      .insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      setSending(false);
      return;
    }

    // 2️⃣ items
    const items = selected.map((item) => ({
      quote_id: quote.id,
      product_id: item.productId,
      quantity: item.quantity,
    }));

    await supabase.from("quote_items").insert(items);

    // 3️⃣ reset
    setSuccess(true);
    setSelected([]);
    setForm({ name: "", email: "", phone: "", notes: "" });
    setSending(false);
  }

  return (
    <section className="bg-gray-200 py-20">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
        {/* LISTA DE PRODUCTOS */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Cotización de productos
          </h2>

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>

              <button
                onClick={() => addProduct(product)}
                className="px-4 py-2 bg-yellow-400 text-black rounded-md text-sm"
              >
                Agregar
              </button>
            </div>
          ))}
        </div>

        {/* RESUMEN */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 h-fit">
          <h3 className="font-semibold text-gray-900 mb-4">
            Resumen de cotización
          </h3>

          {selected.length === 0 && (
            <p className="text-sm text-gray-900">
              No hay productos seleccionados.
            </p>
          )}

          {selected.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center mb-3 text-gray-900"
            >
              <span className="text-sm">{item.name}</span>

              <input
                type="number"
                min={0}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.productId, Number(e.target.value))
                }
                className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          ))}

          {selected.length > 0 && (
            <div className="mt-6 space-y-4 text-gray-900">
              <input
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />

              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />

              <input
                placeholder="Teléfono"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />

              <textarea
                placeholder="Observaciones"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />

              <button
                onClick={submitQuote}
                disabled={sending}
                className="w-full bg-yellow-400 py-3 rounded font-medium"
              >
                {sending ? "Enviando..." : "Solicitar cotización"}
              </button>

              {success && (
                <p className="text-green-600 text-sm">
                  Cotización enviada correctamente.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
