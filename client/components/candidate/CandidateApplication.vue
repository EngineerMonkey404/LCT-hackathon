<template>
    <form @submit.prevent class="container mx-auto flex flex-col w-1/3 bg-white py-5 px-10 rounded-3xl shadow-slate-950 shadow-2xl max-lg:w-full max-sm font-semibold:mx-2">
        <h2 class="text-xl font-semibold mb-5">Создание заявки</h2>
        <label class="mb-2 font-semibold" for="day">Дата рождения*</label>
        <div class="flex justify-between date">
            <input class="form-auth-input mb-5" id="day" placeholder="День">
            <input class="form-auth-input mb-5" id="month" placeholder="Месяц">
            <input class="form-auth-input mb-5" id="year" placeholder="Год">
        </div>
        <HeadlessRadioGroup v-model="citizenship">
            <HeadlessRadioGroupLabel class=" font-semibold">Гражданство*</HeadlessRadioGroupLabel>
            <div class="flex my-4">
                <!--TODO: hover on button (check docs headless bez bashki)-->
                <HeadlessRadioGroupOption v-slot="{ checked }" value="russian" class="mr-10">
                    <div :class="checked ? 'bg-dark-purple text-white form-auth-input' : 'form-auth-input'">Гражданство РФ
                    </div>
                </HeadlessRadioGroupOption>
                <HeadlessRadioGroupOption v-slot="{ checked }" value="other" class="">
                    <div :class="checked ? 'bg-dark-purple text-white form-auth-input' : 'form-auth-input'">Гражданство
                        другой страны</div>
                </HeadlessRadioGroupOption>
            </div>
        </HeadlessRadioGroup>
        <input v-if="citizenship === 'other'" class="form-auth-input mb-4" id="day" placeholder="Введите страну">
        <p class="font-semibold mt-4 mb-2">Образование</p>
        <SelectList :content-array="education" v-model="selectedEducation"  />
        <SelectList v-if="selectedEducation === 'Неоконченное высшее'" :content-array="courses" v-model="selectedCourse" />
        {{ selectedCourse }}
        <label class="mb-2 font-semibold" for="">Опыт работы*</label>
        <div>
            <input class="mb-4 mr-2 accent-black" id="noExpirience" type="radio" v-model="expirence" value="no"/>
            <label class="" for="noExpirience">У меня нет опыта работы</label>
            <input class="ml-5 mb-4 mr-2 accent-black" id="noExpirience" type="radio" v-model="expirence" value="yes"/>
            <label for="noExpirience">У меня есть опыт работы</label>
        </div>
        <div v-if="expirence === 'yes'">
            <p class="mb-5 font-semibold">Должность</p>
            <input v-for="(n, i) in numberJobs" v-model="jobs[i]" :key="n" class="form-auth-input mb-5 w-full">
            <button class="mb-4" @click="() => {if (jobs[numberJobs - 1]) numberJobs += 1}">
                <NuxtImg class="inline-block" format="png" src="/plus.png" style="height: 15px;"/>
                <span class="ml-3">Добавить место работы</span>   
            </button>
        </div>
        <button class="form-auth-input bg-black text-white font-semibold mt-5 black-btn-hover">Создать</button>

    </form>
</template>

<script setup lang="ts">
//TODO: получать значение из компонента списка
const citizenship = ref<string>();

const education = ['Нет высшего', 'Неоконченное высшее', 'Высшее'];
const selectedEducation = ref<string>('Неоконченное высшее');

const courses = ['1 курс', '2 курс', '3 курс', '4 курс',];
const selectedCourse = ref<string>();

const expirence = ref<string>();

const jobs = ref<string[]>([]);
const numberJobs = ref(1);
</script>

<style scoped>
.date > input {
  width: 30%;
  /* Убираем влияние padding и border на конечную ширину input */
  box-sizing: border-box;
  /* Обнуляем margin */
}
</style>