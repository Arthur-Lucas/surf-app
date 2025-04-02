"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import spots from "../datas/spots_with_real_coords.json";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

let L: typeof import("leaflet");
useEffect(() => {
  if (typeof window !== "undefined") {
    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });
    });
  }
}, []);

interface Spot {
  id: string;
  name: string;
  location: string;
  coordinates: number[];
  waveType: string;
  difficulty: string;
}

export default function MapPage() {
  const router = useRouter();
  const allSpots = spots as Spot[];
  const [mapReady, setMapReady] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const countries = Array.from(
    new Set(allSpots.map((spot) => spot.location.split(",").pop()?.trim()))
  );
  const types = Array.from(new Set(allSpots.map((spot) => spot.waveType)));

  const filteredSpots = allSpots.filter((spot) => {
    return (
      (!selectedCountry || spot.location.includes(selectedCountry)) &&
      (!selectedType || spot.waveType === selectedType)
    );
  });

  const mapCenter = useMemo(() => {
    if (filteredSpots.length === 0) return [47.8, -3.9];
    const latSum = filteredSpots.reduce(
      (sum, spot) => sum + spot.coordinates[0],
      0
    );
    const lngSum = filteredSpots.reduce(
      (sum, spot) => sum + spot.coordinates[1],
      0
    );
    return [latSum / filteredSpots.length, lngSum / filteredSpots.length];
  }, [filteredSpots]);

  useEffect(() => {
    document.body.style.margin = "0";
    setMapReady(true);
  }, []);

  if (!mapReady) return null;

  return (
    <div className="h-screen w-screen relative">
      {/* Mini filtre */}
      <div className="absolute top-4 right-4 bg-zinc-900 text-white p-4 rounded-xl shadow-lg space-y-4 z-[1000] w-60">
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-1">Pays</h2>
          <select
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm focus:outline-none"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Tous</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-1">Type</h2>
          <select
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm focus:outline-none"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Tous</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <MapContainer
        center={mapCenter as [number, number]}
        zoom={6.5}
        scrollWheelZoom={true}
        className="h-full w-full grayscale"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {filteredSpots.map((spot) => (
          <Marker key={spot.id} position={spot.coordinates as [number, number]}>
            <Popup>
              <div
                onClick={() => router.push(`/spots/${spot.id}`)}
                className="cursor-pointer"
              >
                <strong>{spot.name}</strong>
                <br />
                {spot.location}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
