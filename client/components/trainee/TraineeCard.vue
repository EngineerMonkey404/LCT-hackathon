<template>
    <div class="flex flex-col justify-between card-style">
        <div class="flex justify-between">
            <div class="text-2xl font-bold">
                <div>{{ trainee.firstName }} {{ trainee.secondName }}</div>
                <div>{{ trainee.thirdName }}</div>
                <div class="text-xl">{{ trainee.age }} лет</div>
            </div>
            <NuxtImg class="block" type="svg" src="/candidate/faceCandidate.svg" />
        </div>
        <hr class="w-full mt-5">
        <div class="flex mt-10">
            <div class="mr-20">
                <div class="text-2xl font-semibold">Гражданство</div>
                <div class="form-auth-input">{{ trainee.nationality }}</div>
            </div>
            <div>
                <div class="text-2xl font-semibold">Город</div>
                <div class="form-auth-input">{{ trainee.city }}</div>
            </div>
        </div>
        <div class="text-2xl font-semibold mt-5 mb-2">Образование</div>
        <div class="flex">
            <div class="form-auth-input mr-20">{{ trainee.education }}</div>
            <div class="form-auth-input">{{ trainee.course }}</div>
        </div>
        <div class="text-2xl font-semibold mt-5 mb-3">Опыт работы</div>
        <div class="text-xl" v-if="!trainee.experience">Нет опыта</div>
        <div class="mb-3" v-for="job of trainee.position">
            <div class="form-auth-input">{{ job.value }}</div>
        </div>
        {{ trainee.userId }}
    </div>
</template>

<script setup lang="ts">
import { ITrainee } from '~/types/types';
const props = defineProps<{ trainee: ITrainee }>();

</script>

<style scoped>

</style>