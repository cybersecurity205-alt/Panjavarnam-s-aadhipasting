import React from "react";
import { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Control Center | Aadhi Pasting",
  description: "Administrative console for managing products, categories, enquiries, orders, and content for Aadhi Pasting.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
