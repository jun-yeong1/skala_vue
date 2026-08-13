<script setup>
import { ref } from 'vue'

const welcomeMessage = 'Welcome to Skala-Vue'
// 반응형 변수로 바꿔보기
const number = ref(Math.ceil(Math.random() * 100))
// 함수로 설정해서 버튼 클릭 시 랜덤 숫자 변경
const change_number = () => {
  number.value = Math.ceil(Math.random() * 100)
}
</script>
<template>
  <div class="practice-section">
    <h2>{{ welcomeMessage }}</h2>
    <p>{{ welcomeMessage.toUpperCase() }}</p>
    <p>{{ 'Random number: ' + number }}</p>
    <button @click="change_number">랜덤 변수</button>
  </div>
</template>
