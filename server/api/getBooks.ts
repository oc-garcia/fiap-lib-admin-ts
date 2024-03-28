import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ezunvnrsbnrnrgmaetwd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6dW52bnJzYm5ybnJnbWFldHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MjkxNjQsImV4cCI6MjAyNzIwNTE2NH0.AAty20KrguvauI4rJ-mja-1R1hD-nM0oeeykDXX0A9Y";
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