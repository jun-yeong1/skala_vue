<script setup>
import { ref, watch } from 'vue'

const user = ref({
  name: '홍길동',
  age: 20,
})
const logDeep = ref('변경 전')
const logTarget = ref('변경 전')

watch(
  user,
  (newVal) => {
    logDeep.value = `[deep 감지] 누군가 변경됨. 현재 이름: ${newVal.name}, 나이: ${newVal.age}`
  },
  { deep: true },
)
watch(
  () => user.value.age,
  (newAge, oldAge) => {
    logTarget.value = `[타켓 감지] 나이 ${oldAge} -> ${newAge}로 변경`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>ref 객체/배열 감시</h2>
    <h3>회원 데이터 조작</h3>
    <p>name: {{ user.name }} / age: {{ user.age }}</p>
    <button @click="user.name = '이순신'">이름만 변경</button> &nbsp;
    <button @click="user.age++">나이만 변경 +1</button>

    <div class="monitor">
      <p>1) deep:true 설정 전체 감시</p>
      <p>{{ logDeep }}</p>
    </div>
    <div class="monitor target">
      <p>1) 화살표 함수(나이만 타켓 감시)</p>
      <p>{{ logTarget }}</p>
    </div>
  </div>
</template>
