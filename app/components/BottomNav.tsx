"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-zinc-900 to-black text-white px-6 py-3 rounded-full flex gap-8 items-center shadow-lg z-50">
      <Link
        href="/map"
        className={`transition font-medium text-base ${
          pathname === "/map" ? "opacity-100" : "opacity-60 hover:opacity-100"
        }`}
      >
        Carte
      </Link>

      <Link
        href="/spotList"
        className={`transition font-medium text-base ${
          pathname === "/spotList"
            ? "opacity-100"
            : "opacity-60 hover:opacity-100"
        }`}
      >
        Spots
      </Link>

      <button
        onClick={handleLogout}
        className="transition font-medium text-base opacity-60 hover:opacity-100"
      >
        Déconnexion
      </button>
    </nav>
  );
}
