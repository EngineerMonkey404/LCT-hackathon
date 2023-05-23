<template>
  <header class="flex justify-center items-end bg-purple w-full h-44">
    <RadioGroup v-model="radioToggler" class="flex">
      <RadioGroupOption value="application">
        <div class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out">

          <NuxtImg class="inline-block" type="svg" src="/candidate/lightbulb.svg" />
          Подать заявку
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="careerSchool" :disabled="true">
        <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
          <NuxtImg class="inline-block" type="svg" src="/candidate/school.svg" />
          Карьерная школа
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="test" :disabled="true">
        <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
          <NuxtImg class="inline-block" type="svg" src="/candidate/glyphs.svg" />
          Тестирование
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </header>
  <div v-if="radioToggler === 'application'" class=" flex justify-center items-stretch w-full">
    <div class="relative mt-10 mr-10 w-1/2">
      <EditCandidateApplication v-if="application.city" :application="application" class="w-full"
      :class="{
        'blur-sm':
          status === FrameApplicationStatus.PENDING ||
          status === FrameApplicationStatus.DECLINED,
      }" />
      <CandidateApplication v-else class="w-full"/>
      <div v-if="status === FrameApplicationStatus.PENDING"
        class="absolute w-full  h-full bg-black/20 rounded-3xl top-0 flex flex-col justify-center items-center">
        <div class="mb-10 text-5xl font-bold">Заявка проверяется</div>
        <div class="text-center flex">
          <button @click="status = FrameApplicationStatus.EDIT" class="form-auth-input border bg-black text-white me-5 black-btn-hover">
            Редактировать
          </button>
        </div>
      </div>
    </div>
    <component class="mt-10" @careerSchool="radioToggler = 'careerSchool'"
      :is="listStatus[application.status as keyof typeof listStatus]" />
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { FrameApplicationStatus, ICandidateApplication } from "~/types/types";
import DeclinedStatus from "~/components/candidate/DeclinedStatus.vue";
import ApprovedStatus from "~/components/candidate/ApprovedStatus.vue";
import PendingStatus from "~/components/candidate/PendingStatus.vue";
import EditCandidateApplication from "~/components/candidate/EditCandidateApplication.vue";

const radioToggler = ref("application");
const application: ICandidateApplication = {
  candidateId: 1,
  direction: '123',
  date: new Date(),
  nationality: '123',
  city: '123',
  experience: true,
  position: ['qwe', 'qwe'],
  status: FrameApplicationStatus.PENDING,
}
const listStatus = {
  [FrameApplicationStatus.APPROVED]: ApprovedStatus,
  [FrameApplicationStatus.DECLINED]: DeclinedStatus,
  [FrameApplicationStatus.PENDING]: PendingStatus,
}
const status = ref(application.status)
</script>

<style scoped></style>
