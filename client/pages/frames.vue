<template>
    <header class="flex justify-center items-end bg-purple w-full h-44">
        <RadioGroup class="flex" v-model="radioToggler">
            <RadioGroupOption value="application">
                <div class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/frames/invites.svg" />
                    Заявки
                </div>
            </RadioGroupOption>
            <RadioGroupOption value="careerSchool" v-model="radioToggler">
                <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/candidate/school.svg" />
                    Школа наставников
                </div>
            </RadioGroupOption>
            <RadioGroupOption value="test" v-model="radioToggler">
                <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/candidate/glyphs.svg" />
                    Расписание стажера
                </div>
            </RadioGroupOption>
            <RadioGroupOption value="test" v-model="radioToggler">
                <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/candidate/glyphs.svg" />
                    Рейтинг
                </div>
            </RadioGroupOption>
        </RadioGroup>
    </header>
    <div class="">
        <h1 class="text-center text-3xl mt-8"><strong>Заявки</strong> | Тестовые задания</h1>
        <div class="flex w-full">
            <div class="w-1/5 ml-44">
                <button @click="createVacancie" class="block mb-5 form-auth-input text-white bg-black text-2xl font-semibold black-btn-hover">
                    Создать заявку на стажера
                </button>
                <button class="block mb-5 text-2xl font-bold">
                    <NuxtImg type="svg" src="/frames/cases.svg" class="inline" />
                    Ваши заявки
                </button>
                <button class="block mb-5 text-2xl font-semibold">
                    <NuxtImg type="svg" src="/frames/library_add_check.svg" class="inline" />
                    Проверенные заявки
                </button>
            </div>
            <div class="grid grid-cols-1 mt-20 mr-10 w-full">
                <Vacancie class="shadow-slate-500 shadow-xl rounded-3xl w-full mb-10" v-for="vacancie in listVacancie">
                    <template #job>{{ vacancie.job }}</template>
                    <template #organization>{{ vacancie.organization }}</template>
                    <template #description>{{ vacancie.description }}</template>
                    <template #workExpirience>
                        <div class="mb-8" v-for="exp of vacancie.workExpirience">
                            <span class="form-auth-input text-xl">{{ exp }}</span>
                        </div>
                    </template>
                </Vacancie>
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

const radioToggler = ref("application");
const store = useVacancieStore();
const listVacancie = ref(store.getVacancieList())

const createVacancie = () => {
    return navigateTo('/createVacancie')
}
</script>