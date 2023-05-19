<template>
    <header class="flex justify-center items-end bg-purple w-full h-56">
        <RadioGroup class="flex" v-model="radioToggler">
            <RadioGroupOption value="startup">
                <span class="candidate-radio-btn bg-white">Подать заявку</span>
            </RadioGroupOption>
            <RadioGroupOption v-slot="{ checked }" value="business">
                <span class="candidate-radio-btn bg-ultra-dark-purple text-white">Карьерная школа</span>
            </RadioGroupOption>
            <RadioGroupOption v-slot="{ checked }" value="enterprise">
                <span class="candidate-radio-btn bg-white">Тестирование</span>
            </RadioGroupOption>
        </RadioGroup>
    </header>
    <div class="flex items-center w-full">
        <CandidateApplication class="mt-10" />
    </div>
    
</template>

<script setup lang="ts">
import {
    RadioGroup,
    RadioGroupOption,
} from '@headlessui/vue'

const radioToggler = ref<string>()
</script>

<style scoped></style>