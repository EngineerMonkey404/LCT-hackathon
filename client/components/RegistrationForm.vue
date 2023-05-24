<template>
  <div
    class="container mx-auto flex flex-col w-1/3 bg-white py-10 px-20 rounded-3xl shadow-2xl max-lg:w-full max-md:mx-10"
  >
    <form class="flex flex-col">
      <h2 class="text-center text-2xl font-semibold">Регистрация</h2>
      <div class="flex flex-col items-center">
        <div class="text-2xl mt-5 mb-3 font-semibold">Фото</div>
        <label
          class="labelPhoto bg-violet-100 text-slate-400"
          for="addImg"
          :class="{ 'p-7': !registerData.image.file }"
        >
          <span v-if="!registerData.image.url">
            Перетащите свой файл или загрузите с компьютера
          </span>
          <img
            v-else
            :src="registerData.image.url"
            class="h-full w-full rounded-full object-cover"
            alt="profile-picture"
          />
        </label>
        <input
          id="addImg"
          class="photoInput"
          type="file"
          accept="image/png, image/jpeg"
          @change="addImageFile($event)"
        />
      </div>

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
import { RegisterData } from "~/types/types";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
const imageInput = ref<HTMLInputElement>();
const imageFile = ref<{ stringFile: string; file: File }>();
const registerData: RegisterData = reactive({
  firstName: "",
  secondName: "",
  thirdName: "",
  email: "",
  password: "",
  image: { url: "", file: null },
});

async function handleRegistration() {
  await userStore.registerUser(registerData);
}

async function addImageFile(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      registerData.image = { url: reader.result as string, file: files[0] };
    };
  }
}
</script>

<style scoped>
.photoInput {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.labelPhoto {
  width: 140px;
  height: 140px;
  text-align: center;
  cursor: pointer;
  display: block;
  font: 14px Tahoma;
  transition: all 0.18s ease-in-out;
  border: 1px solid #333;
  border-radius: 9999px;
}
</style>
