<template>
    <div class="grid grid-cols-3 gap-10 mt-20">
        <CandidateCard v-for="application of candidateApplicationStore.allCandidateApplications" :application="application"
            :key="application.applicationId" />
    </div>
</template>

<script setup lang="ts">
import { useCandidateApplicationStore } from '~/stores/candidateApplicationStore';
import CandidateCard from '~/components/curators/CandidateCard.vue';

const candidateApplicationStore = useCandidateApplicationStore();

onMounted(() => {
    candidateApplicationStore.getAllCandidateApplications();
})

/* onUpdated(() => {
    candidateApplicationStore.getAllCandidateApplications(); 
}) */

</script>

<style scoped></style>