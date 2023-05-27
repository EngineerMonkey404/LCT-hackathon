<template>
  <div class="xl:container mx-auto max-xl:px-3">
    <div v-if="trainees?.length">
      <div class="text-4xl text-center mb-20 mt-10 max-lg:mt-5">
        На эту стажировку откликнулись
      </div>
      <div
        class="grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-x-5"
      >
        <div v-for="(trainee, index) of trainees" :key="index">
          <MentorTraineeCard
            :trainee="trainee"
            @sub="handleSubmitTrainee($event, trainee)"
          />
        </div>
      </div>
    </div>
    <div v-else class="text-4xl text-center mb-20 mt-10">
      На эту стажировку пока не откликнулись
    </div>
  </div>
</template>

<script setup lang="ts">
import { IFrameApplication, ITrainee, MentorStatus } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useTraineeStore } from "~/stores/traineeStore";
import MentorTraineeCard from "~/components/trainee/MentorTraineeCard.vue";
import { useMentorApplicationStore } from "~/stores/mentorApplicationStore";

const route = useRoute();
const frameApplicationStore = useFrameApplicationsStore();
const application: IFrameApplication | null =
  await frameApplicationStore.getFrameApplicationById(+route.params.id);
const mentorApplicationStore = useMentorApplicationStore();
const traineeStore = useTraineeStore();
const trainees = ref<ITrainee[] | null>([]);

trainees.value = await traineeStore.getTraineesForMentorByApplicationId(
  application?.applicationId ?? 0
);

async function handleSubmitTrainee(status: MentorStatus, trainee: ITrainee) {
  await mentorApplicationStore.mentorSubmitApplication(
    +route.params.id,
    trainee.userId!,
    status
  );

  trainees.value = await traineeStore.getTraineesForMentorByApplicationId(
    application?.applicationId ?? 0
  );
}
</script>

<style scoped></style>
