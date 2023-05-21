<template>
  <form
    class="text-xl flex flex-col w-1/3 bg-white py-5 px-10 rounded-3xl shadow-slate-950 shadow-2xl max-lg:w-full max-sm font-semibold:mx-2"
    @submit.prevent
  >
    >
    <h2 class="text-2xl font-semibold mb-5">Создание заявки</h2>
    <label class="mb-2 font-semibold text-xl" for="day">Дата рождения*</label>
    <div class="flex justify-between date">
      <input
        id="day"
        v-model="day"
        class="form-auth-input mb-5"
        placeholder="День"
      />
      <input
        id="month"
        v-model="month"
        class="form-auth-input mb-5"
        placeholder="Месяц"
      />
      <input
        id="year"
        v-model="year"
        class="form-auth-input mb-5"
        placeholder="Год"
      />
    </div>
    <HeadlessRadioGroup v-model="citizenship">
      <HeadlessRadioGroupLabel class="font-semibold text-xl">
        Гражданство*
      </HeadlessRadioGroupLabel>
      <div class="flex my-5">
        <!--TODO: hover on button (check docs headless bez bashki)-->
        <HeadlessRadioGroupOption
          v-slot="{ checked }"
          value="Российское"
          class="mr-10"
        >
          <div
            :class="
              checked
                ? 'bg-dark-purple text-white form-auth-input'
                : 'form-auth-input'
            "
          >
            Гражданство РФ
          </div>
        </HeadlessRadioGroupOption>
        <HeadlessRadioGroupOption v-slot="{ checked }" value="other" class="">
          <div
            :class="
              checked
                ? 'bg-dark-purple text-white form-auth-input'
                : 'form-auth-input'
            "
          >
            Гражданство другой страны
          </div>
        </HeadlessRadioGroupOption>
      </div>
    </HeadlessRadioGroup>
    <input
      v-if="citizenship === 'other'"
      id="day"
      v-model="citizenship"
      class="form-auth-input mb-5"
      placeholder="Введите страну"
    />
    <p class="font-semibold mt-4 mb-2 text-xl">Образование</p>
    <SelectList
      :content-array="education"
      @updates="selectedEducation = $event"
    />
    <SelectList
      v-if="selectedEducation === 'Неоконченное высшее'"
      :content-array="courses"
      @updates="(course: string) => selectedCourse = course"
    />
    {{ selectedCourse }}
    <label class="mb-2 font-semibold text-xl" for="">Опыт работы*</label>
    <div>
      <input
        id="noExpirience"
        v-model="expirence"
        class="mb-5 mr-2 accent-black"
        type="radio"
        value="no"
      />
      <label class="" for="noExpirience">У меня нет опыта работы</label>
      <input
        id="noExpirience"
        v-model="expirence"
        class="ml-5 mb-5 mr-2 accent-black"
        type="radio"
        value="yes"
      />
      <label for="noExpirience">У меня есть опыт работы</label>
    </div>
    <div v-if="expirence === 'yes'">
      <p class="mb-5 font-semibold text-xl">Должность</p>
      <input
        v-for="(n, i) in numberJobs"
        :key="n"
        v-model="jobs[i]"
        class="form-auth-input mb-5 w-full"
      />
      <button
        class="mb-5"
        @click="
          () => {
            if (jobs[numberJobs - 1]) numberJobs += 1;
          }
        "
      >
        <NuxtImg
          class="inline-block"
          format="svg"
          src="/candidate/add_circle.svg"
          style="height: 15px"
        />
        <span class="ml-3">Добавить место работы</span>
      </button>
    </div>
    <button
      class="form-auth-input mt-10 bg-black text-white font-semibold black-btn-hover"
      @click="create"
    >
      Создать
    </button>
  </form>
</template>

<script setup lang="ts">
const day = ref<string>();
const month = ref<string>();
const year = ref<string>();
const citizenship = ref<string>();

const education = ["Нет высшего", "Неоконченное высшее", "Высшее"];
const selectedEducation = ref<string>("Нет высшего");

const courses = ["1 курс", "2 курс", "3 курс", "4 курс"];
const selectedCourse = ref<string>();

const expirence = ref<string>();

const jobs = ref<string[]>([]);
const numberJobs = ref(1);

// const create = () => {
//   const store = useApplicationStore();
//   store.createApplication({
//     birthday: `${day}:${month}:${year}`,
//     citizenship: citizenship.value,
//     education: selectedEducation.value,
//     course: selectedCourse.value,
//     workExpirence: expirence.value,
//     jobs: jobs.value,
//   });
//   console.log(store.application);
// };
</script>

<style scoped>
.date > input {
  width: 30%;
  /* Убираем влияние padding и border на конечную ширину input */
  box-sizing: border-box;
  /* Обнуляем margin */
}
</style>
