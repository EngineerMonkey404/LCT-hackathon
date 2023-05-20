<template>
    <form @submit.prevent
        class="text-xl flex flex-col w-1/3 bg-white py-5 px-10 rounded-3xl shadow-slate-950 shadow-2xl max-lg:w-full max-sm font-semibold:mx-2">
        <h2 class="text-2xl font-semibold mb-5">Создание заявки</h2>
        <label class="mb-2 font-semibold text-xl" for="day">Дата рождения*</label>
        <div class="flex justify-between date">
            <input class="form-auth-input mb-5" v-model="day" id="day" placeholder="День">
            <input class="form-auth-input mb-5" v-model="month" id="month" placeholder="Месяц">
            <input class="form-auth-input mb-5" v-model="year" id="year" placeholder="Год">
        </div>
        <HeadlessRadioGroup v-model="citizenship">
            <HeadlessRadioGroupLabel class=" font-semibold text-xl">Гражданство*</HeadlessRadioGroupLabel>
            <div class="flex my-5">
                <!--TODO: hover on button (check docs headless bez bashki)-->
                <HeadlessRadioGroupOption v-slot="{ checked }" value="Российское" class="mr-10">
                    <div :class="checked ? 'bg-dark-purple text-white form-auth-input' : 'form-auth-input'">Гражданство РФ
                    </div>
                </HeadlessRadioGroupOption>
                <HeadlessRadioGroupOption v-slot="{ checked }" value="other" class="">
                    <div :class="checked ? 'bg-dark-purple text-white form-auth-input' : 'form-auth-input'">Гражданство
                        другой страны</div>
                </HeadlessRadioGroupOption>
            </div>
        </HeadlessRadioGroup>
        <input v-if="citizenship === 'other'" class="form-auth-input mb-5" id="day" v-model="citizenship" placeholder="Введите страну">
        <p class="font-semibold mt-4 mb-2 text-xl">Образование</p>
        <SelectList :content-array="education" @updates="(education: string) => selectedEducation = education" />
        <SelectList v-if="selectedEducation === 'Неоконченное высшее'" :content-array="courses"
            @updates="(course: string) => selectedCourse = course" />
        {{ selectedCourse }}
        <label class="mb-2 font-semibold text-xl" for="">Опыт работы*</label>
        <div>
            <input class="mb-5 mr-2 accent-black" id="noExpirience" type="radio" v-model="expirence" value="no" />
            <label class="" for="noExpirience">У меня нет опыта работы</label>
            <input class="ml-5 mb-5 mr-2 accent-black" id="noExpirience" type="radio" v-model="expirence" value="yes" />
            <label for="noExpirience">У меня есть опыт работы</label>
        </div>
        <div v-if="expirence === 'yes'">
            <p class="mb-5 font-semibold text-xl">Должность</p>
            <input v-for="(n, i) in numberJobs" v-model="jobs[i]" :key="n" class="form-auth-input mb-5 w-full">
            <button class="mb-5" @click="() => { if (jobs[numberJobs - 1]) numberJobs += 1 }">
                <NuxtImg class="inline-block" format="svg" src="/candidate/add_circle.svg" style="height: 15px;" />
                <span class="ml-3">Добавить место работы</span>
            </button>
        </div>
        <button @click="create"
            class=" form-auth-input mt-10 bg-black text-white font-semibold black-btn-hover">Создать</button>

    </form>
</template>

<script setup lang="ts">
import { useApplicationStore } from '~/stores/applicationStore';

const day = ref<string>()
const month = ref<string>()
const year = ref<string>()
const citizenship = ref<string>();

const education = ['Нет высшего', 'Неоконченное высшее', 'Высшее'];
const selectedEducation = ref<string>('Нет высшего');

const courses = ['1 курс', '2 курс', '3 курс', '4 курс',];
const selectedCourse = ref<string>();

const expirence = ref<string>();

const jobs = ref<string[]>([]);
const numberJobs = ref(1);

const create = () => {
    const store = useApplicationStore();
    store.createApplication(
        {
            birthday: `${day}:${month}:${year}`,
            citizenship: citizenship.value,
            education: selectedEducation.value,
            course: selectedCourse.value,
            workExpirence: expirence.value,
            jobs: jobs.value
        }
    );
    console.log(store.application)
}
</script>

<style scoped>
.date>input {
    width: 30%;
    /* Убираем влияние padding и border на конечную ширину input */
    box-sizing: border-box;
    /* Обнуляем margin */
}
</style>