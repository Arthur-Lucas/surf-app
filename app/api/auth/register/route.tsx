import { NextResponse } from "next/server";
import { signUp } from "@/services/authService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();
    const user = await signUp(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Registration successful", user });
  } catch (error: unknown) {
    // Utilisation du type 'unknown' pour l'erreur
    if (error instanceof Error) {
      // Vérification du type d'erreur
      const status = (error as { status?: number }).status || 500;
      return NextResponse.json(
        { error: error.message || "Internal server error" },
        { status }
      );
    }

    // Cas où l'erreur ne serait pas une instance d'Error
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
