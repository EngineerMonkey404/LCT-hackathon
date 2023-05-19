<template>
    <form class="container mx-auto flex flex-col w-1/3 bg-white p-10 rounded-3xl shadow-2xl max-lg:w-full max-md:mx-10">
        <h2 class="text-center text-xl font-semibold">Регистрация</h2>
        <label class="mb-2" for="name">Имя*</label>
        <input class="form-auth-input mb-5" id="name" placeholder="Имя">
        <label class="mb-2" for="surname">Фамилия*</label>
        <input class="form-auth-input mb-5" id="surname" placeholder="Фамилия">
        <label class="mb-2" for="lastname">Отчество*</label>
        <input class="form-auth-input mb-5" id="lastname" placeholder="Отчество">
        <label class="mb-2" for="email">Электронная почта*</label>
        <input class="form-auth-input mb-5" id="email" placeholder="Электронная почта">
        <label class="mb-2" for="password">Пароль*</label>
        <input class="form-auth-input mb-5 block" id="password" type="password" placeholder="Пароль">
        <button class="form-auth-input bg-black text-white font-semibold black-btn-hover">Зарегистрироваться</button>
    </form>
</template>

<script setup lang="ts">

</script>

<style scoped></style>