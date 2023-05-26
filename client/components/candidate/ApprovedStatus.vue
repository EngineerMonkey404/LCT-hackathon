<template>
    <div class="relative text-2xl font-bold p-10 shadow-slate-950 shadow-2xl rounded-3xl flex flex-col items-center justify-between max-xl:px-5">
        <div>Статус заявки</div>
            <NuxtImg class="my-20 text-center max-lg:my-10" type="svg" src="/candidate/confirm.svg" style="height: 200px;" />
            <div class="text-4xl max-xl:text-2xl text-center">
                Вы прошли на следующий<br>этап отбора
            </div>
            <div class="mt-20 text-center text-4xl max-xl:text-2xl max-xl:mt-10">
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