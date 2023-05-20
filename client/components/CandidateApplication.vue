<template>
  <form
    class="container mx-auto flex flex-col w-1/2 bg-white p-10 rounded-3xl shadow-2xl max-lg:w-full max-md:mx-10"
  >
    <h2 class="text-center text-xl font-semibold">Создание заявки</h2>
    <label class="mb-2" for="day">Дата рождения*</label>
    <div class="flex justify-between">
      <input id="day" class="form-auth-input mb-5" placeholder="День" />
      <input id="month" class="form-auth-input mb-5" placeholder="Месяц" />
      <input id="year" class="form-auth-input mb-5" placeholder="Год" />
    </div>
    <HeadlessRadioGroup v-model="citizenship">
      <HeadlessRadioGroupLabel class="">Гражданство*</HeadlessRadioGroupLabel>
      <div class="flex my-5">
        <HeadlessRadioGroupOption
          v-slot="{ checked }"
          value="russian"
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
        <HeadlessRadioGroupOption v-slot="{ checked }" value="other" class="">
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
      v-if="citizenship === 'other'"
      id="day"
      class="form-auth-input mb-5"
      placeholder="Введите страну"
    />
    <SelectList v-model="selectedEducation" :content-array="education" />
    {{ selectedEducation }}
    <label class="mb-2" for="password">Пароль*</label>
    <input
      id="password"
      class="form-auth-input mb-5"
      type="password"
      placeholder="Пароль"
    />
    <button
      class="form-auth-input bg-black text-white font-semibold mb-8 black-btn-hover"
    >
      Войти
    </button>
    <div class="flex justify-around max-sm:flex-col max-sm:items-center">
      <NuxtLink class="hover:cursor-pointer" to="">
        <span>Забыли пароль?</span>
      </NuxtLink>
      <span>
        Нет аккаунта?
        <NuxtLink
          to="/registration"
          class="font-semibold underline hover:cursor-pointer"
        >
          Зарегистрироваться
        </NuxtLink>
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
const citizenship = ref<string>();
const education = ["Нет высшего", "Неоконченное высшее", "Высшее"];
const selectedEducation = ref<string>();
</script>

<style scoped></style>
