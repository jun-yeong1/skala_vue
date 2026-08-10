<script setup>
const id = 'user-profile-card'
const src = 'https://vuejs.org/images/logo.png'
</script>

<template>
  <div class="practice-section">
    <h2>v-bind 디렉티브 고급 (단축 문법)</h2>
    <div :id>
      <img :src alt="Vue 로고" style="width: 50px" />
    </div>
    <div>코드 형식</div>
    <div>:src alt="Vue 로고"</div>
  </div>
</template>
