<template>
  <TopBar />
  <EntrySection @saved="handleSaved" />
  <BookTable :refresh="refreshKey" />
</template>

<script lang="ts" setup>
import TopBar from "~/components/TopBar.vue";

const refreshKey = ref(0);

const handleSaved = () => {
  refreshKey.value++;
};
</script>

<style></style>
