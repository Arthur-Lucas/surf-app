"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import spots from "../datas/spots_bretagne.json";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

let L: typeof import("leaflet");
if (typeof window !== "undefined") {
  import("leaflet").then((leaflet) => {
    L = leaflet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  });
}

interface Spot {
  id: string;
  name: string;
  location: string;
  coordinates: number[];
}

export default function MapPage() {
  const router = useRouter();
  const bretonSpots = (spots as Spot[]).filter((spot) =>
    spot.location.toLowerCase().includes("bretagne")
  );
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    setMapReady(true);
  }, []);

  if (!mapReady) return null;

  return (
    <div className="h-screen w-screen">
      <MapContainer
        center={[48.2, -3.6]}
        zoom={8}
        scrollWheelZoom={true}
        className="h-full w-full grayscale"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {bretonSpots.map((spot) => (
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
