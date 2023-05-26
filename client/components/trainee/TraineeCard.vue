<template>
  <div class="flex flex-col justify-between card-style">
    <div class="flex justify-between">
      <div class="text-2xl font-bold">
        <div>{{ trainee.firstName }} {{ trainee.secondName }}</div>
        <div>{{ trainee.thirdName }}</div>
        <div v-if="trainee.candidateApplication.date" class="text-xl">{{ getYears(new
          Date(trainee.candidateApplication.date)) +
          " " +
          declOfNum(getYears(new Date(trainee.candidateApplication.date)), ["год", "года", "лет"]) }}
        </div>
      </div>
      <NuxtImg class="block" type="svg" src="/candidate/faceCandidate.svg" />
    </div>
    <hr class="w-full mt-5" />
    <div class="mt-10 grid grid-cols-3 max-lg:flex">
      <div class="style-flex-col">
        <div class="category text-lg text-center max-2xl:text-base">Русский язык</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ trainee.candidateApplication.russianLanguageTestResult ?? 0 }}
        </span>
      </div>
      <div class="style-flex-col">
        <div class="category text-lg text-center max-2xl:text-base">Анализ информации</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ trainee.candidateApplication.informationAnalysisTestResult ?? 0 }}
        </span>
      </div>
      <div class="style-flex-col">
        <div class="category text-lg text-center max-2xl:text-base">Компюьтерная грамотность</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ trainee.candidateApplication.computerLiteracyTestResult ?? 0 }}
        </span>
      </div>
    </div>
    <div class="flex mt-5">
      <div class="mr-20 max-md:mr-10">
        <div class="category mb-3">Гражданство</div>
        <div class="form-auth-input">{{ trainee.candidateApplication.nationality }}</div>
      </div>
      <div>
        <div class="category mb-3">Город</div>
        <div class="form-auth-input">{{ trainee.candidateApplication.city }}</div>
      </div>
    </div>
    <div class="category mt-5 mb-2">Образование</div>
    <div class="flex">
      <div class="form-auth-input mr-20">{{ trainee.candidateApplication.education }}</div>
      <div class="form-auth-input">{{ trainee.candidateApplication.course }}</div>
    </div>
    <div class="category mt-5 mb-3">Опыт работы</div>
    <div v-if="!trainee.candidateApplication.experience" class="text-xl">Нет опыта</div>
    <div v-for="job of trainee.candidateApplication.position" class="mb-3">
      <div class="form-auth-input">{{ job }}</div>
    </div>
    <div class="flex items-center gap-x-10 mt-5 max-lg:gap-x-5">
      <div @click="mentorApplicationStore.mentorSubmitApplication(+route.params.id,
            trainee.userId!, FrameApplicationStatus.APPROVED)"
          class="black-btn text-center py-1">
        Пригласить <span class="max-lg:hidden">на собеседование</span>
      </div>
      <div @click="mentorApplicationStore.mentorSubmitApplication(+route.params.id,
            trainee.userId!, FrameApplicationStatus.DECLINED)"
      class="black-btn text-center py-4 max-lg:py-1">Отказать</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITrainee, FrameApplicationStatus } from "~/types/types";
import { declOfNum, getYears } from "public/scripts/getAge";
import { useMentorApplicationStore } from "~/stores/mentorApplicationStore";

const mentorApplicationStore = useMentorApplicationStore();
const route = useRoute();
const props = defineProps<{ trainee: ITrainee }>();
</script>

<style scoped></style>
