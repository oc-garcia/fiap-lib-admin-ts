import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "../lib/supabase";

const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  let { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error("Error: ", error);
    return { body: error };
  } else {
    return data;
  }
});
