<template>
  <div
    class="text-2xl py-5 px-10 w-1/2 mx-auto shadow-slate-950 shadow-2xl rounded-3xl mt-10 max-md:w-full"
  >
    <h1 class="text-3xl mb-10 font-bold">Создание заявки</h1>
    <div class="grid grid-cols-2 max-lg:grid-cols-1">
      <div class="row-input">
        <label class="block mb-2 font-semibold" for="job">Должность</label>
        <input
          id="job"
          v-model="frameApplicationStore.creationApplication.position"
          class="form-auth-input mb-5 w-3/5 max-lg:w-full"
        />
      </div>
      <div>
        <label for="mentor" class="mb-2 block font-semibold max-md:inline">
          Выберите наставника
        </label>
        <div id="mentor" class="mt-3 rounded-3xl mb-5 w-full">
          <Listbox v-model="mentor">
            <div class="relative">
              <ListboxButton
                class="w-full cursor-default border-black border rounded-3xl bg-white py-2 pl-3 pr-10 text-left"
              >
                <span class="block">{{ getMentorName(mentor) }}</span>
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
                    v-for="(mentor, index) of frameApplicationStore.mentors"
                    v-slot="{ active, selected }"
                    :key="index"
                    :value="mentor"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                      >
                        {{ getMentorName(mentor) }}
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
      </div>
    </div>
    <hr class="w-full" />
    <label class="block mb-2 font-semibold" for="description">Описание</label>
    <textarea
      id="description"
      v-model="frameApplicationStore.creationApplication.description"
      class="form-auth-input rounded-3xl text-2xl w-full"
      rows="5"
    ></textarea>
    <label class="block mb-2 font-semibold mt-10" for="workExpirience">
      Требуемый опыт работы
    </label>
    <input
      v-for="(n, i) in numberWork"
      :key="n"
      v-model="frameApplicationStore.creationApplication.workExperience[i]"
      class="form-auth-input mb-5 w-full"
    />
    <button
      class="mb-5 block"
      @click="
        () => {
          if (
            frameApplicationStore.creationApplication.workExperience[
              numberWork - 1
            ]
          )
            numberWork += 1;
        }
      "
    >
      <img
        class="inline-block"
        format="svg"
        src="/candidate/add_circle.svg"
        style="height: 15px"
      />
      <span class="ml-3">Добавить требуемый опыт работы</span>
    </button>
    <NuxtLink class="max-sm:w-full" to="/frame/create-test">
      <button class="black-btn block font-medium max-sm:w-full max-sm:text-lg">
        Создать тестовое задание
      </button>
    </NuxtLink>

    <div v-if="empty" class="text-red mt-7 text-2xl">*Заполните все поля</div>
    <button
      class="form-auth-input mt-10 bg-black text-white font-semibold black-btn-hover"
      @click="createApplication"
    >
      Создать
    </button>
  </div>
</template>

<script setup lang="ts">
import { IFrameApplication, IUser } from "~/types/types";
import { useUserStore } from "~/stores/userStore";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { useTestStore } from "~/stores/testStore";

const userStore = useUserStore();
const testStore = useTestStore();
const route = useRoute();
const frameApplicationStore = useFrameApplicationsStore();
const numberWork = ref(1);
const application = ref<IFrameApplication>({
  organization: userStore.user?.organization ?? {
    name: "",
    address: "",
    coordinates: [0, 0],
  },
  position: "",
  description: "",
  workExperience: [],
  frameId: userStore.user!.userId!,
});
if (userStore.user && userStore.user.direction)
  await frameApplicationStore.getMentorsByDirection(userStore.user.direction);
const mentor = ref(frameApplicationStore.mentors[0]);

if (route.query?.["frame_id"]) {
  frameApplicationStore.getApplicationsByFrameId(+route.query?.["frame_id"]);
  for (const app of frameApplicationStore.personalFrameApplications) {
    if (app.applicationId === +route.query?.["application_id"]!) {
      frameApplicationStore.creationApplication = app;
    }
  }
}

const empty = ref(false);
function getMentorName(mentor: IUser) {
  return mentor.firstName + " " + mentor.secondName + " " + mentor.thirdName;
}

const createApplication = async () => {
  if (
    !frameApplicationStore.creationApplication.position ||
    !frameApplicationStore.creationApplication.description ||
    !frameApplicationStore.creationApplication.workExperience.length
  ) {
    empty.value = true;
  } else {
    frameApplicationStore.creationApplication.mentorId = mentor.value.userId;
    frameApplicationStore.creationApplication.organization = {
      name: userStore.user?.organizationName ?? "",
      address: userStore.user?.organizationAddress ?? "",
      coordinates: [
        userStore.user?.organizationCoordinateX ?? 0,
        userStore.user?.organizationCoordinateY ?? 0,
      ],
    };
    const id = await frameApplicationStore.createApplication(
      frameApplicationStore.creationApplication
    );

    if (id && testStore.creationTest.length)
      await testStore.createTest(id, testStore.creationTest);

    return navigateTo("/frame/applications");
  }
};
</script>

<style scoped>
.row-input > input {
  /*width: 60%;*/
  /* Убираем влияние padding и border на конечную ширину input */
  box-sizing: border-box;
  /* Обнуляем margin */
}
</style>
