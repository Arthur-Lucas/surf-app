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
  } catch (error: any) {
    console.error("Registration error:", error);
    const status = error.status || 500;
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status }
    );
  }
}
