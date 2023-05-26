<template>
  <div>
    {{ answers }}
    <div
      v-for="(question, i) of testStore.currentTest"
      :key="question.question"
    >
      <div class="category my-5">Вопрос №{{ i + 1 }}</div>
      <div class="form-auth-input mb-5">{{ question.question }}</div>
      <div class="category">Варианты ответов</div>
      <RadioGroup
        v-model="answers[i]"
        class="grid grid-cols-2 w-full gap-y-5 mt-5"
      >
        <RadioGroupOption v-slot="{ checked }" :value="'d'">
          <div class="black-btn" :class="checked ? 'bg-violet-500' : ''">А</div>
          <span>{{ question.variantA }}</span>
        </RadioGroupOption>
        <RadioGroupOption v-slot="{ checked }" :value="'b'">
          <div class="black-btn" :class="checked ? 'bg-violet-500' : ''">Б</div>
          <span>{{ question.variantB }}</span>
        </RadioGroupOption>
        <RadioGroupOption v-slot="{ checked }" :value="'c'">
          <div class="black-btn" :class="checked ? 'bg-violet-500' : ''">В</div>
          <span>{{ question.variantC }}</span>
        </RadioGroupOption>
        <RadioGroupOption v-slot="{ checked }" :value="'d'">
          <div class="black-btn" :class="checked ? 'bg-violet-500' : ''">Г</div>
          <span>{{ question.variantD }}</span>
        </RadioGroupOption>
      </RadioGroup>
    </div>
    <div class="black-btn mt-20" style="display: block" @click="handleResult">
      Отправить тест
    </div>
    <div v-if="result" class="text-center text-2xl mt-10">
      Результат: {{ result }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { useTraineeStore } from "~/stores/traineeStore";
import { useUserStore } from "~/stores/userStore";
import { useTestStore } from "~/stores/testStore";

const traineeStore = useTraineeStore();
const userStore = useUserStore();
const testStore = useTestStore();
// из рутов достаем тест

const answers = ref([]);
const result = ref(0);

function handleResult() {
  //надо отвечать на все вопросы
  let i = 0;
  answers.value.forEach((element) => {
    if (element === testStore.currentTest[i].rightAnswer) {
      result.value += 1;
    }
    console.log(result.value);
    i += 1;
  });
  console.log(test.length);
  result.value = Math.round((result.value / test.length) * 100);
  traineeStore.submitTraineeRespond(+route.params.id, userStore.user?.userId!);
}
</script>

<style scoped>
.black-btn {
  @apply inline text-center;
}

span {
  @apply form-auth-input;
}
</style>
