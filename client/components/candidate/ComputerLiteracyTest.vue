<template>
    <div class="card-style px-20 py-48 text-4xl font-semibold text-center flex flex-col justify-center items-center max-lg:text-3xl">
        <div class="mb-20 max-lg:mb-32">Компьютерная<br />грамотность</div>
        <div @click="handleResult"
            v-if="!candidateApplicationStore.personalCandidateApplication?.computerLiteracyTestResult"
            class="black-btn text-2xl max-lg:text-lg">
            Пройти тестирование
        </div>
        <div v-if="candidateApplicationStore.personalCandidateApplication?.computerLiteracyTestResult"
            class="form-auth-input text-5xl max-lg:text-3xl">
            {{ candidateApplicationStore.personalCandidateApplication?.computerLiteracyTestResult }}/100
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCandidateApplicationStore } from '~/stores/candidateApplicationStore';

const candidateApplicationStore = useCandidateApplicationStore();

function handleResult() {
    //need api for test result
    let result = Math.round(Math.random() * 100);
    candidateApplicationStore.computerLiteracy(candidateApplicationStore.personalCandidateApplication?.applicationId ?? 0, result);
}
</script>

<style scoped></style>