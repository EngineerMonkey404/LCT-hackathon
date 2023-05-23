<template>
  <!-- <div>
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
  </div> -->
</template>

<script setup lang="ts"></script>

<style scoped></style>
