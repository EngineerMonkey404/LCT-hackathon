<template>
  <div
    class="shadow-slate-500 shadow-lg border-black border rounded-3xl w-full mb-20"
  >
    <div class="p-10">
      <div class="flex justify-between text-3xl font-bold">
        <div>{{ props.application.position }}</div>
        <div>{{ props.application.organization.name }}</div>
      </div>
      <hr class="mt-5 w-full" />
      <div class="font-semibold text-3xl mt-10 mb-3">Описание</div>
      <p class="text-2xl">{{ props.application.description }}</p>
      <div class="font-semibold text-3xl mt-10 mb-5">Опыт работы</div>
      <div class="mb-10 flex gap-x-5">
        <div
          v-for="(exp, index) of props.application.workExperience"
          :key="index"
          class="mb-8"
        >
          <span class="form-auth-input text-xl">{{ exp.value }}</span>
        </div>
      </div>
      <div class="flex gap-x-10 text-3xl font-bold">
        <button
          @click="
            frameApplicationsStore.submitCuratorRespond(
              application.applicationId!,
              FrameApplicationStatus.APPROVED
            )
          "
        >
          <NuxtImg type="svg" src="/curators/check.svg" />
        </button>
        <button
          @click="
            frameApplicationsStore.submitCuratorRespond(
              application.applicationId!,
              FrameApplicationStatus.DECLINED
            )
          "
        >
          <NuxtImg type="svg" src="/curators/close.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FrameApplicationStatus, IFrameApplication } from "~/types/types";
import { useUserStore } from "~/stores/userStore";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";

const props = defineProps<{ application: IFrameApplication }>();
const userStore = useUserStore();
const frameApplicationsStore = useFrameApplicationsStore();
</script>

<style scoped>
button {
  @apply black-btn px-10;
}
</style>
