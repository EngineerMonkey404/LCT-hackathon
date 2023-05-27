<template>
  <div class="container mx-auto text-center">
    <RadioGroup v-model="chosenRole" class="mt-10">
      <RadioGroupOption
        v-slot="{ checked }"
        class="radio-btn"
        :value="Role.CURATOR"
      >
        <span
          :class="checked ? 'bg-blue-200 text-black' : ''"
          class="invite-button max-sm:block max-sm:mx-3"
        >
          Ссылка для куратора
        </span>
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ checked }"
        class="radio-btn"
        :value="Role.MENTOR"
      >
        <span
          :class="checked ? 'bg-blue-200 text-black' : ''"
          class="invite-button max-sm:block max-sm:mx-3"
        >
          Ссылка для наставника
        </span>
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ checked }"
        class="radio-btn"
        :value="Role.FRAME"
      >
        <span
          :class="checked ? 'bg-blue-200 text-black' : ''"
          class="invite-button max-sm:block max-sm:mx-3"
        >
          Ссылка для кадра
        </span>
      </RadioGroupOption>
    </RadioGroup>
    <div class="mt-20">
      <button class="invite-button mb-10" @click="generateInvite">
        Сгенерировать
      </button>
      <div class="flex justify-center max-xl:adaptive-flex-col">
        <input
          v-model="path"
          type="text"
          class="w-1/2 max-xl:w-full text-center text-ellipsis max-xl:mb-3 px-3"
        />
        <button class="form-auth-input" @click="copy">Скопировать</button>
      </div>
      <div v-if="copied" class="text-center">Ссылка скопирована</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { Role } from "~/types/types";
const chosenRole = ref<Role>();
const path = ref("");
const copied = ref(false);

async function generateInvite() {
  copied.value = false;
  const { data: fetchedPath } = await useApiFetch<string>(`invites/generate`, {
    method: "GET",
    query: { role: chosenRole },
  });
  path.value = `http://lct.wex-web.ru/registration/${fetchedPath.value ?? ""}`;
}

function copy() {
  navigator.clipboard.writeText(path.value);
  copied.value = true;
}
</script>

<style scoped>
.radio-btn {
  @apply me-10 max-xl:me-4 max-lg:text-lg;
}
</style>
