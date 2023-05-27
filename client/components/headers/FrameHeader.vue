<template>
  <div class="subheader">
    <NuxtLink to="/frame/applications">
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
              ? '/mentor/black/add_reaction.svg'
              : '/mentor/white/add_reaction.svg'
          "
        />
        <span class="max-md:hidden">Заявки</span>
      </button>
    </NuxtLink>
    <NuxtLink to="/frame/mentor-school">
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
              ? '/mentor/black/school.svg'
              : '/mentor/white/school.svg'
          "
        />
        <span class="max-md:hidden">Школа наставников</span>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const current = ref("a");
</script>

<style scoped></style>
