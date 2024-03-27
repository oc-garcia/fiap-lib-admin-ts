<template>
  <section class="hero is-small is-primary">
    <div class="hero-body">
      <button class="button is-link" @click="toggleModal">Cadastrar Livro</button>
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
        <NewBookForm />
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success">Salvar</button>
          <button class="button is-danger" @click="toggleModal">Cancelar</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NewBookForm from "./NewBookForm.vue";

const showModal: Ref<boolean> = ref(false);

const toggleModal = (): void => {
  showModal.value = !showModal.value;
};
</script>

<style></style>
