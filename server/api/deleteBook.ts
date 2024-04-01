import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "../lib/supabase";
import * as yup from "yup";

const supabase = createClient(supabaseUrl, supabaseKey);

const schema = yup.object({
  id: yup.string().uuid().required(),
  title: yup.string(),
  author: yup.string(),
  isbn: yup.string(),
  year: yup
    .number()
    .integer("O ano deve ser um número inteiro")
    .min(-3200, "O ano deve ser maior ou igual a -3200")
    .max(new Date().getFullYear(), "O ano deve ser menor ou igual ao ano atual"),
  publisher: yup.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await schema.validate(body);
  } catch (error) {
    console.error("Validation Error: ", error);
    return { body: error };
  }

  const { error } = await supabase.from("books").delete().eq("id", body.id);
  if (error) {
    console.error("Error: ", error);
    return { body: error };
  } else {
    console.log("Book deleted: ", body);
    return { body: "Book deleted: " + JSON.stringify(body) };
  }
});
