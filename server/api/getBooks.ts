import { supabase } from "../lib/supabase";

export default defineEventHandler(async (event) => {
  let { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error("Error: ", error);
    return { body: error };
  } else {
    return data;
  }
});
