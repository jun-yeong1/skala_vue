<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <h3>서비스 소개</h3>
    <hr />
    <div class="description-box">실시간 날씨를 나타내는 서비스</div>
    <button @click="handleGoHome" class="home-btn">대시보드 홈으로 이동</button>
  </div>
</template>
