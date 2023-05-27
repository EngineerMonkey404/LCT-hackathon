<template>
  <div
    class="relative flex shadow-slate-500 shadow-lg border-black border rounded-3xl mb-20"
  >
    <div
      class="p-10 max-lg:py-4"
      :class="{
        'blur-sm':
          application.status === FrameApplicationStatus.PENDING ||
          application.status === FrameApplicationStatus.DECLINED,
      }"
    >
      <div class="flex flex-col justify-between max-lg:text-xl">
        <div
          v-if="props.application.position"
          class="mb-4 font-bold text-3xl flex items-center"
        >
          <span
            v-if="props.application.status === FrameApplicationStatus.APPROVED"
          >
            <img
              class="bg-lime-400 rounded-full inline py-3 px-5 mr-5 my-2"
              type="svg"
              src="/curators/check.svg"
            />
          </span>
          {{ props.application.position }}
        </div>
        <div class="text-2xl font-semibold">
          {{ props.application.organization.name }}
          {{ props.application.direction }}
        </div>
      </div>
      <hr class="mt-5 w-full" />
      <div class="font-semibold text-3xl mt-10 mb-3 max-lg:text-xl">
        Описание
      </div>
      <div class="text-xl max-lg:text-lg break-all">
        {{ props.application.description }}
      </div>
      <div class="font-semibold text-3xl mt-10 mb-5 max-lg:text-xl">
        Опыт работы
      </div>
      <div class="flex gap-x-5 flex-wrap">
        <div
          v-for="(exp, index) of props.application.workExperience"
          :key="index"
          class="mb-8"
        >
          <span class="form-auth-input text-xl">{{ exp.value }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="application.status === FrameApplicationStatus.PENDING"
      class="absolute w-full h-full bg-black/20 top-0 rounded-3xl flex flex-col justify-center items-center"
    >
      <div class="mb-10 text-5xl font-bold max-lg:text-3xl text-center">
        Заявка проверяется
      </div>
      <div class="text-center flex">
        <NuxtLink :to="`/frame/edit/${application.applicationId}`">
          <div
            class="form-auth-input border bg-black text-white me-5 black-btn-hover"
          >
            Редактировать
          </div>
        </NuxtLink>
        <div
          class="form-auth-input border bg-black text-white black-btn-hover"
          @click="
            frameApplicationsStore.deleteApplication(application.applicationId!)
          "
        >
          Удалить
        </div>
      </div>
    </div>
    <div
      v-else-if="application.status === FrameApplicationStatus.DECLINED"
      class="absolute w-full h-full bg-black/20 top-0 rounded-3xl flex flex-col justify-center items-center"
    >
      <div class="mb-10 text-5xl font-bold max-lg:text-3xl text-center">
        Заявка отклонена
      </div>

      <div class="text-center flex">
        <div class="form-auth-input border bg-black text-white me-5">
          Просмотр
        </div>

        <div
          class="form-auth-input border bg-black text-white black-btn-hover"
          @click="
            frameApplicationsStore.deleteApplication(application.applicationId!)
          "
        >
          Удалить
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FrameApplicationStatus, IFrameApplication } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";

const frameApplicationsStore = useFrameApplicationsStore();

const props = defineProps<{ application: IFrameApplication }>();
</script>

<style scoped></style>
