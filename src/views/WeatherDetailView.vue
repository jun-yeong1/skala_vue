<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

/* const mockDetailes = {
    city_01: { name: '서울특별시', temp: 28, status: '맑음', humidity: '55%', wind: '2.5m/s' },
    city_02: { name: '경기도 수원 영통구', temp: 25, status: '흐림', humidity: '60%', wind: '3.0m/s' },
    city_03: { name: '부산광역시 사하구', temp: 22, status: '비', humidity: '90%', wind: '4.5m/s' },
    city_04: { name: '울산광역시 남구', temp: 14, status: '맑음', humidity: '40%', wind: '2.0m/s' },
} */
const cityData = ref(null)
const isLoading = ref(false)

const cityMapping = {
  city_01: { english: 'Seoul', korean: '서울특별시 동작구' },
  city_02: { english: 'Suwon', korean: '경기도 수원시 영통구' },
  city_03: { english: 'Busan', korean: '부산광역시 사하구' },
  city_04: { english: 'Ulsan', korean: '울산광역시 동구' },
}

onMounted(async () => {
  const id = route.params.cityId
  const targetCity = cityMapping[id]

  if (targetCity) {
    isLoading.value = true
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather` + `?q=${targetCity.english}&appid=${API_KEY}&units=metric&lang=kr`)
      const raw = response.data
      cityData.value = {
        name: targetCity.korean,
        temp: raw.main.temp,
        status: raw.weather[0].description,
        humidity: `${raw.main.humidity}%`,
        wind: `${raw.wind.speed}m/s`,
      }
    } catch (error) {
      console.error('상세 정보 로딩 중 네트워크 에러: ', error)
    } finally {
      isLoading.value = false
    }
  }
})

const displayTemp = computed(() => {
  if (!cityData.value) return 0
  const rawTemp = cityData.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변경식
  }
  return rawTemp
})
</script>

<template>
  <div class="detail-container">
    <h3>지역별 상세 기상 관측 정보</h3>
    <hr />
    <div v-if="isLoading" style="text-align: center; padding: 20px 0; color: #7f8c8d"></div>
    <template v-else>
      <div v-if="cityData" class="info-card">
        <h4>지정 지역: {{ cityData.name }}</h4>
        <p>
          실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
        </p>
        <p>기상 현황: {{ cityData.status }}</p>
        <p>대기 습도: {{ cityData.humidity }}</p>
        <p>현재 풍속: {{ cityData.wind }}</p>
      </div>
      <div v-else>
        <p>해당 지역 상세 데이터가 존재하지 않습니다.</p>
      </div>
      <button @click="router.push('/')" class="back-btn">메인 대시보드 돌아기기</button>
    </template>
  </div>
</template>
