<template>
  <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
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
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";

const emit = defineEmits(["cancel", "saved"]);

const schema = yup.object({
  title: yup.string().required("Campo Obrigatório"),
  author: yup.string().required("Campo Obrigatório"),
  isbn: yup.string().required("Campo Obrigatório"),
  year: yup.number().required("Campo Obrigatório"),
  publisher: yup.string().required("Campo Obrigatório"),
});

const save = async (values: Book) => {
  try {
    const response = await $fetch("api/postBook", {
      method: "POST",
      body: values,
    });
    emit("saved");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = (values: Book, { resetForm }: { resetForm: Function }) => {
  save(values);
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
