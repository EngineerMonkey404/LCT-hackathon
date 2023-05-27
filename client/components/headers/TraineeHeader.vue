<template>
  <div class="subheader">
    <NuxtLink to="/trainee/invites">
      <div
        class="header-btn"
        :class="current === 'i' ? 'header-btn-active' : ''"
        @click="current = 'i'"
      >
        <img
          class="inline-block"
          type="svg"
          :src="
            current === 'i'
              ? '/trainee/black/mail.svg'
              : '/trainee/white/mail.svg'
          "
        />
        <span class="max-sm:hidden max-md:text-xs ml-1">Приглашения</span>
      </div>
    </NuxtLink>
    <div
      class="header-btn"
      :class="current === 'o' ? 'header-btn-active' : ''"
      @click="current = 'o'"
    >
      <img
        class="inline-block"
        type="svg"
        :src="
          current === 'o'
            ? '/trainee/black/overview.svg'
            : '/trainee/white/overview.svg'
        "
      />
      <span class="max-sm:hidden max-md:text-xs ml-1">Расписание</span>
    </div>
    <div
      class="header-btn"
      :class="current === 'f' ? 'header-btn-active' : ''"
      @click="current = 'f'"
    >
      <img
        class="inline-block"
        type="svg"
        :src="
          current === 'f'
            ? '/trainee/black/reviews.svg'
            : '/trainee/white/reviews.svg'
        "
      />
      <span class="max-sm:hidden max-md:text-xs ml-1">
        Обратная связь о работе наставника
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const current = ref("i");
</script>

<style scoped></style>
