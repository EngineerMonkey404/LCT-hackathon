<template>
  <div
    v-for="application of frameApplicationsStore.getFilteredFrameApplications(
      props.filter
    )"
  >
    <div
      v-if="application"
      class="relative shadow-slate-500 shadow-lg border-black border rounded-3xl w-full mb-20"
    >
      <div class="p-10 max-md:p-5">
        <div class="flex flex-col">
          <div class="mb-4 text-3xl font-bold">
            {{ application.position }}
          </div>
          <div
            class="category mb-4 text-height"
            style="line-height: 1.2; height: 3.6em; text-overflow: clip"
          >
            {{ application.organization.name }}
          </div>
          <!--          <div-->
          <!--            v-if="filter === FrameApplicationFilter.SENDED"-->
          <!--            class="category font-semibold"-->
          <!--          >-->
          <!--            {{-->
          <!--              frameApplicationsStore.getApplicationStatus(-->
          <!--                application.applicationId!-->
          <!--              )-->
          <!--            }}-->
          <!--          </div>-->
        </div>
        <hr class="w-full" />
        <div class="category mt-5 mb-3">Описание</div>
        <div class="text-xl text-height max-md:text-lg">
          {{ application.description }}
        </div>
        <div class="category mt-5">Опыт работы</div>
        <div class="flex gap-x-5 max-md:gap-x-2 flex-wrap">
          <div
            v-for="(exp, index) of application.workExperience"
            :key="index"
            class="mt-5"
          >
            <span class="form-auth-input text-base">{{ exp.value }}</span>
          </div>
        </div>
      </div>
      <div
        class="mb-10 mx-10 flex justify-between max-lg:adaptive-flex-col max-lg:gap-y-3"
      >
        <button
          v-if="props.filter === FrameApplicationFilter.AVAILABLE"
          class="max-lg:w-full"
          @click="handleApplication(application.applicationId!)"
        >
          Оставить заявку
        </button>
        <button class="max-lg:w-full" @click="handleMap(application)">
          Посмотреть на карте
        </button>
      </div>
    </div>
  </div>
  <MapComp
    v-if="applicationCurrent"
    ref="map"
    :application="applicationCurrent"
  />
  <Dialog
    class="fixed top-0 z-10 w-screen bg-black/40"
    :open="isOpen"
    @close="setIsOpen"
  >
    <div class="flex min-h-screen items-center justify-center p-4 text-center">
      <DialogPanel
        class="card-style w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all"
      >
        <div class="text-3xl font-semibold text-center max-md:text-xl">
          Для отклика на эту стажировку Вам необходимо пройти тестовое задание
        </div>
        <div class="flex justify-between mt-10 px-10">
          <NuxtLink :to="`/trainee/solve-test/${currentApplicationId}`">
            <button>Пройти</button>
          </NuxtLink>
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
import { FrameApplicationFilter, IFrameApplication } from "~/types/types";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { useTestStore } from "~/stores/testStore";

const isOpen = ref(false);

function setIsOpen(value: boolean, applicationId?: number) {
  if (applicationId) currentApplicationId.value = applicationId;
  isOpen.value = value;
}

const props = defineProps<{ filter: FrameApplicationFilter }>();

const frameApplicationsStore = useFrameApplicationsStore();
const traineeStore = useTraineeStore();
const userStore = useUserStore();
const applicationCurrent = ref<IFrameApplication>();
const testStore = useTestStore();
const map = ref<InstanceType<typeof MapComp> | null>(null);

// frameApplicationsStore.getFilteredFrameApplications(
//   FrameApplicationFilter.SENDED
// );

const currentApplicationId = ref<number>();

function handleMap(application: IFrameApplication) {
  map.value?.open();
  applicationCurrent.value = application;
}

async function handleApplication(applicationId: number) {
  currentApplicationId.value = applicationId;
  await testStore.getTestByFrameApplicationId(applicationId);
  if (testStore.currentTest.length) {
    setIsOpen(true);
  } else {
    await traineeStore.submitTraineeRespond(
      applicationId,
      userStore.user!.userId!
    );
    await frameApplicationsStore.getTraineeFrameApplications(
      userStore.user!.userId!
    );
    testStore.currentTest.length = 0;
  }

  // return navigateTo(`/trainee/solve-test/${applicationId}`);
}

//const applications = await frameApplicationsStore.getApprovedFrameApplications();

/* async function checkTraineeInApllication(applicationId: number) {          huynya
  const traineesId = await traineeStore.getTraineesByApplicationId(applicationId)
  return traineesId?.includes(userStore.user?.userId!)
}  */
</script>

<style scoped>
button {
  @apply black-btn;
}

.yandex-container {
  height: 1000px;
  width: 1000px;
}

.yandex-balloon {
  width: 330px !important;
  height: 500px !important;
}
.ymaps-2-1-79-balloon {
  width: 330px !important;
  height: 500px !important;
  min-height: auto !important;
}
</style>
