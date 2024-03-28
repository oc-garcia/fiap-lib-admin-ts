import axios from "axios";
import { type Book } from "../interfaces/book";

const BookServices = {
  getBooks: async () => {
    try {
      const response = await axios.get("/api/getBooks");
      return response.data as Book[];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  postBook: async (values: Book) => {
    try {
      const response = await axios.post("/api/postBook", values);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  deleteBook: async (id: number) => {
    try {
      const response = await axios.delete("/api/deleteBook", {
        data: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  patchBook: async (values: Book) => {
    try {
      const response = await axios.patch(`/api/patchBook`, values);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default BookServices;
