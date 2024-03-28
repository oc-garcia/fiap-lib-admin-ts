<template>
  <section class="section">
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
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
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { type Book } from "../interfaces/book";
import BookServices from "../services/BookServices";

const booksData = ref<Book[]>([]);
const loading = ref(true);

const props = defineProps({
  refresh: Number,
});

const emit = defineEmits(["refresh"]);

const books = computed(() => booksData.value);

const getBooks = async () => {
  loading.value = true;
  try {
    booksData.value = await BookServices.getBooks();
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  getBooks;
});

watch(() => props.refresh, getBooks);

const handleEdit = (id: number) => {
  console.log(`Edit book with id: ${id}`);
};

const handleDelete = async (id: number) => {
  try {
    await BookServices.deleteBook(id);
  } catch (error) {
    console.error(error);
  } finally {
    getBooks();
  }
};
</script>

<style></style>
