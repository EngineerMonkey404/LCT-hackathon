<template>
    <div class="subheader">
      <NuxtLink to="/mentor/applications">
        <div
          class="header-btn flex items-center"
          :class="current === 'a' ? 'header-btn-active' : ''"
          @click="current = 'a'"
        >
          <NuxtImg class="inline-block mr-1" type="svg" :src="current === 'a' ? '/mentor/black/add_reaction.svg' : '/mentor/white/add_reaction.svg'" />
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
          :src="current === 's' ? '/mentor/black/school.svg' : '/mentor/white/school.svg'"
        />
        <span class="max-sm:hidden">Школа наставников</span>
      </div>
      <NuxtLink>
        <div
          class="header-btn"
          :class="current === 'o' ? 'header-btn-active' : ''"
          @click="current = 'o'"
        >
          <NuxtImg class="inline-block mr-1" type="svg" :src="current === 'o' ? '/mentor/black/calendar_month.svg' : '/mentor/white/calendar_month.svg'" />
          <span class="max-sm:hidden">Расписание стажера</span>
        </div>
      </NuxtLink>
    </div>
  </template>
  
<script setup lang="ts">
const current = ref('a');

</script>
  
<style scoped></style>
