<template>
  <header class="flex justify-center items-end bg-purple w-full h-44">
    <RadioGroup v-model="radioToggler" class="flex">
      <RadioGroupOption value="application">
        <div
          class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg class="inline-block" type="svg" src="/frames/invites.svg" />
          Заявки на стажировку
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="statistic">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg
            class="inline-block"
            type="svg"
            src="/curators/leaderboard.svg"
          />
          Статистика
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="need">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg class="inline-block" type="svg" src="/curators/badge.svg" />
          Потребность в стажерах
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </header>
  <div class="container mx-auto">
    <component
      :is="listComponents[radioToggler as keyof typeof listComponents]"
    />
  </div>
</template>

<script setup lang="ts">
import NeedInterns from "~/components/curators/NeedInterns.vue";
import ListCandidates from "~/components/curators/ListCandidates.vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";

const radioToggler = ref("need");
const listComponents = { need: NeedInterns, application: ListCandidates };
</script>
