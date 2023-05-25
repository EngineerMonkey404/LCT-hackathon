<template>
    <div class="container mx-auto mt-10 grid grid-cols-3 gap-10">
        <Russiantest />
        <AnalysisInfoTest />
        <ComputerLiteracyTest />
    </div>
</template>

<script setup lang="ts">
import Russiantest from '~/components/candidate/Russiantest.vue';
import AnalysisInfoTest from '~/components/candidate/AnalysisInfoTest.vue';
import ComputerLiteracyTest from '~/components/candidate/ComputerLiteracyTest.vue';
import { useCandidateApplicationStore } from '~/stores/candidateApplicationStore';
import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore();
const candidateApplicationStore = useCandidateApplicationStore();

await candidateApplicationStore.getCandidateApplicationById(userStore.user?.userId ?? 0)

</script>

<style scoped>
</style>