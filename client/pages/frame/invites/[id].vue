<template>
  <div class="lg:container lg:mx-auto">
    <div v-if="trainees?.length">
      <div class="text-4xl text-center mb-20 mt-10">
        На эту стажировку откликнулись
      </div>
      <div
        class="grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-xl:px-3 max-md:gap-5 max-sm:grid-cols-1"
      >
        <div v-for="trainee of trainees">
          <TraineeCard
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
import { IFrameApplication, ITrainee, TraineeStatus } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useTraineeStore } from "~/stores/traineeStore";
import TraineeCard from "~/components/trainee/TraineeCard.vue";

const route = useRoute();
const frameApplicationStore = useFrameApplicationsStore();
const application: IFrameApplication | null =
  await frameApplicationStore.getFrameApplicationById(+route.params.id);

const traineeStore = useTraineeStore();
const trainees = ref<ITrainee[] | null>([]);

trainees.value = await traineeStore.getTraineesForFrameByApplicationId(
  application?.applicationId ?? 0
);

async function handleSubmitTrainee(status: TraineeStatus, trainee: ITrainee) {
  await frameApplicationStore.frameSubmitApplication(
    +route.params.id,
    trainee.userId!,
    status
  );

  trainees.value = await traineeStore.getTraineesForFrameByApplicationId(
    application?.applicationId ?? 0
  );
}

console.log(+route.query.application_id!);
console.log(application);
</script>

<style scoped></style>
