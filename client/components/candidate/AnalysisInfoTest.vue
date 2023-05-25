<template>
    <div class="card-style px-20 py-48 text-4xl font-semibold text-center flex flex-col justify-center items-center">
        <div class="mb-20">Анализ<br/>информации</div>
        <div @click="handleResult" v-if="!candidateApplicationStore.personalCandidateApplication?.informationAnalysisTestResult"
             class="black-btn text-2xl ">
             Пройти тестирование
        </div>
        <div v-if="candidateApplicationStore.personalCandidateApplication?.informationAnalysisTestResult"
             class="form-auth-input text-5xl">
             {{ candidateApplicationStore.personalCandidateApplication?.informationAnalysisTestResult }}/100
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCandidateApplicationStore } from '~/stores/candidateApplicationStore';

const candidateApplicationStore = useCandidateApplicationStore();

function handleResult() {
    //need api for test result
    let result = Math.round(Math.random() * 100);
    candidateApplicationStore.informationAnalysis(candidateApplicationStore.personalCandidateApplication?.applicationId ?? 0, result);
}
</script>

<style scoped>

</style>