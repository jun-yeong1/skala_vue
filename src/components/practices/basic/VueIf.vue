<script setup>
import { ref } from 'vue'

// 1. 조건부 온/오프 스위치 변수
const isLogged = ref(false)

// 2. 다중 조건 분기용 숫자 변수
const score = ref(50)
</script>

<template>
  <div class="practice-section">
    <h2>v-if, v-else-if, v-else 디렉티브 학습</h2>
    <h3>1) 출석 상태 스위치</h3>
    <p v-if="isLogged">출석입니다.</p>
    <p v-else>미출석입니다. 출석해주세요.</p>
    <button @click="isLogged = !isLogged">
      {{ isLogged ? '퇴실하기' : '출석하기' }}
    </button>
    <br />
    <h3>2) 피곤도 측정 (다중 조건문)</h3>
    <label>현재 피곤도 입력: </label>
    <input type="number" v-model="score" min="0" max="100" step="5" />
    <br />
    <div v-if="score >= 90" style="color: green; font-weight: bold">카페인 필수입니다.</div>
    <div v-else-if="score >= 60" style="color: blue">한 번 일어나서 몸을 풀어주세요.</div>
    <div v-else-if="score >= 30" style="color: orange">물 한잔하세요.</div>
    <div v-else style="color: red; font-weight: bold">잘하고 계십니다.</div>
  </div>
</template>
