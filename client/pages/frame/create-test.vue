<template>
  <div class="sm:container mx-auto">
    <div class="flex justify-center mt-10">
      <div
        class="mr-10 black-btn text-3xl max-md:text-xl"
        @click="showQuestions = true"
      >
        Создать тест
      </div>
      <input id="loadFile" type="file" />
      <label
        class="black-btn text-3xl max-md:text-xl"
        for="loadFile"
        @click="showQuestions = false"
      >
        Загрузить файл
      </label>
    </div>
    <div v-if="showQuestions" class="card-style mt-10">
      <CreateQuestion
        v-for="i in quantityQuestions"
        :number="i"
        @newQuestion="(newQuestion: IQuestion) => listQuestions[i - 1] = newQuestion"
      >
        {{ i }}
      </CreateQuestion>

      <button class="mt-10" @click="quantityQuestions += 1">
        <NuxtImg
          class="inline-block"
          format="svg"
          src="/candidate/add_circle.svg"
          style="height: 15px"
        />
        Добавить вопрос
      </button>

      <NuxtLink to="/frame/create-frame-application">
        <button
          class="black-btn mt-10 block"
          @click="testStore.creationTest = listQuestions"
        >
          Создать тест
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateQuestion from "~/components/frame/CreateQuestion.vue";
import { useTestStore } from "~/stores/testStore";
import { IQuestion } from "~/types/types";
const quantityQuestions = ref(1);
const showQuestions = ref(false);
const listQuestions = ref<IQuestion[]>([]);
const testStore = useTestStore();
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
