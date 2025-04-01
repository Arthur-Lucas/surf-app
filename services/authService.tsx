import { ROUTES } from "@/utils/constants/ROUTES";
import { createClient, getURL } from "@/utils/supabase.utils";

const supabase = createClient();

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error signing up:", err);
    throw err;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error signing in:", err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Error signing out:", err);
    throw err;
  }
};

export const getUser = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};
