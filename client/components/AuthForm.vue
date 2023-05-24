<template>
  <form
    class="container mx-auto flex flex-col w-1/3 bg-white p-10 rounded-3xl shadow-2xl max-lg:w-full max-md:mx-10"
  >
    <h2 class="text-center text-xl font-semibold">Вход</h2>
    <label class="mb-2" for="email">Электронная почта*</label>
    <input
      id="email"
      v-model="loginData.email"
      class="form-auth-input mb-5"
      placeholder="Электронная почта"
    />
    <label class="mb-2" for="password">Пароль*</label>
    <input
      id="password"
      v-model="loginData.password"
      class="form-auth-input mb-5"
      type="password"
      placeholder="Пароль"
    />
    <NuxtLink to="/">
      <button
        class="form-auth-input bg-black text-white font-semibold mb-8 black-btn-hover"
        @click="handleLogin"
      >
        Войти
      </button>
    </NuxtLink>
    <div class="flex justify-around max-sm:flex-col max-sm:items-center">
      <NuxtLink class="hover:cursor-pointer" to="/">
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
      <div v-if="error">Ошибка</div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { Role } from "~/types/types";

interface RegisterData {
  firstName: string;
  secondName: string;
  thirdName: string;
  email: string;
  password: string;
  role: string;
}

const error = ref(false);
const userStore = useUserStore();
const loginData: { email: string; password: string } = reactive({
  email: "",
  password: "",
});
async function handleLogin() {
  try {
    await userStore.login(loginData);
    if (userStore.user) {
      if (userStore.user.role === Role.FRAME)
        return navigateTo("/frame/applications");
      else if (userStore.user.role === Role.CANDIDATE)
        return navigateTo("/candidate/application");
      else if (userStore.user.role === Role.CURATOR)
        return navigateTo("/curator/applications");
      else if (userStore.user.role === Role.TRAINEE)
        return navigateTo("/candidate/invites");
      else return navigateTo("/mentor/application");
    }
  } catch {
    error.value = true;
  }
}
</script>

<style scoped></style>
