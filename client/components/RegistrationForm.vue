<template>
  <div
    class="container mx-auto flex flex-col w-1/3 bg-white p-10 rounded-3xl shadow-2xl max-lg:w-full max-md:mx-10"
  >
    <form class="flex flex-col">
      <h2 class="text-center text-xl font-semibold">Регистрация</h2>
      <label class="mb-2" for="name">Имя*</label>
      <input
        id="name"
        v-model="registerData.firstName"
        class="form-auth-input mb-5"
        placeholder="Имя"
      />
      <label class="mb-2" for="surname">Фамилия*</label>
      <input
        id="surname"
        v-model="registerData.secondName"
        class="form-auth-input mb-5"
        placeholder="Фамилия"
      />
      <label class="mb-2" for="lastname">Отчество*</label>
      <input
        id="lastname"
        v-model="registerData.thirdName"
        class="form-auth-input mb-5"
        placeholder="Отчество"
      />
      <label class="mb-2" for="email">Электронная почта*</label>
      <input
        id="email"
        v-model="registerData.email"
        class="form-auth-input mb-5"
        placeholder="Электронная почта"
      />
      <label class="mb-2" for="password">Пароль*</label>
      <input
        id="password"
        v-model="registerData.password"
        class="form-auth-input mb-5 block"
        type="password"
        placeholder="Пароль"
      />
    </form>
    <NuxtLink to="/">
      <button
        class="form-auth-input bg-black text-white font-semibold black-btn-hover"
        @click="handleRegistration"
      >
        Зарегистрироваться
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface RegisterData {
  firstName: string;
  secondName: string;
  thirdName: string;
  email: string;
  password: string;
}

const registerData: RegisterData = reactive({
  firstName: "",
  secondName: "",
  thirdName: "",
  email: "",
  password: "",
});

async function handleRegistration(user: RegisterData) {
  const { data } = useApiFetch("auth/register", {
    method: "POST",
    body: registerData,
  });
  console.log(data);
}
</script>

<style scoped></style>
