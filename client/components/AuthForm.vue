<template>
    <form class="container mx-auto flex flex-col w-1/3 bg-white p-10 rounded-3xl shadow-2xl max-lg:w-full max-md:mx-10">
        <h2 class="text-center text-xl font-semibold">Вход</h2>
        <label class="mb-2" for="email">Электронная почта*</label>
        <input class="form-auth-input mb-5" id="email" placeholder="Электронная почта">
        <label class="mb-2" for="password">Пароль*</label>
        <input class="form-auth-input mb-5" id="password" type="password" placeholder="Пароль">
        <button class="form-auth-input bg-black text-white font-semibold mb-8 black-btn-hover">Войти</button>
        <div class="flex justify-around max-sm:flex-col max-sm:items-center">
            <NuxtLink class="hover:cursor-pointer" to=""><span>Забыли пароль?</span></NuxtLink>
            <span>Нет аккаунта? <NuxtLink to="" class="font-semibold underline hover:cursor-pointer">Зарегистрироваться</NuxtLink></span>
        </div>
        
    </form>
</template>

<script setup lang="ts">

</script>

<style scoped></style>