<script setup>
import { ref } from 'vue'

const text1 = ref('')
const text2 = ref('')
</script>

<template>
    <div class="practice-section">
        <h2>v-model 양방향 데이터 바인딩</h2>
        <p>v-model 은 HTML, 자바스크립트(ref) 데이터를 실시간 바인딩 디렉티브</p>
        <h3>v-model 적용 문법</h3>
        <input type="text" v-model="text1" placeholder="v-model 적용된 input" />
        <p>v-model 적용된 input 값: {{ text1 }}</p>

        <h3>v-model 작동 원리 (단방향 + 이벤트)</h3>
        <input type="text" :value="text2" @input="(e) => (text2 = e.target.value)" placeholder="단뱡향 + 이벤트" />
        <p>단뱡향 + 이벤트 input 값: {{ text2 }}</p>
    </div>
</template>