<template>
  <div
    v-if="showMap"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex justify-center items-center"
    @click="close"
  >
    >
    <div class="p-10 bg-white card-style" @click.stop>
      <YandexMap :zoom="9" :coordinates="coordinates">
        <YandexMarker :coordinates="coordinates" :marker-id="123">
          <template #component>
            <TraineeApplication :application="application" />
          </template>
        </YandexMarker>
      </YandexMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import TraineeApplication from "./TraineeApplication.vue";
import { IFrameApplication, organizations } from "~/types/types";

const props = defineProps<{ application: IFrameApplication }>();
const showMap = ref(false);
const coordinates = ref<number[]>([]);

coordinates.value = organizations.filter(
  (org) => org.name === props.application.organization.name
)[0].coordinates;

function open() {
  showMap.value = true;
}
const close = () => {
  showMap.value = false;
};

onUpdated(() => console.log(showMap.value));

defineExpose({
  open,
});
</script>

<style scoped></style>
