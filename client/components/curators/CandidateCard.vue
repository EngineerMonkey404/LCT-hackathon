<template>
    <div class="flex flex-col justify-between p-10 shadow-slate-500 shadow-xl rounded-3xl"
         v-if="props.application.status === FrameApplicationStatus.PENDING">
        <div class="flex justify-between">
            <div class="text-2xl font-bold">
                <div>{{ userStore.user?.firstName }} {{ userStore.user?.secondName }}</div>
                <div>{{ userStore.user?.thirdName }}</div>
                <div class="text-xl">Будет юзер возраст</div>
            </div>
            <NuxtImg class="block" type="svg" src="/candidate/faceCandidate.svg" />
        </div>
        <hr class="w-full mt-5">
        <div class="flex mt-10 justify-between">
            <div>
                <div class="text-2xl font-semibold">Гражданство</div>
                <div class="form-auth-input">{{ application.nationality }}</div>
            </div>
            <div>
                <div class="text-2xl font-semibold">Город</div>
                <div class="form-auth-input">{{ application.city }}</div>
            </div>
        </div>
        <div class="text-2xl font-semibold mt-5 mb-2">Образование</div>
        <div>
            <div class="form-auth-input mb-3">надо поучиться</div>
            <div  class="form-auth-input">несколько лет</div>
        </div>
        <div class="text-2xl font-semibold mt-5 mb-3">Опыт работы</div>
        <div class="text-xl" v-if="!application.experience">Нет опыта</div>
        <div class="mb-3"
             v-for="job of application.position"
        >
            <div class="form-auth-input">{{ job }}</div>
        </div>
        <div class=" flex justify-between mt-10"> <!--пофиксить кнопки-->
            <button @click="candidateApplicationStore.submitCandidateApplication(application.applicationId!, FrameApplicationStatus.APPROVED)">
                <NuxtImg type="svg" src="/curators/check.svg" />
            </button>
            <button @click="candidateApplicationStore.submitCandidateApplication(application.applicationId!, FrameApplicationStatus.DECLINED)">
                <NuxtImg type="svg" src="/curators/close.svg" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';
import { useCandidateApplicationStore } from '~/stores/candidateApplicationStore';
import { ICandidateApplication, FrameApplicationStatus } from '~/types/types';
const userStore = useUserStore();
const props = defineProps<{ application: ICandidateApplication }>();
const candidateApplicationStore = useCandidateApplicationStore();

</script>

<style scoped>
button {
    @apply form-auth-input bg-black black-btn-hover text-white px-8;
}
</style>