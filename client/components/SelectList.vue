<template>
  <div
    class="w-full rounded-3xl mb-5"
    @click="$emit('updates', selectedItem)"
  >
    <Listbox v-model="selectedItem" :value="selectedItem">
      <div class="relative mt-1">
        <ListboxButton
          class="w-full cursor-default border-black border rounded-3xl bg-white py-2 pl-3 pr-10 text-left">
          <span class="block">{{ selectedItem }}</span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="mt-1 z-20 absolute w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <ListboxOption
              v-for="(item, index) of $props.contentArray"
              v-slot="{ active, selected }"
              :key="index"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ item }}
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

<script setup lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const props = defineProps<{ contentArray: string[] }>();
defineEmits(["updates"]);
const selectedItem = ref(props.contentArray[0]);
</script>
