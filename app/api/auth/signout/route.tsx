import { NextResponse } from "next/server";
import { signOut } from "@/services/authService";

export async function POST() {
  try {
    await signOut();
    return NextResponse.json(
      { message: "User signed out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to sign out " + error },
      { status: 500 }
    );
  }
}
