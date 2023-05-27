<template>
  <div class="subheader">
    <NuxtLink to="/candidate/application">
      <button
        class="header-btn"
        :class="current === 'a' ? 'header-btn-active' : ''"
        @click="current = 'a'"
      >
        <NuxtImg
          class="inline-block"
          type="svg"
          :src="
            current === 'a'
              ? `/candidate/black/assignment_ind.svg`
              : '/candidate/white/assingment_ind.svg'
          "
        />
        Подать заявку
      </button>
    </NuxtLink>
    <NuxtLink>
      <button
        class="header-btn"
        :class="current === 's' ? 'header-btn-active' : ''"
        @click="current = 's'"
      >
        <NuxtImg class="inline-block" type="svg" src="/candidate/school.svg" />
        Карьерная школа
      </button>
    </NuxtLink>
    <NuxtLink to="/candidate/tests">
      <button
        class="header-btn"
        :class="current === 't' ? 'header-btn-active' : ''"
        @click="current = 't'"
      >
        Тестирование
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const current = ref("a");
</script>

<style scoped></style>
