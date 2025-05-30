"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user, crmUser } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user && crmUser) {
      router.push("/dashboard");
    }
  }, [user, crmUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error("Login failed", {
          description: error.message,
        });
      } else {
        toast.success("Welcome back!", {
          description: "You have been successfully logged in.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-golden-50 to-grove-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Branding */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 golden-gradient rounded-xl flex items-center justify-center mb-4">
            <span className="text-golden-900 font-bold text-xl">GG</span>
          </div>
          <h1 className="text-3xl font-bold text-grove-900">
            Golden Grove CRM
          </h1>
          <p className="text-grove-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="border-grove-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-grove-900">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access the CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-grove-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sarah@goldengrove.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-grove-200 focus:ring-golden-400 focus:border-golden-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-grove-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-grove-200 focus:ring-golden-400 focus:border-golden-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-grove-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-grove-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full golden-gradient hover:bg-golden-500 text-golden-900 font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-golden-900 border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-grove-200 bg-grove-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-grove-900 mb-2">
              Demo Credentials
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-grove-600">Admin:</span>
                <span className="font-mono text-grove-800">
                  admin@goldengrove.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-grove-600">Sales Rep:</span>
                <span className="font-mono text-grove-800">
                  sales@goldengrove.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-grove-600">Password:</span>
                <span className="font-mono text-grove-800">password123</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-grove-500">
          <p>Golden Grove Premium Beverages</p>
          <p>Internal CRM System</p>
        </div>
      </div>
    </div>
  );
}
