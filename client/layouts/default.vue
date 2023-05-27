<template>
  <div>
    <AppHeader />
    <slot />
    <MobileHeader />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import MobileHeader from '~/components/headers/MobileHeader.vue';
</script>

<style scoped lang="scss"></style>
