<template>
  <div class="subheader">
    <NuxtLink to="/candidate/application">
      <button
        class="header-btn"
        :class="current === 'a' ? 'header-btn-active' : ''"
        @click="current = 'a'"
      >
        <img
          class="inline-block mr-1"
          type="svg"
          :src="
            current === 'a'
              ? '/candidate/black/assignment_ind.svg'
              : '/candidate/white/assignment_ind.svg'
          "
        />
        <span class="max-sm:hidden">Подать заявку</span>
      </button>
    </NuxtLink>
    <NuxtLink>
      <button
        class="header-btn"
        :class="current === 's' ? 'header-btn-active' : ''"
        @click="current = 's'"
      >
        <img
          class="inline-block mr-1"
          type="svg"
          :src="
            current === 's'
              ? '/candidate/black/school.svg'
              : '/candidate/white/school.svg'
          "
        />
        <span class="max-sm:hidden">Карьерная школа</span>
      </button>
    </NuxtLink>
    <NuxtLink to="/candidate/tests">
      <button
        class="header-btn"
        :class="current === 't' ? 'header-btn-active' : ''"
        @click="current = 't'"
      >
        <img
          class="inline-block"
          type="svg"
          :src="
            current === 't'
              ? '/candidate/black/glyphs.svg'
              : '/candidate/white/glyphs.svg'
          "
        />
        <span class="max-sm:hidden">Тестирование</span>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const current = ref("a");
</script>

<style scoped></style>
