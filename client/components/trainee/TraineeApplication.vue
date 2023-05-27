<template>
  <div class="shadow-slate-500 shadow-lg border-black border rounded-3xl">
    <div class="p-10">
      <div class="flex flex-col justify-between">
        <div v-if="props.application.position" class="text-2xl max-md:text-xs font-bold mb-4">
          {{ props.application.position }}
        </div>
        <div class="text-xl max-md:text-xs">{{ props.application.organization.name }}</div>
      </div>
      <hr class="mt-5" />
      <div class="font-semibold mt-10 mb-3 text-xl">Описание</div>
      <p class="text-xl max-md:text-xs break-words">{{ props.application.description }}</p>
      <div class="font-semibold mt-10 mb-5">Опыт работы</div>
      <div class="flex gap-x-5">
        <div
          v-for="(exp, index) of props.application.workExperience"
          :key="index"
          class="mb-8"
        >
          <span class="form-auth-input">{{ exp.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IFrameApplication } from "~/types/types";
const props = defineProps<{ application: IFrameApplication }>();
</script>

<style scoped></style>
