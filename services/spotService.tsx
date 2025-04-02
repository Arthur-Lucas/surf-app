import { createClient } from "@/utils/supabase.utils";

export const getSpots = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
};

export const insertSpot = async (spot: Spot) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("spots").insert({
      name: spot.name,
      location: spot.location,
      waveType: spot.waveType,
      difficulty: spot.difficulty,
      description: spot.description,
      lat: spot.coordinates[0],
      lng: spot.coordinates[1],
    });
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
};
