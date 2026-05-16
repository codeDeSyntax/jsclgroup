"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";

import { loginAdmin } from "@/lib/auth";
import { useAuth } from "@/components/auth-provider";
import HeroBackgroundArt from "@/components/hero-background-art";
import HeroMeshPattern from "@/components/hero-mesh-pattern";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setToken, isAuthenticated, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("webkat49@gmail.com");
  const [password, setPassword] = useState("developer123");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.replace("/admin");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginAdmin(email, password);

      if (result.success && result.tokens) {
        await setToken(result.tokens);
        toast({
          title: "Welcome back",
          description: "You have been signed in to the admin dashboard.",
        });
        router.replace("/admin");
        return;
      }

      toast({
        title: "Login failed",
        description: result.error || "Check your credentials and try again.",
        variant: "destructive",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden  text-black">
      <HeroBackgroundArt variant="light" />
      {/* <HeroMeshPattern
        holes={[
          { x: 24, y: 28, r: 12 },
          { x: 72, y: 70, r: 14 },
        ]}
        colorClass="text-jcl-primary/12"
        className="opacity-90"
      /> */}
      {/* logo */}
      <Image
        src="https://res.cloudinary.com/dlhyawc5e/image/upload/v1778910277/logo_wrfy8c.png"
        alt="JCL Logo"
        width={120}
        height={40}
        className="absolute h-12 w-10 top-4 left-4 opacity-90"
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-[28rem]  backdrop-blur-md sm:p-8">
          <div className="mb-6 space-y-2 text-center">
            <h2 className="text-3xl font-black tracking-[-0.07em] text-black sm:text-4xl">
              Welcome back
            </h2>
            <p className="text-sm leading-6 text-black/55">
              Sign in to continue managing your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-black/70"
              >
                <Mail className="h-4 w-4 text-black/45" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 rounded-2xl border-black/10 bg-white/90 text-black placeholder:text-black/35 focus-visible:ring-jcl-primary"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-black/70"
              >
                <LockKeyhole className="h-4 w-4 text-black/45" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 rounded-2xl border-black/10 bg-white/90 text-black placeholder:text-black/35 focus-visible:ring-jcl-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-black/45">
            Secure admin access for JCL internal use.
          </p>
        </div>
      </div>
    </div>
  );
}
