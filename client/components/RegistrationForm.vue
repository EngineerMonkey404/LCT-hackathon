<template>
  <div
    class="container mx-auto flex flex-col w-1/3 bg-white py-10 px-20 rounded-3xl shadow-2xl max-lg:w-full max-md:mx-10"
  >
    <form class="flex flex-col">
      <h2 class="text-center text-2xl font-semibold">
        Регистрация
        <span v-if="props.role === Role.CANDIDATE">
          кандидата на стажировку
        </span>
        <span v-if="props.role === Role.FRAME">кадра</span>
        <span v-if="props.role === Role.CURATOR">куратора</span>
        <span v-if="props.role === Role.MENTOR">наставника</span>
      </h2>
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
      <template v-if="props.role === Role.FRAME">
        <label for="organization" class="mb-2">Организация*</label>
        <div id="organization" class="w-full rounded-3xl mb-5">
          <Listbox v-model="organization">
            <div class="relative">
              <ListboxButton
                class="w-full cursor-default border-black border rounded-3xl bg-white py-2 pl-3 pr-10 text-left"
              >
                <span class="block">{{ organization }}</span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="mt-1 absolute z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <ListboxOption
                    v-for="(org, index) of organizations"
                    v-slot="{ active, selected }"
                    :key="index"
                    :value="org.name"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                      >
                        {{ org.name }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      ></span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </template>
      <template v-if="props.role === Role.FRAME">
        <label for="direction" class="mb-2">Направление*</label>
        <div id="direction" class="w-full rounded-3xl mb-5">
          <!--оценить реализацию-->
          <Listbox v-model="direction">
            <div class="relative">
              <ListboxButton
                class="w-full cursor-default border-black border rounded-3xl bg-white py-2 pl-3 pr-10 text-left"
              >
                <span class="block">{{ direction }}</span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="mt-1 absolute w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <ListboxOption
                    v-for="(direction, index) of Object.values(Direction)"
                    v-slot="{ active, selected }"
                    :key="index"
                    :value="direction"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                      >
                        {{ direction }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      ></span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </template>
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
import { Direction, organizations, RegisterData, Role } from "~/types/types";
import { useUserStore } from "~/stores/userStore";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

const userStore = useUserStore();
const imageInput = ref<HTMLInputElement>();
const imageFile = ref<{ stringFile: string; file: File }>();
const registerData: RegisterData = reactive({
  firstName: "",
  secondName: "",
  role: Role.CANDIDATE,
  thirdName: "",
  email: "",
  password: "",
  image: { url: "", file: null },
});

const organization = ref(organizations[0].name);
const direction = ref(Direction.HR);
const props = withDefaults(defineProps<{ role: Role; path: string }>(), {
  role: Role.CANDIDATE,
});

async function handleRegistration() {
  if (props.role === Role.FRAME) {
    registerData.direction = direction.value;
    registerData.organization = organizations.filter(
      (org) => (org.name = organization.value)
    )[0];
  }
  if (props.path) {
    registerData.role = props.role;
    await userStore.registerUser(registerData, props.path);
  }
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
