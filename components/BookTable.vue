<template>
  <transition name="fade">
    <article class="message is-warning mt-2" v-if="showEditMessage">
      <div class="message-header">
        <p>Info</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">Editado com sucesso!</div>
    </article>
  </transition>

  <transition name="fade">
    <article class="message is-danger mt-2" v-if="showDeleteMessage">
      <div class="message-header">
        <p>Info</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">Deletado com sucesso!</div>
    </article>
  </transition>

  <section class="section">
    <div v-if="loading">
      <transition name="fade">
        <p>Loading...</p>
      </transition>
    </div>
    <div v-else>
      <transition name="fade">
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
                <td>{{ book.year > 0 ? `${book.year} d.C` : `${Math.abs(book.year)} a.C` }}</td>
                <td>{{ book.publisher }}</td>
                <td>
                  <button class="button is-warning" @click="handleEdit(book)">Editar</button>

                  <button class="button is-danger ml-2" @click="handleDelete(book.id)">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else>
          <h2 class="subtitle">Nenhum livro cadastrado</h2>
        </div>
      </transition>
    </div>
  </section>

  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Cadastro de livro</p>
        <button class="delete" aria-label="close" @click="toggleModal"></button>
      </header>
      <section class="modal-card-body">
        <NewBookForm
          v-if="showModal"
          @cancel="toggleModal"
          @edited="handleEdited"
          :book="currentBook" />
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { type Book } from "../interfaces/book";
import BookServices from "../services/BookServices";
import { BookClass } from "~/services/BookClass";

const booksData = ref<Book[]>([]);
const loading = ref(true);
const showModal: Ref<boolean> = ref(false);
const showEditMessage: Ref<boolean> = ref(false);
const showDeleteMessage: Ref<boolean> = ref(false);
const currentBook = ref<Book | null>(null);

const props = defineProps({
  refresh: Number,
});

const emit = defineEmits(["refresh"]);

const books = computed(() => booksData.value);

const toggleModal = (): void => {
  showModal.value = !showModal.value;
};

const getBooks = async () => {
  booksData.value = [];
  loading.value = true;
  try {
    const response = await BookServices.getBooks();
    response.map((book) => {
      let displayedBook: Book = new BookClass(book.id, book.title, book.author, book.isbn, book.year, book.publisher);
      booksData.value.push(displayedBook);
    });
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

const handleEdit = (book: Book) => {
  currentBook.value = book;
  toggleModal();
};

const handleEdited = () => {
  toggleModal();
  showEditMessage.value = true;
  getBooks();
  setTimeout(() => {
    showEditMessage.value = false;
  }, 3000);
};

const handleDelete = async (id: string) => {
  try {
    await BookServices.deleteBook(id);
    showDeleteMessage.value = true;
    setTimeout(() => {
      showDeleteMessage.value = false;
    }, 3000);
  } catch (error) {
    console.error(error);
  } finally {
    getBooks();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
