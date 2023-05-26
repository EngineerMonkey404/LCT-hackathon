<template>
  <div class="mb-10" @change="$emit('newQuestion', variants)">
    <div class="category">
      Вопрос №
      {{ props.number }}
    </div>
    <textarea
      v-model="variants.question"
      class="rounded-3xl p-5 border border-black text-2xl mt-3 w-full"
      rows="5"
    ></textarea>
    <div class="category mt-10">Варианты ответов</div>
    <div class="text-xl">Нажмите на правильный ответ</div>
    <div class="variants grid grid-cols-2 gap-y-5 w-full mt-5">
      <div>
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'a' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'a'"
        >
          A
        </div>
        <input
          v-model="variants.variantA"
          type="text"
          placeholder="Вариант А"
        />
      </div>
      <div>
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'b' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'b'"
        >
          Б
        </div>
        <input
          v-model="variants.variantB"
          type="text"
          placeholder="Вариант Б"
        />
      </div>
      <div>
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'c' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'c'"
        >
          В
        </div>
        <input
          v-model="variants.variantC"
          type="text"
          placeholder="Вариант В"
        />
      </div>
      <div>
        <div
          class="black-btn"
          :class="variants.rightAnswer === 'd' ? 'bg-lime-400' : ''"
          @click="variants.rightAnswer = 'd'"
        >
          Г
        </div>
        <input
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
