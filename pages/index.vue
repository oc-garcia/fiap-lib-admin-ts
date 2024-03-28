<template>
  <TopBar />
  <EntrySection @refresh="handleUpdate" />
  <BookTable :refresh="refreshKey" />
</template>

<script lang="ts" setup>
import TopBar from "~/components/TopBar.vue";

const refreshKey = ref(0);

onMounted(() => {
  handleUpdate();
});

const handleUpdate = () => {
  refreshKey.value++;
};
</script>

<style></style>
