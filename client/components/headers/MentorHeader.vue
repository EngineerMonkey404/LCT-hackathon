<template>
    <div class="subheader">
        <template v-for="(route, index) of routes" :key="index">
            <NuxtLink :to="`/mentor${route.route}`">
                <div class="header-btn" :class="{
                    'header-btn-active':
                        router.currentRoute.value.fullPath === `mentor/${route.route}`,
                }">
                    <NuxtImg class="inline-block" type="svg" :src="route.svg" />
                    <span class="max-sm:hidden">{{ route.title }}</span>
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

</script>
  
<style scoped></style>
