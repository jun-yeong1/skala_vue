<script setup>
import { ref, watch } from 'vue'

const city = ref('서울')
const dateType = ref('오늘')
const apiStatus = ref('API 호출 전')

watch([city, dateType], ([newCity, newDate], [oldCity, oldDate]) => {
  apiStatus.value = `변경 ${oldCity}(${oldDate}) → ${newCity}(${newDate})`
  console.log(`${newCity}(${newDate})로 변경됨`)
})
</script>

<template>
  <div class="practice-section">
    <h2>Watch 다중</h2>
    <p>도시 선택:</p>
    <select v-model="city">
      <option value="서울">서울</option>
      <option value="부산">부산</option>
      <option value="울산">울산</option></select
    ><br />

    <label>날짜 선택: </label>
    <label><input type="radio" value="오늘" v-model="dateType" /> 오늘</label> &nbsp; <label><input type="radio" value="내일" v-model="dateType" /> 내일</label> &nbsp;
    <label><input type="radio" value="주간" v-model="dateType" /> 주간</label>
    <div class="monitor">
      <h3>변경 모니터</h3>
      <p>현재 상태: {{ apiStatus }}</p>
    </div>
  </div>
</template>
