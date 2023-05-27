<template>
  <div
    class="shadow-slate-500 shadow-lg border-black border rounded-3xl w-full mb-20"
  >
    <div class="p-10">
      <div class="text-3xl font-bold">
        <div>{{ props.application.position }}</div>
        <div class="category">{{ props.application.organization.name }}</div>
      </div>
      <hr class="mt-5 w-full" />
      <div class="category mt-3 mb-3">Описание</div>
      <p class="text-2xl break-words max-lg:text-xl">{{ props.application.description }}</p>
      <div class="category mt-3 mb-5">Опыт работы</div>
      <div class="mb-3 flex gap-x-5">
        <div
          v-for="(exp, index) of props.application.workExperience"
          :key="index"
          class="mb-8"
        >
          <span class="form-auth-input text-xl">{{ exp.value }}</span>
        </div>
      </div>
      <div class="flex gap-x-10 text-3xl font-bold max-sm:gap-x-5">
        <button
          @click="
            frameApplicationsStore.submitCuratorRespond(
              application.applicationId!,
              FrameApplicationStatus.APPROVED
            )
          "
        >
          <NuxtImg style="height: 20px !important;" type="svg" src="/curators/check.svg" />
        </button>
        <button
          @click="
            frameApplicationsStore.submitCuratorRespond(
              application.applicationId!,
              FrameApplicationStatus.DECLINED
            )
          "
        >
          <NuxtImg style="height: 20px !important;" type="svg" src="/curators/close.svg" />
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
  @apply black-btn px-5;
}
</style>
