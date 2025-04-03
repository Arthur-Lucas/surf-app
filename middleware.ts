import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware exécuté pour :", request.nextUrl.pathname);

  // 🔥 Récupère les cookies de la requête
  const sessionCookie = request.cookies.get(
    "sb-bzfgwmfvdthffsbtpykj-auth-token"
  )?.value; // 🔹 Adapté selon ton auth

  const isAuthenticated = Boolean(sessionCookie);
  console.log("Utilisateur connecté ?", isAuthenticated);

  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/adminPanel")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/adminPanel/:path*", // ✅ Middleware exécuté uniquement pour /adminPanel et ses sous-pages
};
