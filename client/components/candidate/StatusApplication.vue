<template>
  <div
    class="relative text-2xl font-bold p-10 shadow-slate-950 shadow-2xl rounded-3xl w-1/5"
  >
    <h2>Статус заявки</h2>
    <div class="flex flex-col items-center">
      <img class="my-20 text-center" type="svg" :src="props.img" />
      <div class="text-4xl">
        <slot name="title" />
      </div>
      <div class="mb-20 text-center text-4xl">
        <slot name="content" />
      </div>
    </div>
    <div class="absolute bottom-10">
      <slot name="link" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ img: string }>();
</script>

<style scoped></style>
