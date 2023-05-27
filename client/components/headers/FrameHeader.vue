<template>
  <div class="subheader">
    <NuxtLink to="/frame/applications">
      <button
        class="header-btn"
        :class="current === 'a' ? 'header-btn-active' : ''"
        @click="current = 'a'"
      >
        <NuxtImg
          class="inline-block"
          type="svg"
          src="/frames/applications.svg"
        />
        Заявки
      </button>
    </NuxtLink>
    <NuxtLink to="/frame/mentor-school">
      <button
        class="header-btn"
        :class="current === 's' ? 'header-btn-active' : ''"
        @click="current = 's'"
      >
        <NuxtImg class="inline-block" type="svg" src="/school.svg" />
        Школа наставников
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const current = ref("a");
console.log("route", router.currentRoute.value.fullPath);
</script>

<style scoped></style>
