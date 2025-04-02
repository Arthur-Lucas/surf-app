import { NextResponse } from "next/server";
import { signIn } from "@/services/authService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();
    const user = await signIn(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Login successful", user });
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
