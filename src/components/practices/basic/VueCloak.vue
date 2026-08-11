<script setup>
import {ref} from 'vue'
const message = ref('느린 네트워크 출력 메세지')

</script>

<template>
  <div v-cloak class="practice-section">
    <h2>v-cloak 디렉티브 학습</h2>
    <p>{{ message }}</p>
    <p v-pre>v-cloak 이 없고 네트워크가 느리다면 {{ message }} 코드가 노출된다.</p>
    <p></p>
  </div>
</template>

<style scoped>
    [v-cloak] {
        display:none !important;
    }
</style>