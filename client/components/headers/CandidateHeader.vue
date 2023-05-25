<template>
  <div class="subheader">
    <NuxtLink to="/candidate/application">
      <button class="header-btn">
        <NuxtImg class="inline-block" type="svg" src="/candidate/lightbulb.svg" />
        Подать заявку
      </button>
    </NuxtLink>
    <NuxtLink></NuxtLink>
    <button class="header-btn">
      <NuxtImg class="inline-block" type="svg" src="/candidate/school.svg" />
      Карьерная школа
    </button>
    <NuxtLink to="/candidate/tests">
      <button class="header-btn">
        <NuxtImg class="inline-block" type="svg" src="/candidate/glyphs.svg" />
        Тестирование
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
