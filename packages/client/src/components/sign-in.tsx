import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Input, Label } from "./catalyst/input";
import { Button } from "./catalyst/button";

export function SignInForm() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async () => {
    setLoading(true);
    setError(null);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    setLoading(false);
    if (error) {
      setError(error.message ?? "Couldn't send the code. Try again.");
      return;
    }
    setStep("otp");
  };

  const verifyCode = async () => {
    setLoading(true);
    setError(null);

    await authClient.signIn.emailOtp(
      { email, otp },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => setLoading(false),
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-white/40 bg-white/70 backdrop-blur-2xl p-8 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-600">
          {step === "email"
            ? "Enter your email and we'll send you a one-time code."
            : `Enter the code we sent to ${email}.`}
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {step === "email" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendCode();
          }}
          className="space-y-1"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Sending code..." : "Send code"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyCode();
          }}
          className="space-y-1"
        >
          <div>
            <Label htmlFor="otp">One-time code</Label>
            <Input
              id="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Verifying..." : "Verify & sign in"}
          </Button>

          <button
            type="button"
            onClick={() => {
              setStep("email");
              setOtp("");
              setError(null);
            }}
            className="mt-3 w-full text-center text-xs font-medium text-emerald-700 hover:underline"
          >
            Use a different email
          </button>
        </form>
      )}
    </div>
  );
}
