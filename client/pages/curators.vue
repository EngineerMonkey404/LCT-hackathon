<template>
    <header class="flex justify-center items-end bg-purple w-full h-44">
        <RadioGroup class="flex" v-model="radioToggler">
            <RadioGroupOption value="application">
                <div class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/frames/invites.svg" />
                    Заявки на стажировку
                </div>
            </RadioGroupOption>
            <RadioGroupOption value="statistic" v-model="radioToggler">
                <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/curators/leaderboard.svg" />
                    Статистика
                </div>
            </RadioGroupOption>
            <RadioGroupOption value="need" v-model="radioToggler">
                <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/curators/badge.svg" />
                    Потребность в стажерах
                </div>
            </RadioGroupOption>
        </RadioGroup>
    </header>

    <div v-if="radioToggler === 'need'">
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
    </div>
</template>

<script setup lang="ts">
import {
    RadioGroup,
    RadioGroupOption,
} from '@headlessui/vue'
import { useVacancieStore } from '~/stores/vacancieStore';

const radioToggler = ref("need");
const store = useVacancieStore();
const listVacancie = ref(store.getVacancieList())

</script>