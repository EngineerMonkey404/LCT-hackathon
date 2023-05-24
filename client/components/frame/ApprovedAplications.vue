<template>
    <div v-for="application of frameApplicationsStore.approvedFrameApplications">
        <div class="relative w-full mb-20 card-style">
            <div class="flex justify-between text-3xl font-bold">
                <div v-if="application.position">
                    {{ application.position }}
                </div>
                <div>{{ application.organization }}</div>
            </div>
            <hr class="mt-5 w-full" />
            <div class="font-semibold text-3xl mt-10 mb-3">Описание</div>
            <p class="text-2xl">{{ application.description }}</p>
            <div class="font-semibold text-3xl mt-10 mb-5">Опыт работы</div>
            <div class="mb-10 flex gap-x-5">
                <div v-for="(exp, index) of application.workExperience" :key="index" class="mb-8">
                    <span class="form-auth-input text-xl">{{ exp.value }}</span>
                </div>
            </div>
            <div class="flex justify-between">
                <NuxtLink :to="`/frame/invites/${application.applicationId}`">
                    <div class="black-btn">
                        Назначить стажера
                    </div>
                </NuxtLink>
                <div class="flex">
                    <NuxtLink :to="`/frame/edit/${application.applicationId}`">
                        <div class="black-btn me-5">
                            Редактировать
                        </div>
                    </NuxtLink>
                    <div class="black-btn" @click="
                        frameApplicationsStore.deleteApplication(application.applicationId!)
                        ">
                        Удалить
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { FrameApplicationStatus, IFrameApplication } from "~/types/types";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";

const frameApplicationsStore = useFrameApplicationsStore();
import { useTraineeStore } from '~/stores/traineeStore';

</script>
  
<style scoped></style>