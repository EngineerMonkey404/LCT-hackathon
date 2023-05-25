<template>
  <div
    class="relative shadow-slate-500 shadow-lg border-black border rounded-3xl w-full mb-20"
  >
    <div
      class="p-10"
      :class="{
        'blur-sm':
          application.status === FrameApplicationStatus.PENDING ||
          application.status === FrameApplicationStatus.DECLINED,
      }"
    >
      <div class="flex justify-between text-3xl font-bold">
        <div v-if="props.application.position">
          <span
            v-if="props.application.status === FrameApplicationStatus.APPROVED"
          >
            <NuxtImg
              class="bg-lime-400 rounded-full inline py-3 px-5 mr-5"
              type="svg"
              src="/curators/check.svg"
            />
          </span>
          {{ props.application.position }}
        </div>
        <div>
          {{ props.application.organization.name }}
          {{ props.application.direction }}
        </div>
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
    </div>
    <div
      v-if="application.status === FrameApplicationStatus.PENDING"
      class="absolute w-full h-full bg-black/20 top-0 rounded-3xl flex flex-col justify-center items-center"
    >
      <div class="mb-10 text-5xl font-bold">Заявка проверяется</div>
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
      <div class="mb-10 text-5xl font-bold">Заявка отклонена</div>

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
