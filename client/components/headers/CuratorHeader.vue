<template>
  <div class="subheader">
    <NuxtLink to="/curator/applications">
      <div
        class="header-btn flex items-center"
        :class="current === 'a' ? 'header-btn-active' : ''"
        @click="current = 'a'"
      >
        <NuxtImg class="inline-block mr-1" type="svg" :src="current === 'a' ? '/curators/black/add_reaction.svg' : '/curators/white/add_reaction.svg'" />
        <div class="max-sm:hidden">Заявки на стажировку</div>
      </div>
    </NuxtLink>
    <div
      class="header-btn"
      :class="current === 's' ? 'header-btn-active' : ''"
      @click="current = 's'"
    >
      <NuxtImg
        class="inline-block mr-1"
        type="svg"
        :src="current === 's' ? '/curators/black/leaderboard.svg' : '/curators/white/leaderboard.svg'"
      />
      <span class="max-sm:hidden">Статистика</span>
    </div>
    <NuxtLink to="/curator/need-trainees">
      <div
        class="header-btn"
        :class="current === 't' ? 'header-btn-active' : ''"
        @click="current = 't'"
      >
        <NuxtImg class="inline-block mr-1" type="svg" :src="current === 't' ? '/curators/black/badge.svg' : '/curators/white/badge.svg'" />
        <span class="max-sm:hidden">Потребность в стажерах</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const current = ref('a');
</script>

<style scoped></style>
