<template>
  <section class="hero is-small is-primary">
    <div class="hero-body">
      <button class="button is-link" @click="toggleModal">Cadastrar Livro</button>
    </div>
  </section>

  <transition name="fade">
    <article class="message is-success mt-2" v-if="showSuccessMessage">
      <div class="message-header">
        <p>Info</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">Salvo com sucesso!</div>
    </article>
  </transition>

  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Cadastro de livro</p>
        <button class="delete" aria-label="close" @click="toggleModal"></button>
      </header>
      <section class="modal-card-body">
        <NewBookForm @cancel="toggleModal" @saved="handleSave" />
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NewBookForm from "./NewBookForm.vue";

const showModal: Ref<boolean> = ref(false);
const showSuccessMessage: Ref<boolean> = ref(false);

const toggleModal = (): void => {
  showModal.value = !showModal.value;
};

const handleSave = () => {
  toggleModal();
  showSuccessMessage.value = true;
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 3000);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
