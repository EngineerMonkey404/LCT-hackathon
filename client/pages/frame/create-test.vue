<template>
    <div class="container mx-auto">
        <div class="flex justify-center mt-10">
            <div @click="showQuestions = true" class="mr-10 black-btn text-3xl">
                Создать тест
            </div>
            <input id="loadFile" type="file">
            <label @click="showQuestions = false" class="black-btn text-3xl" for="loadFile">Загрузить файл</label>
        </div>
        <div v-if="showQuestions" class="card-style mt-10">
            <CreateQuestion @newQuestion="(newQuestion: object) => listQuestions[i - 1] = newQuestion"
                v-for="i in quantityQuestions" :key="i">
                {{ i }}
            </CreateQuestion>
            <button @click="quantityQuestions += 1" class="mt-10">
                <NuxtImg class="inline-block" format="svg" src="/candidate/add_circle.svg" style="height: 15px" />
                Добавить вопрос
            </button>
            <button @click="console.log(listQuestions)" class="black-btn mt-10 block">Создать</button>
        </div>
        {{ listQuestions }}
    </div>
</template>

<script setup lang="ts">
import CreateQuestion from '~/components/frame/CreateQuestion.vue';
const quantityQuestions = ref(1);
const showQuestions = ref(false);
const listQuestions = ref<object[]>([]);
</script>

<style scoped>
input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
</style>