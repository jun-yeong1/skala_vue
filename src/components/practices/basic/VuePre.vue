<script setup>
import { ref } from 'vue'

const message = ref('HI')
</script>

<template>
  <div class="practice-section">
    <h2>v-pre 디렉티브 학습</h2>
    <p>v-pre 는 자바스크립트 데이터로 변환되는 코드를 출력하지 않고 원본 html 출력</p>
    <p>일반 출력: {{ message }}</p>
    <p v-pre>v-pre 출력 : {{ message }}</p>
  </div>
</template>