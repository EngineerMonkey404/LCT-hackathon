<template>
  <div
    v-for="application of frameApplicationsStore.allApprovedFrameApplications"
  >
    <div
      class="relative shadow-slate-500 shadow-lg border-black border rounded-3xl w-full mb-20"
    >
      <div class="p-10">
        <div class="flex flex-col gap-x-20">
          <div v-if="application.position" class="mb-4 text-3xl font-semibold">
            {{ application.position }}
          </div>
          <div class="text-2xl">
            {{ application.organization.name }}
          </div>
        </div>
        <hr class="mt-5 w-full" />
        <div class="font-semibold text-3xl mt-10 mb-3">Описание</div>
        <p class="text-2xl">{{ application.description }}</p>
        <div class="font-semibold text-3xl mt-10 mb-5">Опыт работы</div>
        <div class="mb-10 flex gap-x-5">
          <div
            v-for="(exp, index) of application.workExperience"
            :key="index"
            class="mb-8"
          >
            <span class="form-auth-input text-xl">{{ exp.value }}</span>
          </div>
        </div>
      </div>
      <div class="mb-20 mx-10 flex justify-between">
        <button @click="handleApplication(application.applicationId!)">
          Оставить заявку
        </button>
        <button @click="handleMap(application)">Посмотреть на карте</button>
      </div>
    </div>
  </div>
  <MapComp
    v-if="applicationCurrent"
    ref="map"
    :application="applicationCurrent"
  />
</template>

<script setup lang="ts">
import MapComp from "./MapComp.vue";
import { useUserStore } from "~/stores/userStore";
import { useTraineeStore } from "~/stores/traineeStore";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { IFrameApplication } from "~/types/types";

//need application withou trainee
const frameApplicationsStore = useFrameApplicationsStore();
const traineeStore = useTraineeStore();
const userStore = useUserStore();
const applicationCurrent = ref<IFrameApplication>();

const map = ref<InstanceType<typeof MapComp> | null>(null);

await frameApplicationsStore.getApprovedFrameApplications();

function handleMap(application: IFrameApplication) {
  map.value?.open();
  applicationCurrent.value = application;
  console.log(applicationCurrent.value);
}

function handleApplication(applicationId: number) {
  //traineeStore.submitTraineeRespond(applicationId, userStore.user?.userId!);
  return navigateTo(`/trainee/solve-test/${applicationId}`);
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
