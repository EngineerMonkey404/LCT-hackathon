<template>
    <div @change="$emit('newQuestion', variants)" class="mb-10">
        <div class="category">Вопрос №<slot></slot></div>
        <textarea v-model="variants.question" class="rounded-3xl p-5 border border-black text-2xl mt-3" cols="100" rows="5"></textarea>
        <div class="category mt-10">Варианты ответов</div>
        <div class="text-xl">Нажмите на правильный ответ</div>
        <div class="variants grid grid-cols-2 gap-y-5 w-full mt-5">
            <div>
                <div @click="variants.rightAnswer = variants.variantA" class="black-btn"
                    :class="variants.rightAnswer === variants.variantA && variants.rightAnswer ? 'bg-lime-400' : ''">
                    A
                </div>
                <input v-model="variants.variantA" type="text" placeholder="Вариант А">
            </div>
            <div>
                <div @click="variants.rightAnswer = variants.variantB" class="black-btn"
                    :class="variants.rightAnswer === variants.variantB && variants.rightAnswer ? 'bg-lime-400' : ''">
                    Б
                </div>
                <input v-model="variants.variantB" type="text" placeholder="Вариант Б">
            </div>
            <div>
                <div @click="variants.rightAnswer = variants.variantC" class="black-btn"
                    :class="variants.rightAnswer === variants.variantC && variants.rightAnswer ? 'bg-lime-400' : ''">
                    В
                </div>
                <input v-model="variants.variantC" type="text" placeholder="Вариант В">
            </div>
            <div>
                <div @click="variants.rightAnswer = variants.variantD" class="black-btn"
                    :class="variants.rightAnswer === variants.variantD && variants.rightAnswer ? 'bg-lime-400' : ''">
                    Г
                </div>
                <input v-model="variants.variantD" type="text" placeholder="Вариант Г">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


const variants = ref({
    question: '',
    rightAnswer: '',
    variantA: '',
    variantB: '',
    variantC: '',
    variantD: '',
})

</script>

<style scoped>
.variants input {
    @apply form-auth-input;
}

.black-btn {
    @apply inline px-5 mr-3
}
</style>