<template>
    <div v-for="application of traineeStore.getApplicationsByTraineeId(userStore.user?.userId!)">
        <div class="relative shadow-slate-500 shadow-lg border-black border rounded-3xl w-full mb-20">
            <div class="p-10">
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
            </div>
            <div class="mb-20 mx-10 flex justify-between">
                <button>Посмотреть на карте</button>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { useTraineeStore } from "~/stores/traineeStore";

const traineeStore = useTraineeStore();
const userStore = useUserStore();
</script>
    
<style scoped>
button {
    @apply black-btn
}
</style>