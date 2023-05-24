<template>
  <form
    class="text-xl flex flex-col bg-white py-5 px-10 rounded-3xl shadow-slate-950 shadow-2xl max-lg:w-full max-sm font-semibold:mx-2"
    @submit.prevent
  >
    <h2 class="text-2xl font-semibold mb-5">Создание заявки</h2>
    <div class="mb-2 font-semibold text-xl">Желаемое направление</div>
    <input v-model="application.direction" class="form-auth-input mb-5" />
    <label class="mb-2 font-semibold text-xl" for="day">Дата рождения*</label>
    <div class="flex justify-between date">
      <input
        id="day"
        v-model="date[0]"
        class="form-auth-input mb-5"
        placeholder="День"
      />
      <input
        id="month"
        v-model="date[1]"
        class="form-auth-input mb-5"
        placeholder="Месяц"
      />
      <input
        id="year"
        v-model="date[2]"
        class="form-auth-input mb-5"
        placeholder="Год"
      />
    </div>
    <p class="mb-2 font-semibold text-xl">Город проживания</p>
    <input v-model="application.city" class="form-auth-input mb-5" />
    <HeadlessRadioGroup v-model="application.nationality">
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
        <HeadlessRadioGroupOption v-slot="{ checked }" value="" class="">
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
      v-if="application.nationality !== 'Российское'"
      id="day"
      v-model="application.nationality"
      class="form-auth-input mb-5"
      placeholder="Введите страну"
    />
    <p class="font-semibold mt-4 mb-2 text-xl">Образование</p>
    <SelectList
      :content-array="education"
      @updates="application.education = $event"
    />
    <!--need education in db-->
    <SelectList
      v-if="application.education === 'Неоконченное высшее'"
      :content-array="courses"
      @updates="(course: string) => application.course = course"
    />
    <label class="mb-2 font-semibold text-xl" for="">Опыт работы*</label>
    <div>
      <input
        id="noExpirience"
        v-model="application.experience"
        class="ml-5 mb-5 mr-2 accent-black"
        type="radio"
        :value="true"
      />
      <label for="noExpirience">У меня есть опыт работы</label>
    </div>
    <div v-if="application?.experience">
      <p class="mb-5 font-semibold text-xl">Должность</p>
      <input
        v-for="(n, i) in numberJobs"
        :key="n"
        v-model="application.position![i]"
        class="form-auth-input mb-5 w-full"
      />
      <button
        class="mb-5"
        @click="() => {
        if (application.position![numberJobs - 1]) numberJobs += 1;
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
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";
import { useUserStore } from "~/stores/userStore";
import { ICandidateApplication, FrameApplicationStatus } from "~/types/types";

const userStore = useUserStore();
const candidateApplicationStore = useCandidateApplicationStore();
const date = ref<string[]>([]);
const application = ref<ICandidateApplication>({
  position: [],
  education: "Неоконченное высшее",
});

const education = ["Нет высшего", "Неоконченное высшее", "Высшее"];
const selectedEducation = ref("Нет высшего");

const courses = ["1 курс", "2 курс", "3 курс", "4 курс"];
const numberJobs = ref(1);

//function converter date
//mnogo zapisey
//rabota int
function create() {
  application.value.candidateId = userStore.user?.userId; //no id in db
  application.value.date = new Date();
  application.value.date.setFullYear(
    +date.value[2],
    +date.value[1] - 1,
    +date.value[0]
  );
  if (
    application.value.education === "Неоконченное высшее" &&
    !application.value.course
  ) {
    application.value.course = "1 курс";
  }
  application.value.date.setHours(application.value.date.getHours() + 3);
  application.value.status = FrameApplicationStatus.PENDING;
  candidateApplicationStore.createCandidateApplication(application.value);
  return navigateTo("/candidate/application");
}
</script>

<style scoped>
.date > input {
  width: 30%;
  /* Убираем влияние padding и border на конечную ширину input */
  box-sizing: border-box;
  /* Обнуляем margin */
}
</style>
