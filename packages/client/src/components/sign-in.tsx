"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function SignInForm() {
  const [method, setMethod] = useState<"password" | "magic-link">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          setLoading(false);
          setMessage({ type: "error", text: ctx.error.message });
        },
      },
    );
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/",
    });

    setLoading(false);
    if (error) {
      setMessage({
        type: "error",
        text: error.message || "cant sign in, please try again",
      });
    } else {
      setMessage({
        type: "success",
        text: "Magic link sent! Check your inbox.",
      });
    }
  };

  return (
    <div className="px-15 py-20 mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        <button
          type="button"
          onClick={() => setMethod("password")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
            method === "password"
              ? "bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setMethod("magic-link")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
            method === "magic-link"
              ? "bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Magic Link
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-md p-3 text-sm ${
            message.type === "error"
              ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
              : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {method === "password" ? (
        <form onSubmit={handlePasswordSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In with Password"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send Magic Link"}
          </button>
        </form>
      )}
    </div>
  );
}
