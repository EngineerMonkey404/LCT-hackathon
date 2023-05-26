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
    <div class="mt-10 grid grid-cols-3">
      <div class="style-flex-col">
        <div class="category text-lg text-center">Русский язык</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ trainee.candidateApplication.russianLanguageTestResult ?? 0 }}
        </span>
      </div>
      <div class="style-flex-col">
        <div class="category text-lg text-center">Анализ информации</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ trainee.candidateApplication.informationAnalysisTestResult ?? 0 }}
        </span>
      </div>
      <div class="style-flex-col">
        <div class="category text-lg text-center">Компюьтерная грамотность</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ trainee.candidateApplication.computerLiteracyTestResult ?? 0 }}
        </span>
      </div>
    </div>
    <div class="flex mt-5">
      <div class="mr-20">
        <div class="text-2xl font-semibold">Гражданство</div>
        <div class="form-auth-input">{{ trainee.candidateApplication.nationality }}</div>
      </div>
      <div>
        <div class="text-2xl font-semibold">Город</div>
        <div class="form-auth-input">{{ trainee.candidateApplication.city }}</div>
      </div>
    </div>
    <div class="text-2xl font-semibold mt-5 mb-2">Образование</div>
    <div class="flex">
      <div class="form-auth-input mr-20">{{ trainee.candidateApplication.education }}</div>
      <div class="form-auth-input">{{ trainee.candidateApplication.course }}</div>
    </div>
    <div class="text-2xl font-semibold mt-5 mb-3">Опыт работы</div>
    <div v-if="!trainee.candidateApplication.experience" class="text-xl">Нет опыта</div>
    <div class="text-xl" v-else>Есть опыт</div>
    <!-- need position -->
    <!-- <div v-for="job of trainee.candidateApplication.position" class="mb-3">
      <div class="form-auth-input">{{ job.value }}</div>
    </div> -->
    {{ trainee.userId }}
    <div class="flex items-center gap-x-10 mt-5">
      <div @click="mentorApplicationStore.mentorSubmitApplication(+route.params.id,
            trainee.userId!, FrameApplicationStatus.APPROVED)"
          class="black-btn text-center py-1">
        Пригласить на собеседование
      </div>
      <div @click="mentorApplicationStore.mentorSubmitApplication(+route.params.id,
            trainee.userId!, FrameApplicationStatus.DECLINED)"
      class="black-btn text-center py-4">Отказать</div>
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
