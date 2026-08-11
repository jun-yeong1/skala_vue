<script setup>
import { ref } from 'vue'

const sum = ref(0)
const count = ref(0)
</script>

<template>
  <div class="practice-section">
    <h2>v-memo 디렉티브 학습</h2>
    <div v-memo="[sum]">
        <p>합계: {{ sum }}</p>
        <p>카운트: {{ count }} (합계를 업데이트해야 카운트 증가)</p>
    </div>
    <button @click="sum+=count">합계 증가</button>
    <button @click="count++">카운트 증가</button>
  </div>
</template>