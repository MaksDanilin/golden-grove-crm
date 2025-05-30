// Instructions: Update root layout to include AuthProvider

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Golden Grove CRM - Premium Beverage Distribution Management",
  description:
    "Internal CRM system for Golden Grove premium beverage company. Manage distributors, track orders, and optimize sales operations.",
  keywords:
    "CRM, Golden Grove, beverage distribution, sales management, order tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-grove-50`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "white",
              border: "1px solid rgb(233, 236, 239)",
              color: "rgb(87, 95, 105)",
            },
          }}
        />
      </body>
    </html>
  );
}
