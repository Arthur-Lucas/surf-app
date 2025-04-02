"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Session data:", data);
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
      });
  }, []);

  const handleLogout = () => {
    setUser(null);
    fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Successfully signed out");
        } else {
          console.error("Error signing out");
        }
      })
      .catch(() => {});
    router.push("/login");
  };

  return (
    user && ( // Only show the nav if the user is logged in
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

        <Link
          href="/adminPanel"
          className={`transition font-medium text-base ${
            pathname === "/adminPanel"
              ? "opacity-100"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          Panel
        </Link>

        <button
          onClick={handleLogout}
          className="transition font-medium text-base opacity-60 hover:opacity-100"
        >
          Disconnect
        </button>
      </nav>
    )
  );
}
