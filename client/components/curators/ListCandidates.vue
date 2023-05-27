<template>
  <div class="my-5 max-xl:px-3">
    <label for="filter" class="mb-2 font-semibold text-xl">Фильтр</label>
    <div id="filter" class="w-full rounded-3xl mb-5 mt-3">
      <Listbox v-model="filter">
        <div class="relative">
          <ListboxButton
            class="w-full cursor-default border-black border rounded-3xl bg-white py-2 pl-3 pr-10 text-left"
          >
            <span class="block">{{ filter }}</span>
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
                v-for="(obj, index) of Object.values(
                  CandidateApplicationFilter
                )"
                v-slot="{ active, selected }"
                :key="index"
                :value="obj"
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
                    {{ obj }}
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

      <div
        v-if="
          candidateApplicationStore.getFilteredCandidateApplications(filter)!
            .length
        "
        class="grid grid-cols-3 gap-10 mt-10 max-lg:grid-cols-2 max-xl:gap-x-5 max-sm:grid-cols-1"
      >
        <TransitionGroup name="list">
          <CandidateCard
            v-for="(
              application, index
            ) of candidateApplicationStore.getFilteredCandidateApplications(
              filter
            )"
            :key="index"
            :application="application"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCandidateApplicationStore } from "~/stores/candidateApplicationStore";
import CandidateCard from "~/components/curators/CandidateCard.vue";
import { CandidateApplicationFilter } from "~/types/types";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const filter = ref<CandidateApplicationFilter>(CandidateApplicationFilter.ALL);
const candidateApplicationStore = useCandidateApplicationStore();
await candidateApplicationStore.getPendingCandidateApplications();
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
