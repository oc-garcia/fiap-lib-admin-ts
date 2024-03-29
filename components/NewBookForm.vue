<template>
  <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }" :initial-values="book as Book">
    <div class="field">
      <label class="label">Título</label>
      <div class="control">
        <Field class="input" name="title" type="text" placeholder="Título" />
        <span class="has-text-danger is-size-7">{{ errors.title }}</span>
      </div>
    </div>

    <div class="field">
      <label class="label">Autor</label>
      <div class="control">
        <Field class="input" name="author" type="text" placeholder="Autor" />
        <span class="has-text-danger is-size-7">{{ errors.author }}</span>
      </div>
    </div>

    <div class="field">
      <label class="label">ISBN</label>
      <div class="control">
        <Field class="input" name="isbn" type="text" placeholder="ISBN" />
        <span class="has-text-danger is-size-7">{{ errors.isbn }}</span>
      </div>
    </div>

    <div class="field">
      <label class="label">Ano</label>
      <div class="control">
        <Field class="input" name="year" type="number" placeholder="Ano" />
        <span class="has-text-danger is-size-7">{{ errors.year }}</span>
      </div>
    </div>

    <div class="field">
      <label class="label">Editora</label>
      <div class="control">
        <Field class="input" name="publisher" type="text" placeholder="Editora" />
        <span class="has-text-danger is-size-7">{{ errors.publisher }}</span>
      </div>
    </div>
    <div class="buttons-container">
      <button class="button is-danger" @click.prevent="emit('cancel')">Cancelar</button>
      <button class="button is-success" type="submit">Salvar</button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import { type Book } from "../interfaces/book";
import * as yup from "yup";
import BookServices from "~/services/BookServices";
import { BookClass } from "~/services/BookClass";

const props = defineProps({
  book: {
    type: Object as () => Book | null,
    default: null,
  },
});

watch(
  () => props.book,
  (newVal, oldVal) => {
    console.log("book prop changed:", newVal);
  },
  { immediate: true }
);

const emit = defineEmits(["cancel", "saved", "edited"]);

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

const save = async (values: Book) => {
  try {
    if (props.book) {
      await BookServices.patchBook(values);
      emit("edited");
    } else {
      await BookServices.postBook(values);
      emit("saved");
    }
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = (values: Book, { resetForm }: { resetForm: Function }) => {
  save(values as Book);
  resetForm();
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
