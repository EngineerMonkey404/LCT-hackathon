<template>
  <div
    v-if="props.application.status === FrameApplicationStatus.PENDING && user"
    class="flex flex-col justify-between p-10 shadow-slate-500 shadow-xl rounded-3xl"
  >
    <div class="flex justify-between">
      <div class="text-2xl font-bold">
        <div>{{ user.firstName }} {{ user.secondName }}</div>
        <div>{{ user.thirdName }}</div>
        <div v-if="date" class="text-xl">
          {{
            getYears(new Date(date)) +
            " " +
            declOfNum(getYears(new Date(date)), ["год", "года", "лет"])
          }}
        </div>
      </div>
      <NuxtImg
        class="block rounded-full"
        style="height: 100px; width: 100px"
        type="svg"
        :src="`http://localhost:5000/api/image/${application.candidateId}`"
      />
    </div>
    <hr class="w-full mt-5" />
    <div class="mt-10 grid grid-cols-3 mb-5">
      <div class="style-flex-col">
        <div class="category text-lg text-center">Русский язык</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ application.russianLanguageTestResult ?? 0 }}
        </span>
      </div>
      <div class="style-flex-col">
        <div class="category text-lg text-center">Анализ информации</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ application.informationAnalysisTestResult ?? 0 }}
        </span>
      </div>
      <div class="style-flex-col">
        <div class="category text-lg text-center">Компюьтерная грамотность</div>
        <span class="form-auth-input text-center text-xl mt-3 self-center">
          {{ application.computerLiteracyTestResult ?? 0 }}
        </span>
      </div>
    </div>
    <div class="flex mt-3 justify-between">
      <div class="mb-5">
        <div class="category">Гражданство</div>
        <div class="form-auth-input">{{ application.nationality }}</div>
      </div>
      <div>
        <div class="category">Город</div>
        <div class="form-auth-input">{{ application.city }}</div>
      </div>
    </div>
    <div class="category mt-5">Образование</div>
    <div>
      <div class="form-auth-input mb-2">{{ application.education }}</div>
      <div
        v-if="application.education === 'Неоконченное высшее'"
        class="form-auth-input"
      >
        {{ application.course }}
      </div>
    </div>
    <div class="category mt-5 mb-3">Опыт работы</div>
    <div v-if="!application.experience" class="text-xl">Нет опыта</div>
    <div v-for="job of application.position" class="mb-3">
      <div class="form-auth-input">{{ job.value }}</div>
    </div>
    <div class="flex justify-between mt-10">
      <!--пофиксить кнопки-->
      <button
        @click="
          candidateApplicationStore.submitCandidateApplication(
            application.applicationId!,
            FrameApplicationStatus.APPROVED
          )
        "
      >
        <NuxtImg type="svg" src="/curators/check.svg" />
      </button>
      <button
        @click="
          candidateApplicationStore.submitCandidateApplication(
            application.applicationId!,
            FrameApplicationStatus.DECLINED
          )
        "
      >
        <NuxtImg type="svg" src="/curators/close.svg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";
import {
  ICandidateApplication,
  FrameApplicationStatus,
  IUser,
} from "~/types/types";
const userStore = useUserStore();

const props = defineProps<{ application: ICandidateApplication }>();
const candidateApplicationStore = useCandidateApplicationStore();
const date = ref<Date>(new Date());
const user: IUser =
  (await userStore.getUserById(props.application.candidateId)) ?? {};
if (props.application) {
  date.value = props.application.date ?? new Date();
}
console.log(user);

function getYears(dob: Date) {
  const month_diff = Date.now() - dob.getTime();

  const age_dt = new Date(month_diff);

  const year = age_dt.getUTCFullYear();

  return Math.abs(year - 1970);
}

function declOfNum(n: number, text_forms: string[]) {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}
</script>

<style scoped>
button {
  @apply form-auth-input bg-black black-btn-hover text-white px-8;
}
</style>
