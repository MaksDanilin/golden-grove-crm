// Instructions: Update sidebar to implement real sign out functionality

"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import type { User } from "@/lib/types";
import {
  BarChart3,
  Building2,
  Home,
  LogOut,
  MessageSquare,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Distributors", href: "/distributors", icon: Building2 },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Communications", href: "/communications", icon: MessageSquare },
  { name: "Sales Pipeline", href: "/pipeline", icon: TrendingUp },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Team", href: "/team", icon: Users },
];

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-grove-200">
      {/* Logo & Brand */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-grove-200">
        <div className="w-8 h-8 golden-gradient rounded-lg flex items-center justify-center">
          <span className="text-golden-900 font-bold text-sm">GG</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-grove-900">Golden Grove</span>
          <span className="text-xs text-grove-600">CRM System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-grove-200">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-golden-400 text-golden-900 text-xs">
              {user.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-grove-900 truncate">
              {user.full_name}
            </p>
            <p className="text-xs text-grove-600 truncate">
              {user.role === "admin" ? "Administrator" : "Sales Rep"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start gap-2 text-grove-600 hover:text-grove-900"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
