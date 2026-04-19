"use client";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Button,
  Card,
  Container,
  Input,
  Label
} from "@/components/ui";


const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});



export default function SignupPage() {

  const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  });
  
  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors ,isSubmitting } } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, password } = data;
    setAuthError(null);
    setAuthSuccess(null);
    const signup = await supabase.auth.signUp({
      email,
      password,
    })
    if (signup.error) {
      setAuthError(signup.error.message);
      return;
    } 
   setAuthSuccess("Check your email to confirm your account")
};

  return (
    <main className="relative pb-16 pt-10 md:pb-24 md:pt-14">
      <Container className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="text-xs font-medium tracking-wide text-white/55">
              Join
            </div>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
              Start finding serious music collaborators.
            </p>
          </div>

          <Card className="mt-9 p-7 sm:p-8">
            <form className="space-y-5"  onSubmit={handleSubmit(onSubmit)}  noValidate>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  {...register("email")}
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  {...register("password")}
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password-confirm">Confirm password</Label>
                <Input
                  {...register("passwordConfirm")}
                  id="signup-password-confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                {errors.passwordConfirm && <p className="text-sm text-red-400">{errors.passwordConfirm.message}</p>}
              </div>
              <div className="mt-8">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
              {authError && <p className="mt-3 text-sm text-red-400">{authError}</p>}
              {authSuccess && <p className="mt-3 text-sm text-green-400">{authSuccess}</p>}
            </div>
            </form>

            
            <p className="mt-6 text-center text-sm text-white/55">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white/85 underline decoration-white/20 underline-offset-4 transition hover:decoration-white/40"
              >
                Sign in
              </Link>
            </p>
          </Card>

          <p className="mt-8 text-center text-xs text-white/40">
            Built for creators who actually make things.
          </p>
        </div>
      </Container>
    </main>
  );
}
