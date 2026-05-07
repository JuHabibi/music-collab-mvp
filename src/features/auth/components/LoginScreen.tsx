
"use client";

import { Button, Card, Container, Input, Label } from "@/components/ui";
import { supabaseClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export function LoginScreen() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { email, password } = formData;
  
    setAuthError(null);
    setAuthSuccess(null);
  
    const { error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  
    if (signInError) {
      setAuthError(signInError.message);
      return;
    }
  
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
  
    if (userError || !user) {
      setAuthError("Your session has expired. Please sign in again.");
      return;
    }
  
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("publish_status")
      .eq("id", user.id)
      .maybeSingle();
  
    if (profileError) {
      setAuthError(profileError.message);
      return;
    }
  
    setAuthSuccess("Welcome back.");
  
    router.push(profile?.publish_status === "published" ? "/artist/me" : "/onboarding");
    router.refresh();
  };

  return (
    <main className="relative pb-16 pt-10 md:pb-24 md:pt-14">
      <Container className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="text-xs font-medium tracking-wide text-white/55">
              Welcome
            </div>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
              Continue your collaborations.
            </p>
          </div>

          <Card className="mt-9 p-7 sm:p-8">
            <form
              className="space-y-5"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p className="text-sm text-red-400">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="login-password">Password</Label>
                  <button
                    type="button"
                    className="text-xs font-medium text-white/50 transition hover:text-white/75"
                  >
                    Forgot password
                  </button>
                </div>
                <Input
                  id="login-password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                {errors.password ? (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-8">
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </div>

              {authError ? (
                <p className="text-sm text-red-400">{authError}</p>
              ) : null}
              {authSuccess ? (
                <p className="text-sm text-green-400">{authSuccess}</p>
              ) : null}
            </form>

            <p className="mt-6 text-center text-sm text-white/55">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-white/85 underline decoration-white/20 underline-offset-4 transition hover:decoration-white/40"
              >
                Create one
              </Link>
            </p>
          </Card>
        </div>
      </Container>
    </main>
  );
}

