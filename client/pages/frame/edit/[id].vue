<template>
  <div
    v-if="application"
    class="text-2xl py-5 px-10 w-1/2 mx-auto shadow-slate-950 shadow-2xl rounded-3xl mt-10 max-xl:w-full"
  >
    <h1 class="text-3xl mb-10 font-bold">Создание заявки</h1>
    <div>
      <label class="block mb-2 font-semibold" for="job">Должность</label>
      <input
        id="job"
        v-model="application.position"
        class="form-auth-input mb-5 w-full"
      />
    </div>
    <hr class="w-full" />
    <label class="block mb-2 font-semibold" for="description">Описание</label>
    <textarea
      id="description"
      v-model="application.description"
      class="form-auth-input rounded-3xl text-2xl w-full"
      rows="5"
    ></textarea>
    <label class="block mb-2 font-semibold mt-10" for="workExpirience">
      Опыт работы
    </label>
    <input
      v-for="(n, i) in numberWork"
      :key="i"
      v-model="workExperience[n - 1]"
      class="form-auth-input mb-5 w-full"
    />
    <button
      class="mb-5 block"
      @click="() => {
      if (application!.workExperience[numberWork - 1]) numberWork += 1;
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
    <button
      class="form-auth-input mt-10 bg-black text-white font-semibold black-btn-hover"
      @click="handleApplicationUpdate"
    >
      Обновить данные
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  FrameApplicationStatus,
  IFrameApplication,
  WorkExperience,
} from "~/types/types";
import { useUserStore } from "~/stores/userStore";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";

const route = useRoute();
const frameApplicationStore = useFrameApplicationsStore();
const application: IFrameApplication | null =
  await frameApplicationStore.getFrameApplicationById(+route.params.id);

const numberWork = ref(application?.workExperience.length || 1);
const workExperience = ref<string[]>(
  application?.workExperience.map((element) => element.value) || []
);

async function handleApplicationUpdate() {
  if (application) {
    application.workExperience.forEach(
      (el, index) => (el.value = workExperience.value[index])
    );
    application.status = FrameApplicationStatus.PENDING;
    await frameApplicationStore.updateFrameApplication(application);
    navigateTo("/frame/applications");
  }
}
</script>

<style scoped>
.row-input input {
  /* Убираем влияние padding и border на конечную ширину input */
  box-sizing: border-box;
  /* Обнуляем margin */
}
</style>
