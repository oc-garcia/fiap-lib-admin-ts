import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL as string;
const supabaseKey: string = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { data, error } = await supabase.from("books").update(body).match({ id: body.id });

  if (error) {
    console.error("Error: ", error);
    return { body: error };
  } else {
    console.log("Book updated: ", data);
    return { body: "Book updated: " + JSON.stringify(data) };
  }
});
