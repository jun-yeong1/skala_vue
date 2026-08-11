<script setup>
import { ref } from 'vue'

const position = ref('')
const tagname = ref('')
// 
const getPosition = (e) => {
    position.value = `좌표 X: ${e.clientX}, 좌표 Y: ${e.clientY}`
}
const getTagname = (name, e) => {
    tagname.value = `대상 태그 : ${name} / 태그명: ${e.target.tagName}`
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on 이벤트 객체 학습</h2>
    <p>마우스 클릭 좌표: {{ position }}</p>
    <p>버튼 클릭 이벤트: {{ tagname }}</p>
    <button @click="getPosition">마우스 클릭 좌표 확인</button>
    <button @click="getTagname('버튼', $event)">버튼 클릭 이벤트 확인</button>
  </div>
</template>