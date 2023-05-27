<template>
  <form
    class="text-xl flex flex-col bg-white py-5 px-10 rounded-3xl shadow-slate-950 shadow-2xl"
    @submit.prevent
  >
    <h2 class="text-2xl font-semibold mb-5">Создание заявки</h2>
    <label for="direction" class="mb-2">Направление*</label>
    <div id="direction" class="w-full rounded-3xl mb-5">
      <Listbox v-model="application.direction">
        <div class="relative">
          <ListboxButton
            class="w-full cursor-default border-black border rounded-3xl bg-white py-2 pl-3 pr-10 text-left"
          >
            <span class="block">{{ application.direction }}</span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="mt-1 absolute w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <ListboxOption
                v-for="(direction, index) of Object.values(Direction)"
                v-slot="{ active, selected }"
                :key="index"
                :value="direction"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ direction }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  ></span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
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
    <SelectList
      v-if="application.education === 'Неоконченное высшее'"
      :content-array="courses"
      @updates="(course: string) => application.course = course"
    />
    <label class="mb-2 font-semibold text-xl" for="">Опыт работы*</label>
    <div>
      <input
        id="expirience"
        v-model="application.experience"
        class="ml-5 mb-5 mr-2 accent-black"
        type="radio"
        :value="true"
      />
      <label for="expirience">У меня есть опыт работы</label>
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
        <img
          class="inline-block"
          src="/candidate/add_circle.svg"
          style="height: 15px"
        />
        <span class="ml-3">Добавить место работы</span>
      </button>
    </div>
    <div v-if="empty" class="text-red text-2xl mt-4">*Заполните все поля</div>
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
import {
  Listbox,
  ListboxOption,
  ListboxButton,
  ListboxOptions,
} from "@headlessui/vue";
import {
  ICandidateApplication,
  FrameApplicationStatus,
  Direction,
} from "~/types/types";

const userStore = useUserStore();
const candidateApplicationStore = useCandidateApplicationStore();
const date = ref<string[]>([]);
const application = ref<ICandidateApplication>({
  position: [],
  direction: Direction.HR,
  education: "",
});

const education = ["Нет высшего", "Неоконченное высшее", "Высшее"];

const courses = ["1 курс", "2 курс", "3 курс", "4 курс"];
const numberJobs = ref(1);

const empty = ref(false);
//function converter date
//mnogo zapisey
//rabota int
function create() {
  if (
    !application.value.city ||
    !date.value[0] ||
    !date.value[1] ||
    !date.value[2] ||
    !application.value.nationality
  ) {
    empty.value = true;
  } else {
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
    empty.value = false;
    return navigateTo("/candidate/application");
  }
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
