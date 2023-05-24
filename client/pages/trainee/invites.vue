<template>
  <div class="container mx-auto flex justify-between mt-10">
    <div class="text-xl font-medium mr-20" >
      <RadioGroup v-model="radioToggler">
        <RadioGroupOption class="mb-5" v-slot="{ checked }" :value="CurrentComponents.AVIABLE">
          <span :class="checked ? 'font-bold' : ''">Доступные места</span>
        </RadioGroupOption>
        <RadioGroupOption class="mb-5" v-slot="{ checked }" :value="CurrentComponents.INVITES">
          <span :class="checked ? 'font-bold' : ''">Ваши приглашения</span>
        </RadioGroupOption>
        <RadioGroupOption class="mb-5" v-slot="{ checked }" :value="CurrentComponents.SENDED">
          <span :class="checked ? 'font-bold' : ''">Отправленные заявки</span>
        </RadioGroupOption>
      </RadioGroup>
    </div>
    <div class="w-full grid grid-cols-2 gap-10">
      <component :is="listComponets[radioToggler as keyof typeof listComponets]" />
    </div>
  </div>
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

<script setup lang="ts">
import AvailableInvites from '~/components/trainee/AvailableInvites.vue';
import SendedInvites from '~/components/trainee/SendedInvites.vue';
import {
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue'

enum CurrentComponents {
  AVIABLE = "available",
  INVITES = 'invites',
  SENDED = 'sended'
}

const listComponets = { [CurrentComponents.AVIABLE]: AvailableInvites, [CurrentComponents.SENDED]: SendedInvites }

const radioToggler = ref(CurrentComponents.AVIABLE);

</script>

<style scoped>
span {
  @apply pb-10
}
</style>
