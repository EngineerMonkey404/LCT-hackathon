<template>
  <div
    v-if="application"
    class="text-2xl py-5 px-10 w-1/2 mx-auto shadow-slate-950 shadow-2xl rounded-3xl mt-10"
  >
    <div>{{ application.workExperience }}</div>
    <h1 class="text-3xl mb-10 font-bold">Создание заявки</h1>
    <div class="flex justify-between">
      <div>
        <label class="block mb-2 font-semibold" for="job">Должность</label>
        <input
          id="job"
          v-model="application.position"
          class="form-auth-input mb-5"
        />
      </div>
      <div>
        <label class="block mb-2 font-semibold" for="adrees">
          Адрес организации
        </label>
        <input
          id="adress"
          v-model="application.address"
          class="form-auth-input mb-5"
        />
      </div>
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
      :key="n"
      v-model="application.workExperience[n - 1]"
      class="form-auth-input mb-5 w-full"
    />
    <button
      class="mb-5 block"
      @click="() => {
                if (application!.workExperience[numberWork - 1]) numberWork += 1;
            }
            "
    >
      <NuxtImg
        class="inline-block"
        format="svg"
        src="/candidate/add_circle.svg"
        style="height: 15px"
      />
      <span class="ml-3">Добавить требуемый опыт работы</span>
    </button>
    <button
      class="form-auth-input mt-10 bg-black text-white font-semibold black-btn-hover"
      @click="frameApplicationStore.updateFrameApplication(application)"
    >
      Обновить данные
    </button>
  </div>
</template>

<script setup lang="ts">
import { IFrameApplication } from "~/types/types";
import { useUserStore } from "~/stores/userStore";
import { useFrameApplicationsStore } from "~/stores/frameApplicationsStore";

const route = useRoute();
const frameApplicationStore = useFrameApplicationsStore();
const application: IFrameApplication | null =
  await frameApplicationStore.getFrameApplicationById(
    +route.query.application_id!
  );

const numberWork = ref(application?.workExperience?.length ?? 1);
console.log(+route.query.application_id!);
console.log(application);
</script>

<style scoped>

</style>
