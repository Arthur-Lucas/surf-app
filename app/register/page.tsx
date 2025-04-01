"use client";

import { RegisterForm } from "@/components/common/register-form";

export default function Register() {
  function handleRegister(
    email: string,
    password: string,
    confirmPassword: string
  ) {
    console.log("Login attempt:", email, password, confirmPassword);
    // Ici, tu peux appeler ton API d'authentification
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
}
