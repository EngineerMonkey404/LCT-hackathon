<template>
  <div
    class="card-style px-20 py-48 text-4xl font-semibold text-center flex flex-col justify-center items-center max-lg:text-3xl"
  >
    <div class="mb-20 max-lg:mb-32">
      Анализ
      <br />
      информации
    </div>
    <div
      v-if="
        !candidateApplicationStore.personalCandidateApplication
          ?.informationAnalysisTestResult
      "
      class="black-btn text-2xl max-lg:text-lg"
      @click="handleResult"
    >
      Пройти тестирование
    </div>
    <div
      v-if="
        candidateApplicationStore.personalCandidateApplication
          ?.informationAnalysisTestResult
      "
      class="form-auth-input max-lg:text-3xl"
    >
      {{
        candidateApplicationStore.personalCandidateApplication
          ?.informationAnalysisTestResult
      }}/100
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";

const candidateApplicationStore = useCandidateApplicationStore();

function handleResult() {
  //need api for test result
  const result = Math.round(Math.random() * 100);
  candidateApplicationStore.informationAnalysis(
    candidateApplicationStore.personalCandidateApplication?.applicationId ?? 0,
    result
  );
}
</script>

<style scoped></style>
