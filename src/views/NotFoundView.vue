<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
router.push({ name: 'WeatherHome' })
}
</script>

<template>
    <div class="not-found-container">
        <div class="not-found-content">
            <div class="error-icon"> </div>
            <h2>페이지를 찾을 수 없습니다.</h2>
            <p>요청하신 주소가 존재하지 않거나,<br />
                아직 개발되지 않았습니다.</p>
            <button class="home-button" @click="goHome">
                날씨 메인으로 이동</button>
        </div>
    </div>
</template>