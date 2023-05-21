<template>
  <header class="flex justify-center items-end bg-purple w-full h-44">
    <div @click="handle">click me</div>
    <RadioGroup v-model="radioToggler" class="flex">
      <RadioGroupOption value="application">
        <div
          class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg class="inline-block" type="svg" src="/frames/invites.svg" />
          Заявки
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="careerSchool">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg
            class="inline-block"
            type="svg"
            src="/candidate/school.svg"
          />
          Школа наставников
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="test">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg
            class="inline-block"
            type="svg"
            src="/candidate/glyphs.svg"
          />
          Расписание стажера
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="test">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg
            class="inline-block"
            type="svg"
            src="/candidate/glyphs.svg"
          />
          Рейтинг
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </header>
  <div class="">
    <h1 class="text-center text-3xl mt-8">
      <strong>Заявки</strong>
      | Тестовые задания
    </h1>
    <div class="flex w-full">
      <div class="w-1/5 ml-44">
        <NuxtLink to="/create-frame-application">
          <button
            class="block mb-5 form-auth-input text-white bg-black text-2xl font-semibold black-btn-hover"
          >
            Создать заявку на стажера
          </button>
        </NuxtLink>
        <button class="block mb-5 text-2xl font-bold">
          <NuxtImg type="svg" src="/frames/cases.svg" class="inline" />
          Ваши заявки
        </button>
        <button class="block mb-5 text-2xl font-semibold">
          <NuxtImg
            type="svg"
            src="/frames/library_add_check.svg"
            class="inline"
          />
          Проверенные заявки
        </button>
      </div>
      <div
        v-if="frameApplicationsStore.personalFrameApplications.length"
        class="grid grid-cols-1 mt-20 mr-10 w-full"
      >
        <ApplicationCard
          v-for="application in frameApplicationsStore.personalFrameApplications"
          :application="application"
        ></ApplicationCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useUserStore } from "~/stores/userStore";

const radioToggler = ref("application");
const frameApplicationsStore = useFrameApplicationsStore();
const userStore = useUserStore();

onMounted(async () => {
  await frameApplicationsStore.getApplicationsByFrameId(
    userStore.user!.userId!
  );
});

function handle() {
  console.log(userStore.getUser());
}
</script>
