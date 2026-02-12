"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-gray-900 xl font-semibold mb-4">SOLO ADMIN</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 text-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 text-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 py-2 mt-4"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
