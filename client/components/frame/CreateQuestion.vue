<template>
  <div class="mb-10" @change="$emit('newQuestion', variants)">
    <div class="category">
      Вопрос №
      {{ props.number }}
    </div>
    <textarea
      v-model="variants.question"
      class="rounded-3xl p-5 border border-black text-2xl mt-3 w-full max-md:text-xl"
      rows="5"
    ></textarea>
    <div class="category mt-10">Варианты ответов</div>
    <div class="text-xl">Нажмите на правильный ответ</div>
    <div class="variants grid grid-cols-2 gap-y-5 w-full mt-5 max-sm:grid-cols-1">
      <div class="flex">
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'a' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'a'"
        >
          A
        </div>
        <input class="max-sm:w-full"
          v-model="variants.variantA"
          type="text"
          placeholder="Вариант А"
        />
      </div>
      <div class="flex">
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'b' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'b'"
        >
          Б
        </div>
        <input class="max-sm:w-full"
          v-model="variants.variantB"
          type="text"
          placeholder="Вариант Б"
        />
      </div>
      <div class="flex">
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'c' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'c'"
        >
          В
        </div>
        <input class="max-sm:w-full"
          v-model="variants.variantC"
          type="text"
          placeholder="Вариант В"
        />
      </div>
      <div class="flex">
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'd' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'd'"
        >
          Г
        </div>
        <input class="max-sm:w-full"
          v-model="variants.variantD"
          type="text"
          placeholder="Вариант Г"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IQuestion } from "~/types/types";
const props = defineProps<{ number: number }>();
const variants = ref<IQuestion>({
  question: "",
  rightAnswer: null,
  variantA: "",
  variantB: "",
  variantC: "",
  variantD: "",
});
</script>

<style scoped>
.variants input {
  @apply form-auth-input;
}

.black-btn {
  @apply inline px-5 mr-3;
}
</style>
