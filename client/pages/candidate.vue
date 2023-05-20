<template>
    <header class="flex justify-center items-end bg-purple w-full h-44">
        <RadioGroup class="flex" v-model="radioToggler">
            <RadioGroupOption value="application">
                <div class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/candidate/lightbulb.svg" />
                    Подать заявку
                </div>
            </RadioGroupOption>
            <RadioGroupOption value="careerSchool" v-model="radioToggler" :disabled="true">
                <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/candidate/school.svg" />
                    Карьерная школа
                </div>
            </RadioGroupOption>
            <RadioGroupOption value="test" v-model="radioToggler" :disabled="true">
                <div class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out">
                    <NuxtImg class="inline-block" type="svg" src="/candidate/glyphs.svg" />
                    Тестирование
                </div>
            </RadioGroupOption>
        </RadioGroup>
    </header>
    <div v-if="radioToggler === 'application'" class="flex justify-center items-stretch w-full">
        <CandidateApplication class="mt-10 mr-10" />
        <CandidateStatusApplication v-if="status === 'confirm'" class="mt-10" img="/candidate/confirm.svg">
            <template #content>
                Вы прошли на следующий этап отбора
            </template>
            <template #link>
                <button @click="radioToggler = 'careerSchool'" class="form-auth-input black-btn-hover bg-black text-white text-xl font-semibold">
                    Карьерная школа
                    <NuxtImg class="inline" type="svg" src="/candidate/arrow_right_alt.svg" />
                </button>
            </template>
        </CandidateStatusApplication>
        <CandidateStatusApplication v-else-if="status === 'reject'" class="mt-10" img="/candidate/reject.svg">
            <template #content>
                Вы не прошли на следующий этап отбора
            </template>
        </CandidateStatusApplication>
        <CandidateStatusApplication v-else-if="status === 'wait'" class="mt-10" img="/candidate/wait.svg">
            <template #title><div class="mb-20">Ожидайте</div></template>
            <template #content>
                Ваша заявка рассматривается
            </template>
        </CandidateStatusApplication>
    </div>
    
</template>

<script setup lang="ts">
import {
    RadioGroup,
    RadioGroupOption,
} from '@headlessui/vue'
import { useApplicationStore } from '~/stores/applicationStore'

const radioToggler = ref("application");

const store = useApplicationStore()
const status = computed(() => store.getStatusById(1))

</script>

<style scoped>

</style>