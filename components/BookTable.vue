<template>
  <section class="section">
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
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const books = ref([
  {
    id: 1,
    title: "O Senhor dos Anéis",
    author: "J. R. R. Tolkien",
    isbn: "9788533613379",
    year: 2001,
    publisher: "Martins Fontes",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "9788535908060",
    year: 1949,
    publisher: "Companhia das Letras",
  },
  { id: 3, title: "Moby Dick", author: "Herman Melville", isbn: "9788573264496", year: 1851, publisher: "Editora 34" },
]);

const handleEdit = (id: number) => {
  console.log(`Edit book with id: ${id}`);
};

const handleDelete = (id: number) => {
  console.log(`Delete book with id: ${id}`);
};
</script>

<style></style>
