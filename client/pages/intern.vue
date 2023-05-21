<template>
  <header class="flex justify-center items-end bg-purple w-full h-44">
    <RadioGroup v-model="radioToggler" class="flex">
      <RadioGroupOption value="invites">
        <div
          class="candidate-radio-btn bg-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg class="inline-block" type="svg" src="/interns/mail.svg" />
          Приглашения
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="map">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg class="inline-block" type="svg" src="/interns/earth.svg" />
          Карта
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="overview">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg
            class="inline-block"
            type="svg"
            src="/interns/overview.svg"
          />
          Расписание
        </div>
      </RadioGroupOption>
      <RadioGroupOption v-model="radioToggler" value="feedback">
        <div
          class="candidate-radio-btn bg-ultra-dark-purple text-white hover:opacity-50 duration-300 ease-out"
        >
          <NuxtImg
            class="inline-block"
            type="svg"
            src="/interns/overview.svg"
          />
          Обратная связь о работе наставника
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </header>

  <div v-if="radioToggler === 'invites'">
    <NuxtLink to="/createVacancie">qwe</NuxtLink>
    <div class="flex w-full">
      <div class="w-1/5 ml-44 mt-20">
        <button class="block mb-5 text-2xl font-bold">
          <NuxtImg
            type="svg"
            src="/interns/markunread_mailbox.svg"
            class="inline"
          />
          Ваши приглашения
        </button>
        <button class="block mb-5 text-2xl font-semibold">
          <NuxtImg
            type="svg"
            src="/interns/approval_delegation.svg"
            class="inline"
          />
          Доступные места
        </button>
      </div>
      <div class="grid grid-cols-1 mt-20 mx-10 w-full">
        <div
          v-if="listVacancie"
          class="mt-20 text-5xl font-semibold text-center"
        >
          Пока нет заявок
        </div>
        <template v-for="vacancie in listVacancie">
          <div
            v-if="vacancie.status === 'checked'"
            class="shadow-slate-500 shadow-xl rounded-3xl w-full mb-10"
          >
            <Vacancie>
              <template #job>{{ vacancie.job }}</template>
              <template #organization>{{ vacancie.organization }}</template>
              <template #description>{{ vacancie.description }}</template>
              <template #workExpirience>
                <div v-for="exp of vacancie.workExpirience" class="mb-8">
                  <span class="form-auth-input text-xl">{{ exp }}</span>
                </div>
              </template>
            </Vacancie>
            <button
              class="m-10 rounded-full px-10 py-3 text-xl text-white font-semibold bg-green-500"
              @click="vacancie.status = 'checked'"
            >
              Подтвердить
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
// import { useVacancieStore } from "~/stores/frameApplicationsStore";
//
// const radioToggler = ref("invites");
// const store = useVacancieStore();
// const listVacancie = ref(store.getVacancieList());
</script>
