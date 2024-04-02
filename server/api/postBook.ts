import { supabase } from "../lib/supabase";
import * as yup from "yup";


const schema = yup.object({
  title: yup.string().required("Campo Obrigatório"),
  author: yup.string().required("Campo Obrigatório"),
  isbn: yup.string().required("Campo Obrigatório"),
  year: yup
    .number()
    .required("Campo Obrigatório")
    .integer("O ano deve ser um número inteiro")
    .min(-3200, "O ano deve ser maior ou igual a -3200")
    .max(new Date().getFullYear(), "O ano deve ser menor ou igual ao ano atual"),
  publisher: yup.string().required("Campo Obrigatório"),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await schema.validate(body);
  } catch (error) {
    console.error("Validation Error: ", error);
    return { body: error };
  }

  const { data, error } = await supabase.from("books").insert([body]).select();

  if (error) {
    console.error("Error: ", error);
    return { body: error };
  } else {
    console.log("Book created: ", data);
    return { body: "Book created: " + JSON.stringify(data) };
  }
});
