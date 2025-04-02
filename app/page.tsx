"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
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
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
      });
  }, []);

  function handleSignOut() {
    fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          console.log("Successfully signed out");
        } else {
          console.error("Failed to sign out");
        }
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <nav className="w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 z-50">
        <h1 className="text-2xl font-bold">SurfSpots</h1>
        <div className="flex gap-4">
          {user ? (
            <Button className="hover:cursor-pointer" variant="default" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <>
              <Link className="hover:cursor-pointer" href="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link className="hover:cursor-pointer" href="/register">
                <Button variant="default">Register</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="flex flex-col items-center text-center px-8 gap-12 flex-grow pt-24">
        <Image
          src="/images/surf_oui.jpg"
          alt="Surf spot"
          width={1000}
          height={400}
          className="shadow-xl rounded-xl"
        />

        <div className="my-24">
          <h1 className="text-3xl font-bold">Découvrez les meilleurs spots de surf près de chez vous</h1>
          <p className="text-lg text-gray-600 max-w-lg m-auto mt-8">
            Connectez-vous pour accéder aux prévisions, avis et recommandations des surfeurs locaux.
          </p>
        </div>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-6xl">
          <div className="relative p-6 min-h-64 rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/1.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
            <div className="relative z-10 text-left">
              <h2 className="text-xl font-semibold">Prévisions en temps réel</h2>
              <p className="text-gray-700 mt-2 max-w-sm">
                Accédez aux conditions météorologiques et aux vagues en un clic.
              </p>
            </div>
          </div>

          <div className="relative p-6 min-h-64 rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/1.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
            <div className="relative z-10 text-left">
              <h2 className="text-xl font-semibold">Glisseurs d&rsquo;eau</h2>
              <p className="text-gray-700 mt-2 max-w-sm">
                Rejoignez des passionnés et partagez vos expériences.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-32 min-h-32 bg-zinc-900 text-white flex items-center justify-center">
        <p className="text-sm">© 2025 SurfSpots. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
