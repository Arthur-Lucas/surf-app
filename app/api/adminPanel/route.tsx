import { insertSpot } from "@/services/spotService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, location, waveType, difficulty, description, lat, lng } =
      body;
    console.log("Received data:", body);
    const spot: Spot = {
      id: "",
      name,
      location,
      waveType,
      difficulty,
      description,
      coordinates: [lat, lng],
    };

    insertSpot(spot)
      .then((data) => {
        console.log("Spot added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding spot:", error);
      });

    return NextResponse.json(
      { message: "Spot added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/adminPanel:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
