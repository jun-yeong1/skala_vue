<script setup>
import { ref, watch } from 'vue'

const currentCity = ref('서울')
const logMessage = ref('아직 작동 안함')

watch(currentCity, (newValue, oldValue) => {
  logMessage.value = `도시가 ${oldValue}에서 ${newValue}로 변경됨`
  console.log(`${newValue}로 변경됨`)
})
</script>
<template>
  <div class="practice-section">
    <h2>Watch 학습</h2>
    <p>현재 선택된 도시: {{ currentCity }}</p>
    <button @click="currentCity = '서울'">서울</button>
    <button @click="currentCity = '부산'">부산</button>
    <button @click="currentCity = '울산'">울산</button>
    <div class="monitor">
      <h3>변경 모니터</h3>
      <p>{{ logMessage }}</p>
      <small>※ 콘솔창에서도 확인 가능</small>
    </div>
  </div>
</template>
