<template>
  <div class="lg:container lg:mx-auto">
    <h2 class="text-center text-3xl my-8">
      <strong>Заявки</strong>
      | Тестовые задания
    </h2>
    <div class="flex w-full max-md:adaptive-flex-col max-md:px-5">
      <div class="me-10 max-lg:ml-3 max-md:text-center">
        <NuxtLink to="/frame/create-frame-application">
          <button
            class="black-btn text-2xl font-semibold mb-3 max-md:text-xl max-md:w-full"
            @click="testStore.creationTest.length = 0"
          >
            Создать заявку <span class="max-md:hidden">на стажера</span>
          </button>
        </NuxtLink>
        <RadioGroup class="max-md:flex max-md:gap-x-3" v-model="filterApplications">
          <RadioGroupOption
            v-slot="{ checked }"
            class="mb-4"
            :value="FilterApplications.ALL"
          >
            <div :class="checked ? 'radio-btn font-bold' : 'radio-btn'">
              <NuxtImg type="svg" src="/frames/cases.svg" class="inline" />
              Ваши заявки
            </div>
          </RadioGroupOption>
          <RadioGroupOption
            v-slot="{ checked }"
            :value="FilterApplications.APPROVED"
          >
            <div :class="checked ? 'radio-btn font-bold' : 'radio-btn'">
              <NuxtImg
                type="svg"
                src="/frames/library_add_check.svg"
                class="inline"
              />
              Проверенные заявки
            </div>
          </RadioGroupOption>
        </RadioGroup>
      </div>
      <div class="relative mt-19 mr-10 w-full max-md:mx-5">
        <Transition>
          <div v-if="filterApplications === FilterApplications.ALL">
            <ApplicationCard
              v-for="application in frameApplicationsStore.personalFrameApplications"
              :key="application.applicationId"
              :application="application"
            >
              >
            </ApplicationCard>
          </div>
          <div
            v-else-if="filterApplications === FilterApplications.APPROVED"
            class=""
          >
            <ApprovedAplications />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//не обновляется список на странице (в базе норм)
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useUserStore } from "~/stores/userStore";
import { definePageMeta } from "#imports";
import ApprovedAplications from "~/components/frame/ApprovedAplications.vue";
import { useTestStore } from "~/stores/testStore";

const radioToggler = ref("application");

enum FilterApplications {
  ALL = "all",
  APPROVED = "approved",
}
const testStore = useTestStore();
const filterApplications = ref<FilterApplications>(FilterApplications.ALL);
const frameApplicationsStore = useFrameApplicationsStore();
const userStore = useUserStore();

await frameApplicationsStore.getApplicationsByFrameId(userStore.user!.userId!);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
