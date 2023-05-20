<template>
    <div class="p-10">
        <div class="flex justify-between text-3xl font-bold">
            <h2><slot name="job" /></h2>
            <h2><slot name="organization" /></h2>
        </div>
        <hr class="mt-5 w-full">
        <h2 class="font-semibold text-3xl mt-10 mb-3">Описание</h2>
        <p class="text-2xl"><slot name="description" /></p>
        <h2 class="font-semibold text-3xl mt-10 mb-5">Опыт работы</h2>
        <div class="mb-10"><slot name="workExpirience" /></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>