<template>
    <div class="container mx-auto">
        <div v-if="trainees?.length">
            <div class="text-4xl text-center mb-20 mt-10">На эту стажировку откликнулись</div>
            <div class="grid grid-cols-2 gap-10">
                <div v-for="trainee of trainees">
                    <TraineeCard :trainee="trainee" />
                </div>
            </div>
        </div>
        <div v-else class="text-4xl text-center mb-20 mt-10">
            На эту стажировку пока не откликнулись
        </div>
    </div>
</template>

<script setup lang="ts">
import {  IFrameApplication, ITrainee } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import { useTraineeStore } from "~/stores/traineeStore";
import TraineeCard from "~/components/trainee/TraineeCard.vue";

const route = useRoute();
const frameApplicationStore = useFrameApplicationsStore();
const application: IFrameApplication | null =
  await frameApplicationStore.getFrameApplicationById(+route.params.id);

const numberWork = ref(application?.workExperience.length || 1);
const workExperience = ref<string[]>(
  application?.workExperience.map((element) => element.value) || []
);
const traineeStore = useTraineeStore();
const trainees = ref< ITrainee[] | null>([])

onMounted(async () =>{
    trainees.value = await traineeStore.getTraineesByApplicationId(application?.applicationId ?? 0)
})
console.log(+route.query.application_id!);
console.log(application);

</script>

<style scoped>

</style>