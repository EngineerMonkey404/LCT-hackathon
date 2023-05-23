<template>
    <div class="relative text-2xl font-bold p-10 shadow-slate-950 shadow-2xl rounded-3xl w-1/5 flex flex-col items-center justify-between">
        <div>Статус заявки</div>
            <NuxtImg class="my-20 text-center" type="svg" src="/candidate/confirm.svg" />
            <div class="text-4xl">
                Вы прошли на следующий этап отбора
            </div>
            <div class="mt-20 text-center text-4xl">
                <button class="form-auth-input black-btn-hover bg-black text-white text-xl font-semibold"
                    @click="$emit('careerSchool')">
                    Карьерная школа
                    <NuxtImg class="inline" type="svg" src="/candidate/arrow_right_alt.svg" />
                </button>
            </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>