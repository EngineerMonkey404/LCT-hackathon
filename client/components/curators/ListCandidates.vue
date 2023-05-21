<template>
    <div class="grid grid-cols-3 gap-10 mt-20">
        <CandidateCard v-for="application in applicationStore.listCandidatesApplications"
                        :application="application"
                        :key="application.birthday"
                        @confirm="application.status = 'confirm'"
                        @decline="application.status = 'decline'" />
    </div>
</template>

<script setup lang="ts">
import { useApplicationStore } from '~/stores/candidateApplicationStore';
import CandidateCard from '~/components/curators/CandidateCard.vue'
const applicationStore = useApplicationStore();

</script>

<style scoped></style>