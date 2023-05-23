<template>
  <div class="subheader">
    <template v-for="(route, index) of routes" :key="index">
      <NuxtLink :to="`/frame${route.route}`">
        <div
          class="header-btn"
          :class="{
            'header-btn-active':
              router.currentRoute.value.fullPath === `frames/${route.route}`,
          }"
        >
          <NuxtImg class="inline-block" type="svg" :src="route.svg" />
          {{ route.title }}
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const routes = [
  { route: "/applications", title: "Заявки", svg: "/frames/applications.svg" },
  { route: "/mentor-school", title: "Школа наставников", svg: "/school.svg" },
];
console.log("route", router.currentRoute.value.fullPath);
</script>

<style scoped></style>
