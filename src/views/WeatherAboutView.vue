<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleGoHome = () => { router.push('/') }
</script>

<template>
    <div>
        <h3> 서비스 소개</h3>
        <hr />
        <div class="description-box"> ... 소개 문구와 목록 ... </div>
        <button @click="handleGoHome" class="home-btn">
            대시보드 홈으로 이동</button>
    </div>
</template>