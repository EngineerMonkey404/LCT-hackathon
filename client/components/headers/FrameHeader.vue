<template>
  <div class="subheader">
    <NuxtLink to="/frame/applications">
      <button
        class="header-btn"
        :class="current === 'a' ? 'header-btn-active' : ''"
        @click="current = 'a'"
      >
        <img class="inline-block" type="svg" src="/frames/applications.svg" />
        <span class="hidden">Заявки</span>
      </button>
    </NuxtLink>
    <NuxtLink to="/frame/mentor-school">
      <button
        class="header-btn"
        :class="current === 's' ? 'header-btn-active' : ''"
        @click="current = 's'"
      >
        <img class="inline-block" type="svg" src="/school.svg" />
        <span class="hidden">Школа наставников</span>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const current = ref("a");
</script>

<style scoped></style>
