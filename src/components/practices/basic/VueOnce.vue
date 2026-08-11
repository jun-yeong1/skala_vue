<script setup>
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <div class="practice-section">
    <h2>v-once 디렉티브 학습</h2>
    <p>v-once 는 시작할 때 한 번만 랜더링함</p>
    <p>v-once 적용 안한 것: {{ count }}</p>
    <p v-once>v-once 적용한 것: {{ count }}</p>
    <button @click="count++">카운트 증가</button>
  </div>
</template>