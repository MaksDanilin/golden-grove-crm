"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, crmUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-grove-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 golden-gradient rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-golden-900 font-bold text-xl">GG</span>
          </div>
          <div className="w-8 h-8 border-2 border-golden-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-grove-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user || !crmUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-grove-50">
      <Sidebar user={crmUser} />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
