<template>
  <div class="flex container mx-auto mt-10 justify-center items-stretch">
    <div class="relative mr-10">
      <EditCandidateApplication
        v-if="
          candidateApplicationStore.personalCandidateApplication?.applicationId
        "
      />
      <CandidateApplication v-else/>
    </div>
    <component
      :is="listStatus[candidateApplicationStore.personalCandidateApplication?.status as keyof typeof listStatus]"
    />
  </div>
</template>

<script setup lang="ts">
import { FrameApplicationStatus } from "~/types/types";
import DeclinedStatus from "~/components/candidate/DeclinedStatus.vue";
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";
import { useUserStore } from "~/stores/userStore";
import ApprovedStatus from "~/components/candidate/ApprovedStatus.vue";
import PendingStatus from "~/components/candidate/PendingStatus.vue";
import EditCandidateApplication from "~/components/candidate/EditCandidateApplication.vue";

const candidateApplicationStore = useCandidateApplicationStore();
const userStore = useUserStore();

//Todo BLUR BLUR BLUR BLUR

const listStatus = {
  [FrameApplicationStatus.APPROVED]: ApprovedStatus,
  [FrameApplicationStatus.DECLINED]: DeclinedStatus,
  [FrameApplicationStatus.PENDING]: PendingStatus,
};

await candidateApplicationStore.getCandidateApplicationById(
  userStore.user!.userId!
);
</script>

<style scoped></style>
