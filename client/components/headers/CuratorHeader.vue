<template>
  <div class="subheader">
    <NuxtLink to="/curator/applications">
      <div class="header-btn">
        <NuxtImg class="inline-block" type="svg" src="/frames/invites.svg" />
        Заявки на стажировку
      </div>
    </NuxtLink>
    <div class="header-btn">
      <NuxtImg class="inline-block" type="svg" src="/curators/leaderboard.svg" />
      Статистика
    </div>
    <NuxtLink to="/curator/need-trainees">
      <div class="header-btn">
        <NuxtImg class="inline-block" type="svg" src="/curators/badge.svg" />
        Потребность в стажерах
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
