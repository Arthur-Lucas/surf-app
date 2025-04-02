"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";
import spotsData from "@/public/datas/spots.json";

interface Spot {
  id: string;
  name: string;
  location: string;
  waveType: string;
  difficulty: string;
  stats: {
    wind: string;
    tide: string;
    swellHeight: string;
    swellDirection: string;
    swellPeriod: string;
    waterTemp: string;
    airTemp: string;
    rating: number;
  };
}

export default function SpotsPage() {
  const [spots, setSpots] = useState<Spot[]>(spotsData);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<keyof Spot["stats"] | "">("");
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const sortSpots = (criteria: keyof Spot["stats"]) => {
    const sorted = [...spots].sort((a, b) => {
      const aRaw = a.stats[criteria];
      const bRaw = b.stats[criteria];
      const aVal =
        typeof aRaw === "string"
          ? parseFloat(aRaw.replace(/[^\d.]/g, ""))
          : aRaw;
      const bVal =
        typeof bRaw === "string"
          ? parseFloat(bRaw.replace(/[^\d.]/g, ""))
          : bRaw;
      return bVal - aVal;
    });
    setSpots(sorted);
    setSortBy(criteria);
  };

  const filteredSpots = onlyFavorites
    ? spots.filter((spot) => favorites.includes(spot.id))
    : spots;

  return (
    <main className="bg-white text-black p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={sortBy === "swellHeight" ? "default" : "outline"}
            onClick={() => sortSpots("swellHeight")}
          >
            🌊 Houle
          </Button>
          <Button
            variant={sortBy === "wind" ? "default" : "outline"}
            onClick={() => sortSpots("wind")}
          >
            💨 Vent
          </Button>
          <Button
            variant={sortBy === "tide" ? "default" : "outline"}
            onClick={() => sortSpots("tide")}
          >
            🌙 Marée
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            onClick={() => sortSpots("rating")}
          >
            ⭐ Accessibilité
          </Button>
          <Button
            variant={onlyFavorites ? "default" : "outline"}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
          >
            ❤️ Favoris
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => (
          <Card
            key={spot.id}
            className="relative rounded-xl border border-gray-200 hover:shadow-md transition cursor-pointer overflow-hidden"
          >
            {/* Image de fond */}
            <div
              className="absolute inset-0 bg-cover bg-center grayscale-100"
              style={{ backgroundImage: `url('/images/${spot.id}.jpg')` }}
            />
            {/* Dégradé pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />

            <CardContent className="relative p-5 space-y-3 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{spot.name}</h2>
                  <p className="text-sm text-gray-700">{spot.location}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(spot.id)}
                  className="text-black hover:scale-110 transition"
                  title="Ajouter aux favoris"
                >
                  <Heart
                    fill={favorites.includes(spot.id) ? "black" : "white"}
                    stroke="black"
                  />
                </button>
              </div>
              <div className="flex gap-2 pt-2 flex-wrap">
                <Badge variant="outline">{spot.waveType}</Badge>
                <Badge variant="secondary">{spot.difficulty}</Badge>
              </div>
              <Link
                href={`/spots/${spot.id}`}
                className="inline-block text-sm text-blue-500 hover:underline pt-2"
              >
                Voir les détails →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
