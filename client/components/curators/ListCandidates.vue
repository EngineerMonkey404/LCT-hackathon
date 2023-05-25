<template>
  <div class="grid grid-cols-3 gap-10 mt-20">
    <!-- need filter by status + works -->
    <CandidateCard
      v-for="application of candidateApplicationStore.allCandidateApplications"
      :key="application.applicationId"
      :application="application"
    />
  </div>
</template>

<script setup lang="ts">
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";
import CandidateCard from "~/components/curators/CandidateCard.vue";

const candidateApplicationStore = useCandidateApplicationStore();
</script>

<style scoped></style>
