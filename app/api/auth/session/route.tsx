import { NextResponse } from "next/server";
import { getUser } from "@/services/authService";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve user " + error },
      { status: 500 }
    );
  }
}
