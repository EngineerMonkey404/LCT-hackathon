<template>
    <div v-if="showMap" @click="close"
        class="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex justify-center items-center">
        <div @click.stop class="z-10 p-10 bg-white card-style">
            <YandexMap :coordinates="[55, 33]">
                <YandexMarker :coordinates="coordinates" :marker-id="123">
                    <template #component>
                        <TraineeApplication style="height: 800px;" :application="application"  />
                    </template>
                </YandexMarker>
            </YandexMap>
        </div>
    </div>
</template>

<script setup lang="ts">
import { YandexMap, YandexMarker } from 'vue-yandex-maps';
import TraineeApplication from './TraineeApplication.vue';
import { IFrameApplication } from '~/types/types';

const props = defineProps<{ application: IFrameApplication}>()
const showMap = ref(false);
const coordinates = [55, 33];
function open() {
    showMap.value = true
}
const close = () => {
    showMap.value = false;
}

onUpdated(() => console.log(showMap.value))

defineExpose({
    open,
});
</script>

<style scoped>
.yandex-container {
    height: 1000px;
    width: 1000px;
}
.yandex-balloon {
  height: 6000px;
  width: 600px;
}
</style>