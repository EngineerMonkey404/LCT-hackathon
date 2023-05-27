<template>
    <footer class="flex bg-white justify-between rounded-t-3xl">
        
    </footer>
</template>
  
<script setup lang="ts">
import MenuComp from "./headers/MenuComp.vue";
import { useUserStore } from "~/stores/userStore";
import { Role } from "~/types/types";

const userStore = useUserStore();
</script>
  
<style scoped></style>