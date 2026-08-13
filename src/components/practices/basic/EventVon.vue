<script setup>
import { ref } from 'vue'

const count = ref(0)
const showAlert = () => {
  alert('함수 호출 확인')
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on 이벤트 핸들링 기초</h2>
    <p>v-on 은 이벤트를 바인딩하는 디렉티브임</p>
    <p>현재 카운트: {{ count }}</p>
    <button @click="count++">카운트 하나씩 증가</button>
    <br />
    <p>스크립트 함수 호출 버튼</p>
    <button @click="showAlert">함수 호출</button>
  </div>
</template>
