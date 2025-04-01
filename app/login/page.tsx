"use client";

import { LoginForm } from "@/components/common/login-form";

export default function Login() {
  function handleLogin(email: string, password: string) {
    console.log("Login attempt:", email, password);
    // Ici, tu peux appeler ton API d'authentification
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
