<template>
  <div>
    <ListCandidates />
  </div>
</template>

<script setup lang="ts">
import ListCandidates from "~/components/curators/ListCandidates.vue";
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";

const candidateApplicationStore = useCandidateApplicationStore();
await candidateApplicationStore.getAllCandidateApplications();
</script>

<style scoped></style>
