"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Lock,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { BusinessSettings } from "@/lib/db/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    setSettingsMsg(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsMsg({ type: "success", text: "Business details and contacts successfully updated." });
      } else {
        setSettingsMsg({ type: "error", text: data.error || "Failed to update business settings." });
      }
    } catch (err) {
      setSettingsMsg({ type: "error", text: "Network error saving settings." });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "New password must be at least 8 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch("/api/admin/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordMsg({ type: "success", text: "Admin password successfully changed!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({ type: "error", text: data.error || "Failed to change password." });
      }
    } catch (err) {
      setPasswordMsg({ type: "error", text: "Server error changing password." });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-3 border-[#D94F83]/30 border-t-[#D94F83] rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-semibold text-[#8E8A9B]">
          Loading settings & credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.05)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D94F83] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F6DCE5]">
              System Configuration
            </span>
            <span className="text-xs text-[#8E8A9B]">•</span>
            <span className="text-xs text-[#686474]">Security & Business Contact Info</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#33313A] tracking-tight">
            Settings & Security
          </h1>
          <p className="text-xs sm:text-sm text-[#686474] mt-1 font-light">
            Manage official plant contact lines, WhatsApp inquiries routing, and administrator credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Business Settings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.04)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F6DCE5]">
              <Building className="w-4 h-4 text-[#D94F83]" />
              <h2 className="font-serif font-bold text-lg text-[#33313A]">
                Company & Contact Details
              </h2>
            </div>

            {settingsMsg && (
              <div
                className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
                  settingsMsg.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {settingsMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{settingsMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Brand Name</label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Official Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Phone Display</label>
                  <input
                    type="text"
                    value={settings.phoneDisplay}
                    onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">WhatsApp Number (Intl format)</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    placeholder="919080867822"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#33313A]">Default WhatsApp Inquiries Message</label>
                  <input
                    type="text"
                    value={settings.whatsappMessage}
                    onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#33313A]">Street Address</label>
                  <input
                    type="text"
                    value={settings.address.street}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        address: { ...settings.address, street: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">City / Hub</label>
                  <input
                    type="text"
                    value={settings.address.city}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        address: { ...settings.address, city: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Operating Hours</label>
                  <input
                    type="text"
                    value={settings.workingHours}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-5 py-2.5 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? "Updating..." : "Save Business Info"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Security & Password */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.04)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F6DCE5]">
              <KeyRound className="w-4 h-4 text-[#D94F83]" />
              <h2 className="font-serif font-bold text-lg text-[#33313A]">
                Change Admin Password
              </h2>
            </div>

            {passwordMsg && (
              <div
                className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
                  passwordMsg.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {passwordMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Current Password *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter existing password"
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">New Password (min 8 chars) *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Confirm New Password *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[#686474] hover:text-[#D94F83] flex items-center gap-1.5"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? "Hide Passwords" : "Show Passwords"}</span>
                </button>

                <button
                  type="submit"
                  disabled={changingPassword}
                  className="px-5 py-2 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  {changingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>

          {/* Security Information Box */}
          <div className="bg-[#FFF1F5]/80 p-5 rounded-3xl border border-[#F6DCE5] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#33313A]">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Server-Side Security Specifications</span>
            </div>
            <ul className="text-[11px] text-[#686474] space-y-1.5 list-disc pl-4 font-mono">
              <li>PBKDF2 Cryptographic Salting (100,000 rounds sha512)</li>
              <li>Encrypted 24-hour HTTP-only session cookies</li>
              <li>Thread-safe atomic JSON file persistence</li>
              <li>Role-based route protection via Edge Middleware</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
