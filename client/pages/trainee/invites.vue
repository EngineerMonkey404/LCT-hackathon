<template>
  <div
    class="lg:container lg:mx-auto flex justify-between mt-10 max-xl:adaptive-flex-col max-lg:px-3"
  >
    <div class="text-xl font-medium mr-20 max-xl:mr-0">
      <RadioGroup v-model="filter" class="max-xl:flex max-xl:gap-x-5">
        <RadioGroupOption
          v-slot="{ checked }"
          class="mb-5"
          :value="FrameApplicationFilter.AVAILABLE"
        >
          <span :class="checked ? 'font-bold' : ''" class="cursor-pointer">
            <img
              class="inline"
              type="svg"
              src="/trainee/approval_delegation.svg"
            />
            Доступные места
          </span>
        </RadioGroupOption>
        <RadioGroupOption
          v-slot="{ checked }"
          class="mb-5"
          :value="FrameApplicationFilter.SENDED"
        >
          <span :class="checked ? 'font-bold' : ''" class="cursor-pointer">
            <img
              class="inline"
              type="svg"
              src="/trainee/markunread_mailbox.svg"
            />
            Отправленные заявки
          </span>
        </RadioGroupOption>
      </RadioGroup>
    </div>
    <div class="w-full grid grid-cols-2 gap-10 max-lg:gap-5 max-md:grid-cols-1">
      <AvailableInvites :filter="filter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvailableInvites from "~/components/trainee/AvailableInvites.vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { FrameApplicationFilter } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useUserStore } from "~/stores/userStore";

const frameApplicationsStore = useFrameApplicationsStore();
const userStore = useUserStore();
await frameApplicationsStore.getApprovedFrameApplications();

if (userStore.user && userStore.user.userId)
  await frameApplicationsStore.getTraineeFrameApplications(
    userStore.user.userId
  );
console.log(frameApplicationsStore.traineeFrameApplicationIds);
frameApplicationsStore.getFilteredFrameApplications(
  FrameApplicationFilter.SENDED
);
console.log(frameApplicationsStore.currentApplication);
const filter = ref<FrameApplicationFilter>(FrameApplicationFilter.AVAILABLE);
</script>

<style scoped>
span {
  @apply pb-10;
}
</style>
