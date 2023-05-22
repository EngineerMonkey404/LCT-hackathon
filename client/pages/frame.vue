<template>
  <header class="flex justify-center items-end bg-purple w-full h-44">
    <div @click="handle">click me</div>
    <RadioGroup v-model="radioToggler" class="flex">
      <RadioGroupOption value="application">
        <div class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out">
          <NuxtImg class="inline-block" type="svg" src="/frames/invites.svg" />
          Заявки
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="careerSchool">
        <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
          <NuxtImg class="inline-block" type="svg" src="/candidate/school.svg" />
          Школа наставников
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="test">
        <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
          <NuxtImg class="inline-block" type="svg" src="/candidate/glyphs.svg" />
          Расписание стажера
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="test">
        <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
          <NuxtImg class="inline-block" type="svg" src="/candidate/glyphs.svg" />
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
          <button class="block mb-5 form-auth-input text-white bg-black text-2xl font-semibold black-btn-hover">
            Создать заявку на стажера
          </button>
        </NuxtLink>
        <RadioGroup v-model="filterApplications">
          <RadioGroupOption class="mb-5" v-slot="{ checked }" value="all">
            <div :class="checked ? 'radio-btn font-bold' : 'radio-btn'">
              <NuxtImg type="svg" src="/frames/cases.svg" class="inline" />
              Ваши заявки
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" v-model="radioToggler" value="approved">
            <div :class="checked ? 'radio-btn font-bold' : 'radio-btn'">
              <NuxtImg type="svg" src="/frames/library_add_check.svg" class="inline" />
              Проверенные заявки
            </div>
          </RadioGroupOption>
        </RadioGroup>
        <button class="block mb-5 text-2xl font-bold">

        </button>
        <button class="block mb-5 text-2xl font-semibold">

        </button>
      </div>
      <div class="relative mt-20 mr-10 w-full">
        <Transition>
          <div v-if="filterApplications === 'all'" class="grid grid-cols-1 absolute w-full">
            <ApplicationCard v-for="application in frameApplicationsStore.personalFrameApplications"
              :application="application" @delete="frameApplicationsStore.deleteApplication(application.applicationId!)"
              :key="application.applicationId">
            </ApplicationCard>
          </div>
          <div v-else-if="filterApplications === 'approved'" class="grid grid-cols-1 absolute w-full">
            <template v-for="application in frameApplicationsStore.personalFrameApplications">
              <ApplicationCard v-if="application.status === FrameApplicationStatus.APPROVED"
                :application="application"
                :key="application.applicationId">
              </ApplicationCard>
            </template>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useUserStore } from "~/stores/userStore";
import { FrameApplicationStatus } from "~/types/types";

const radioToggler = ref("application");
const filterApplications = ref("all")
const frameApplicationsStore = useFrameApplicationsStore();
const userStore = useUserStore();

onMounted(async () => {
  await frameApplicationsStore.getApplicationsByFrameId(
    userStore.user!.userId!
  );
});

onUpdated(async () => {
  await frameApplicationsStore.getApplicationsByFrameId(
    userStore.user!.userId!
  );
});

function handle() {
  console.log(userStore.getUser());
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
