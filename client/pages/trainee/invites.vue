<template>
  <div class="container mx-auto flex justify-between mt-10">
    <div class="text-xl font-medium mr-20">
      <RadioGroup v-model="filter">
        <RadioGroupOption
          v-slot="{ checked }"
          class="mb-5"
          :value="FrameApplicationFilter.AVAILABLE"
        >
          <span :class="checked ? 'font-bold' : ''">Доступные места</span>
        </RadioGroupOption>
        <RadioGroupOption
          v-slot="{ checked }"
          class="mb-5"
          :value="FrameApplicationFilter.SENDED"
        >
          <span :class="checked ? 'font-bold' : ''">Отправленные заявки</span>
        </RadioGroupOption>
      </RadioGroup>
    </div>
    <div class="w-full grid grid-cols-2 gap-10">
      <AvailableInvites :filter="filter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvailableInvites from "~/components/trainee/AvailableInvites.vue";
import SendedInvites from "~/components/trainee/SendedInvites.vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { FrameApplicationFilter } from "~/types/types";

const filter = ref<FrameApplicationFilter>(FrameApplicationFilter.AVAILABLE);
</script>

<style scoped>
span {
  @apply pb-10;
}
</style>
