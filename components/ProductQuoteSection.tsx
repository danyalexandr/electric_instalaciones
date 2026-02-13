"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ShoppingCart, Plus, Minus, Trash2, Send, Check } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  function removeProduct(productId: string) {
    setSelected((prev) => prev.filter((p) => p.productId !== productId));
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

  // Get unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Productos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solicita tu cotización
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona los productos que necesitas y solicita una cotización personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LISTA DE PRODUCTOS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category === "all" ? "Todos" : category}
                </button>
              ))}
            </div>

            {/* Products grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>

                  <button
                    onClick={() => addProduct(product)}
                    className="ml-3 p-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors flex-shrink-0"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RESUMEN */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 h-fit shadow-xl sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">
                Resumen de cotización
              </h3>
            </div>

            {selected.length === 0 && (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  No hay productos seleccionados.
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Agrega productos del catálogo
                </p>
              </div>
            )}

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {selected.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => removeProduct(item.productId)}
                      className="p-1 text-red-500 hover:text-red-700 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selected.length > 0 && (
              <div className="mt-6 space-y-4 pt-6 border-t border-gray-200">
                <input
                  placeholder="Nombre completo *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                />

                <input
                  placeholder="Email *"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                />

                <input
                  placeholder="Teléfono"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                />

                <textarea
                  placeholder="Observaciones adicionales"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
                  rows={3}
                />

                <button
                  onClick={submitQuote}
                  disabled={sending || !form.name || !form.email}
                  className="w-full bg-yellow-400 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {sending ? (
                    <>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Solicitar cotización</span>
                    </>
                  )}
                </button>

                {success && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <Check className="w-5 h-5" />
                    <p className="text-sm font-medium">
                      Cotización enviada correctamente. Te contactaremos pronto.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
