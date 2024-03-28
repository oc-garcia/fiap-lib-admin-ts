<template>
  <section class="section">
    <div v-if="books && books.length">
      <h2 class="subtitle">Livros Cadastrados</h2>
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Ano</th>
            <th>Editora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.isbn }}</td>
            <td>{{ book.year }}</td>
            <td>{{ book.publisher }}</td>
            <td>
              <button class="button is-warning" @click="handleEdit(book.id)">Editar</button>

              <button class="button is-danger ml-2" @click="handleDelete(book.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h2 class="subtitle">Nenhum livro cadastrado</h2>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { type Book } from "../interfaces/book";

const booksData = ref<Book[]>([]);

const props = defineProps({
  refresh: Number,
});

const books = computed(() => booksData.value);

const fetchBooks = async () => {
  const response = await axios.get("/api/getBooks");
  booksData.value = response.data as Book[];
};

onMounted(() => {
  fetchBooks;
});

watch(() => props.refresh, fetchBooks);

const handleEdit = (id: number) => {
  console.log(`Edit book with id: ${id}`);
};

const handleDelete = async (id: number) => {
  try {
    await axios.delete("/api/deleteBook", {
      data: {
        id: id,
      },
    });
    booksData.value = booksData.value.filter((book) => book.id !== id);
  } catch (error) {
    console.error(error);
  } finally {
    const response = await axios.get("/api/getBooks");
    booksData.value = response.data as Book[];
  }
};
</script>

<style></style>
