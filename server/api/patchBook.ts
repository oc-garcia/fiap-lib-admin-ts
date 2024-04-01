import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "../lib/supabase";
import * as yup from "yup";

const supabase = createClient(supabaseUrl, supabaseKey);

const schema = yup.object().shape({
  id: yup.string().uuid().required(),
  title: yup.string().required(),
  author: yup.string().required(),
  isbn: yup.string().required(),
  year: yup.number().required().integer().min(1900).max(new Date().getFullYear()),
  publisher: yup.string().required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await schema.validate(body);
  } catch (error) {
    console.error("Validation Error: ", error);
    return { body: error };
  }

  const { data, error } = await supabase.from("books").update(body).match({ id: body.id });

  if (error) {
    console.error("Error: ", error);
    return { body: error };
  } else {
    console.log("Book updated: ", data);
    return { body: "Book updated: " + JSON.stringify(data) };
  }
});
