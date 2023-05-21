<template>
    <NuxtLink to="/createVacancie">qwe</NuxtLink>
        <h1 class="text-center text-3xl mt-8"><strong>От кадров</strong> | От стажеров</h1>
        <div class="flex w-full">
            <div class="grid grid-cols-1 mt-20 mx-10 w-full">
                <div class="mt-20 text-5xl font-semibold text-center" v-if="listVacancie">Пока нет заявок</div>
                <template v-for="vacancie in listVacancie" >
                    <div v-if="vacancie.status === 'unchecked'" class="shadow-slate-500 shadow-xl rounded-3xl w-full mb-10">
                        <Vacancie  >
                            <template #job>{{ vacancie.job }}</template>
                            <template #organization>{{ vacancie.organization }}</template>
                            <template #description>{{ vacancie.description }}</template>
                            <template #workExpirience>
                                <div class="mb-8" v-for="exp of vacancie.workExpirience">
                                    <span class="form-auth-input text-xl">{{ exp }}</span>
                                </div>
                            </template>
                        </Vacancie>
                        <button class="m-10 rounded-full px-10 py-3 text-xl text-white font-semibold bg-green-500" @click="vacancie.status = 'checked'">
                            Подтвердить
                        </button>
                    </div>
                </template>
            </div>
        </div>
</template>

<script setup lang="ts">
import { useVacancieStore } from '~/stores/frameApplicationStore';

const vacancieStore = useVacancieStore();
const listVacancie = ref(vacancieStore.getVacancieList())
</script>