<template>
  <div v-for="application of frameApplicationsStore.allApprovedFrameApplications">
    <div class="relative shadow-slate-500 shadow-lg border-black border rounded-3xl w-full mb-20">
      <div class="p-10">
        <div class="flex justify-between text-3xl font-bold">
          <div v-if="application.position">
            {{ application.position }}
          </div>
          <div>{{ application.organization }}</div>
        </div>
        <hr class="mt-5 w-full" />
        <div class="font-semibold text-3xl mt-10 mb-3">Описание</div>
        <p class="text-2xl">{{ application.description }}</p>
        <div class="font-semibold text-3xl mt-10 mb-5">Опыт работы</div>
        <div class="mb-10 flex gap-x-5">
          <div v-for="(exp, index) of application.workExperience" :key="index" class="mb-8">
            <span class="form-auth-input text-xl">{{ exp.value }}</span>
          </div>
        </div>
      </div>
      <div class="mb-20 mx-10 flex justify-between">
        <button @click="setIsOpen(true, application.applicationId)">
          Оставить заявку
        </button>
        <button @click="handleMap(application)">Посмотреть на карте</button>
      </div>
    </div>
  </div>
  <MapComp ref="map" :application="applicationCurrent!" />
    <Dialog class="absolute top-0 z-10 w-screen bg-black/40"
    :open="isOpen" @close="setIsOpen">
    <div class="flex min-h-screen items-center justify-center p-4 text-center ">
      <DialogPanel class="card-style w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left 
                    align-middle transition-all">
        <div class="text-3xl font-semibold text-center">
          Для отклика на эту стажировку Вам необходимо пройти тестовое задание
        </div>
        <div class="flex justify-between mt-10 px-10">
          <button @click="handleApplication(currentApplicationId!)">Пройти</button>
          <button @click="setIsOpen(false)">Позже</button>
        </div>
      </DialogPanel>
    </div>
    </Dialog>
</template>

<script setup lang="ts">
//import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import MapComp from "./MapComp.vue";
import { useUserStore } from "~/stores/userStore";
import { useTraineeStore } from "~/stores/traineeStore";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { IFrameApplication } from "~/types/types";
import {
  Dialog,
  DialogPanel,
} from '@headlessui/vue'

const isOpen = ref(false)

function setIsOpen(value: boolean, applicationId?: number) {
  if (applicationId) currentApplicationId.value = applicationId;
  isOpen.value = value;
}

//need application withou trainee
const frameApplicationsStore = useFrameApplicationsStore();
const traineeStore = useTraineeStore();
const userStore = useUserStore();
const applicationCurrent = ref<IFrameApplication>()

const map = ref<InstanceType<typeof MapComp> | null>(null);

//for modal dialog
const currentApplicationId = ref<number>();

await frameApplicationsStore.getApprovedFrameApplications()

function handleMap(application: IFrameApplication) {
  map.value?.open();
  applicationCurrent.value = application;
  console.log(applicationCurrent.value);
}

function handleApplication(applicationId: number) {
  //traineeStore.submitTraineeRespond(applicationId, userStore.user?.userId!);
  return navigateTo(`/trainee/solve-test/${applicationId}`)
}

//const applications = await frameApplicationsStore.getApprovedFrameApplications();

/* async function checkTraineeInApllication(applicationId: number) {          huynya
  const traineesId = await traineeStore.getTraineesByApplicationId(applicationId)
  return traineesId?.includes(userStore.user?.userId!)
}  */
</script>
  
<style scoped>
button {
  @apply black-btn
}
</style>
  