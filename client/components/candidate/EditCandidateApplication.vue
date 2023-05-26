<template>
  <div class="relative">
    <form
      v-if="candidateApplicationStore.personalCandidateApplication"
      class="text-xl flex flex-col bg-white py-5 px-10 rounded-3xl shadow-slate-950 shadow-2xl max-md:px-3 max-md:text-base max-xl:mb-10"
      :class="{
        'blur-sm':
          candidateApplicationStore.personalCandidateApplication!.status ===
          FrameApplicationStatus.PENDING ||
          candidateApplicationStore.personalCandidateApplication!.status ===
          FrameApplicationStatus.DECLINED,
      }"
      @submit.prevent
    >
      <h2 class="text-2xl font-semibold mb-5">Создание заявки</h2>
      <div class="mb-2 font-semibold">Желаемое направление</div>
      <input
        v-model="
          candidateApplicationStore.personalCandidateApplication.direction
        "
        class="form-auth-input mb-5"
      />
      <label class="mb-2 font-semibold" for="day">Дата рождения*</label>
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
      <p class="mb-2 font-semibold">Город проживания</p>
      <input
        v-model="candidateApplicationStore.personalCandidateApplication.city"
        class="form-auth-input mb-5"
      />
      <HeadlessRadioGroup
        v-model="
          candidateApplicationStore.personalCandidateApplication.nationality
        "
      >
        <HeadlessRadioGroupLabel class="font-semibold">
          Гражданство*
        </HeadlessRadioGroupLabel>

        <div class="flex my-5">
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
        v-if="
          candidateApplicationStore.personalCandidateApplication.nationality !==
          'Российское'
        "
        id="day"
        v-model="
          candidateApplicationStore.personalCandidateApplication.nationality
        "
        class="form-auth-input mb-5"
        placeholder="Введите страну"
      />
      <p class="font-semibold mt-4 mb-2">Образование</p>
      <SelectList
        :content-array="education"
        @updates="
          candidateApplicationStore.personalCandidateApplication.education =
            $event
        "
      />
      <SelectList
        v-if="
          candidateApplicationStore.personalCandidateApplication.education ===
          'Неоконченное высшее'
        "
        :content-array="courses"
        @updates="(course: string) => candidateApplicationStore.personalCandidateApplication!.course = course"
      />
      <label class="mb-2 font-semibold" for="">Опыт работы*</label>
      <div>
        <input
          id="noExpirience"
          v-model="
            candidateApplicationStore.personalCandidateApplication.experience
          "
          class="ml-5 mb-5 mr-2 accent-black"
          type="radio"
          :value="true"
        />
        <label for="noExpirience">У меня есть опыт работы</label>
      </div>
      <div
        v-if="candidateApplicationStore.personalCandidateApplication.experience"
      >
        <p class="mb-5 font-semibold">Должность</p>
        <input
          v-for="(pos, index) of candidateApplicationStore
            .personalCandidateApplication.position"
          :key="index"
          v-model="pos.value"
          class="form-auth-input mb-5 w-full"
        />
        <button
          class="mb-5"
          @click="
            candidateApplicationStore.personalCandidateApplication.position?.push(
              {}
            )
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
        @click="update"
      >
        Обновить данные
      </button>
    </form>
    <div
      v-if="
        candidateApplicationStore.personalCandidateApplication &&
        candidateApplicationStore.personalCandidateApplication.status ===
          FrameApplicationStatus.PENDING
      "
      class="absolute w-full right-0 h-full bg-black/20 rounded-3xl top-0 flex flex-col justify-center items-center"
    >
      <div class="mb-10 text-5xl font-bold max-md:text-3xl">
        Заявка проверяется
      </div>
      <div class="text-center flex">
        <button
          class="form-auth-input border bg-black text-white me-5 black-btn-hover"
          @click="
            candidateApplicationStore.personalCandidateApplication.status =
              FrameApplicationStatus.EDIT
          "
        >
          Редактировать
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";
import { FrameApplicationStatus } from "~/types/types";

const candidateApplicationStore = useCandidateApplicationStore();
console.log(candidateApplicationStore.personalCandidateApplication);
console.log(
  new Date(
    candidateApplicationStore.personalCandidateApplication!.date!
  ).getMonth()
);
const date = ref<string[]>([]);
const position = ref<string[]>(
  candidateApplicationStore.personalCandidateApplication!.position!.map(
    (obj) => obj.value || ""
  )
);
const day = ref(
  new Date(
    candidateApplicationStore.personalCandidateApplication!.date!
  ).getDate()
);
const month = ref(
  new Date(
    candidateApplicationStore.personalCandidateApplication!.date!
  ).getMonth() + 1
);
const year = ref(
  new Date(
    candidateApplicationStore.personalCandidateApplication!.date!
  ).getFullYear()
);

const education = ["Нет высшего", "Неоконченное высшее", "Высшее"];

const courses = ["1 курс", "2 курс", "3 курс", "4 курс"];

const numberJobs = ref(
  candidateApplicationStore.personalCandidateApplication?.position?.length ?? 1
);

function update() {
  candidateApplicationStore.personalCandidateApplication!.date = new Date();
  candidateApplicationStore.personalCandidateApplication!.date.setFullYear(
    +year.value,
    +month.value,
    +day.value
  );

  candidateApplicationStore.updateCandidateApplication(
    candidateApplicationStore.personalCandidateApplication!
  );
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
