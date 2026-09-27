"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { FloralDecor } from "@/components/ui/FloralDecor";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("admin@aadhipasting.com");
  const [password, setPassword] = useState("AadhiAdmin2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Login failed. Please check credentials.");
        setLoading(false);
        return;
      }

      // Successful login
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setError("Network or server error during sign in.");
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@aadhipasting.com");
    setPassword("AadhiAdmin2026!");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14030A] via-[#1A040D] to-[#0D0206] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans text-[#FAF7F2]">
      {/* Subtle background ambient specular halos */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#55122C]/25 blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Back to website button */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#FAF6EE]/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 hover:border-[#C5A059]/60"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Return to Atelier</span>
        </Link>

        <span className="text-[11px] font-mono text-[#E5DFC5]/80 flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-[#C5A059]/30">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Secure Executive Portal
        </span>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md bg-[#1A040D]/90 backdrop-blur-2xl rounded-3xl border border-[#C5A059]/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 sm:p-10 relative z-10">
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#14030A] border border-[#C5A059]/40 text-[#E5C158] mb-3 shadow-inner">
            <FloralDecor variant="crest" className="w-8 h-8" />
          </div>
          <div className="flex items-center justify-center gap-1.5 font-serif font-bold text-2xl text-white">
            <span>AADHI</span>
            <span className="text-[#E5C158]">PASTING</span>
          </div>
          <p className="text-xs uppercase tracking-widest font-semibold text-[#E5DFC5]/70 mt-1">
            Executive Admin Control Center
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-medium flex items-center gap-2 animate-shake">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#E5DFC5]/90">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C5A059]/60">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aadhipasting.com"
                className="w-full pl-10 pr-4 py-3 bg-[#14030A]/90 border border-[#C5A059]/30 rounded-xl text-sm text-white placeholder-[#8E8A9B] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E5DFC5]/90">
                Secure Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C5A059]/60">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 bg-[#14030A]/90 border border-[#C5A059]/30 rounded-xl text-sm text-white placeholder-[#8E8A9B] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#E5DFC5]/50 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 btn-burgundy-gold text-white rounded-xl text-sm font-semibold tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:translate-y-[-1px] active:translate-y-[0px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#E5C158]" />
                <span>Authenticating Session...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1 text-[#E5C158]" />
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Helper */}
        <div className="mt-6 pt-5 border-t border-[#C5A059]/25 text-center">
          <div className="bg-[#14030A]/90 rounded-xl p-3.5 border border-[#C5A059]/30 text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5C158]">
                Default Administrator
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158] hover:underline"
              >
                Fill Credentials
              </button>
            </div>
            <div className="font-mono text-[11px] text-[#E5DFC5]/80 space-y-0.5">
              <p>Email: <span className="text-white font-medium">admin@aadhipasting.com</span></p>
              <p>Pass: <span className="text-white font-medium">AadhiAdmin2026!</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Security badge footer */}
      <div className="mt-6 text-center text-xs text-[#E5DFC5]/60 flex items-center gap-2 z-10">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Hardware-grade PBKDF2 cryptography & encrypted HTTP-only session tokens</span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#14030A] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
