<template>
  <div class="lg:container lg:mx-auto mt-10 flex justify-center xl:items-stretch max-xl:adaptive-flex-col max-xl:flex-col-reverse max-xl:mx-3">
    <div class="mr-10 max-xl:mr-0">
      <EditCandidateApplication
        v-if="
          candidateApplicationStore.personalCandidateApplication?.applicationId
        "
        class=""
      />
      <CandidateApplication class="" v-else/>
    </div>
    <component class="mb-5"
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
