<template>
    <div class="container mx-auto text-center">
        <RadioGroup v-model="choseRole">
            <RadioGroupLabel class="block text-2xl my-3">Plan</RadioGroupLabel>
            <RadioGroupOption class="radio-btn" v-slot="{ checked }" :value="Role.FRAME">
                <span :class="checked ? 'bg-blue-200' : ''">Ссылка для куратора</span>
            </RadioGroupOption>
            <RadioGroupOption class="radio-btn" v-slot="{ checked }" :value="Role.MENTOR">
                <span :class="checked ? 'bg-blue-200' : ''">Ссылка для наставника</span>
            </RadioGroupOption>
            <RadioGroupOption class="radio-btn" v-slot="{ checked }" :value="Role.CURATOR">
                <span :class="checked ? 'bg-blue-200' : ''">Ссылка для куратора</span>
            </RadioGroupOption>
        </RadioGroup>
        <div class="mt-20">
            <div class=""> 
                Здесь будет ссылка
                <button class="form-auth-input">Скопировать</button> <!-- я уберу обещаю -->
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
} from '@headlessui/vue'
import { Role } from '~/types/types';
const choseRole = ref<Role>();
</script>

<style scoped>
.radio-btn {
    @apply me-10
}
</style>