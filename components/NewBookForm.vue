<template>
  <Form novalidate @submit.prevent="onSubmit">
    <div class="field">
      <label class="label">Título</label>
      <div class="control">
        <Field class="input" name="title" type="text" placeholder="Título" v-model="book.title" />
      </div>
    </div>

    <div class="field">
      <label class="label">Autor</label>
      <div class="control">
        <Field class="input" name="author" type="text" placeholder="Autor" v-model="book.author" />
      </div>
    </div>

    <div class="field">
      <label class="label">ISBN</label>
      <div class="control">
        <Field class="input" name="isbn" type="text" placeholder="ISBN" v-model="book.isbn" />
      </div>
    </div>

    <div class="field">
      <label class="label">Ano</label>
      <div class="control">
        <Field class="input" name="year" type="number" placeholder="Ano" v-model="book.year" />
      </div>
    </div>

    <div class="field">
      <label class="label">Editora</label>
      <div class="control">
        <Field class="input" name="publisher" type="text" placeholder="Editora" v-model="book.publisher" />
      </div>
    </div>
    <div class="buttons-container">
      <button class="button is-danger" @click.prevent="emit('cancel')">Cancelar</button>
      <button class="button is-success">Salvar</button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import { type Book } from "../interfaces/book";
import { v4 as uuidv4 } from "uuid";

const emit = defineEmits(["cancel", "saved"]);

const book = ref({
  title: "",
  id: uuidv4(),
  author: "",
  isbn: "",
  year: 0,
  publisher: "",
} as Book);

const save = async () => {
  console.log(book.value);
  try {
    const response = await $fetch("api/postBook", {
      method: "POST",
      body: book.value,
    });
    emit("saved");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = async (values) => {
  save();
};
</script>

<style scoped>
.buttons-container {
  margin-top: 6rem important!;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
