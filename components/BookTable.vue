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
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { type Book } from "../interfaces/book";

const booksData = ref<Book[]>([]);

const books = computed(() => booksData.value);

onMounted(async () => {
  const { data } = await useFetch("/api/getBooks");
  booksData.value = data as unknown as Book[];
});
console.log(books.value);

const handleEdit = (id: number) => {
  console.log(`Edit book with id: ${id}`);
};

const handleDelete = (id: number) => {
  console.log(`Delete book with id: ${id}`);
};
</script>

<style></style>
