<template>
  <div class="flex container mx-auto mt-10 justify-center">
    <div class="relative mr-10">
      <EditCandidateApplication
        v-if="
          candidateApplicationStore.personalCandidateApplication?.applicationId
        "
        class="w-full"
        :class="{
          'blur-sm':
            candidateApplicationStore.personalCandidateApplication.status ===
              FrameApplicationStatus.PENDING ||
            candidateApplicationStore.personalCandidateApplication.status ===
              FrameApplicationStatus.DECLINED,
        }"
      />
      <CandidateApplication v-else class="w-full" />
      <div
        v-if="
          candidateApplicationStore.personalCandidateApplication &&
          candidateApplicationStore.personalCandidateApplication.status ===
            FrameApplicationStatus.PENDING
        "
        class="absolute w-full h-full bg-black/20 rounded-3xl top-0 flex flex-col justify-center items-center"
      >
        <div class="mb-10 text-5xl font-bold">Заявка проверяется</div>
        <div class="text-center flex">
          <button
            class="form-auth-input border bg-black text-white me-5 black-btn-hover"
            @click="
              candidateApplicationStore.personalCandidateApplication.status =
                FrameApplicationStatus.EDIT
            "
          >
            Редактировать
          </button>
        </div>
      </div>
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
