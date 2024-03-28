import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL as string;
const supabaseKey: string = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  let { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error("Error: ", error);
    return { body: "Error: " + JSON.stringify(error) };
  } else {
    return data;
  }
});
