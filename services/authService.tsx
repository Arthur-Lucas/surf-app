import { createClient } from "@/utils/supabase.utils";

export const signUp = async (email: string, password: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
};

export const signOut = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (err) {
    throw err;
  }
};

export const getUser = async () => {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    throw err;
  }
};
