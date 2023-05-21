<template>
    <div class="text-2xl py-5 px-10 w-1/2 mx-auto shadow-slate-950 shadow-2xl rounded-3xl mt-10">
        <h1 class="text-3xl mb-10 font-bold">Создание заявки</h1>
        <div class="flex justify-between row-inputs">
            <div>
                <label class="block mb-2 font-semibold" for="job">Должность</label>
                <input class="form-auth-input mb-5" v-model="job" id="job">
            </div>
            <div>
                <label class="block mb-2 font-semibold" for="organiztion">Организация</label>
                <input class="form-auth-input mb-5" v-model="organiztion" id="organization">
            </div>
            <div>
                <label class="block mb-2 font-semibold" for="adrees">Адрес организации</label>
                <input class="form-auth-input mb-5" v-model="adress" id="adress">
            </div>
        </div>
        <hr class="w-full">
        <label class="block mb-2 font-semibold" for="description">Описание</label>
        <textarea class="form-auth-input rounded-3xl text-2xl w-full" v-model="description" id="description"
            rows="5"></textarea>
        <label class="block mb-2 font-semibold mt-10" for="workExpirience">Опыт работы</label>
        <input v-for="(n, i) in numberWork" v-model="workExpirience[i]" :key="n" class="form-auth-input mb-5 w-full">
        <button class="mb-5 block" @click="() => { if (workExpirience[numberWork - 1]) numberWork += 1 }">
            <NuxtImg class="inline-block" format="svg" src="/candidate/add_circle.svg" style="height: 15px;" />
            <span class="ml-3">Добавить требуемый опыт работы</span>
        </button>
        <button @click="create" class="form-auth-input mt-10 bg-black text-white font-semibold black-btn-hover">
            Создать
        </button>
    </div>
</template>

<script setup lang="ts">
import { useVacancieStore } from '~/stores/frameApplicationStore'
const job = ref('');
const organiztion = ref('');
const adress = ref('');
const description = ref('');
const numberWork = ref(1)
const workExpirience = ref([])
const store = useVacancieStore()

const create = () => {
    store.createVacancie({
        job: job.value,
        organization: organiztion.value,
        adress: adress.value,
        workExpirience: workExpirience.value,
        description: description.value,
    })
    console.log(store.getVacancieList())
    //return navigateTo('/frames')
}
</script>

<style scoped>
.row-input>input {
    width: 30%;
    /* Убираем влияние padding и border на конечную ширину input */
    box-sizing: border-box;
    /* Обнуляем margin */
}
</style>