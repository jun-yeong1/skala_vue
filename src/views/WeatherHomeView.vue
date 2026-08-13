<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

const weatherList = ref([]) // API로 받은거 넣을거임

// 검색용 빈 데이터 선언
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색')

const isLoading = ref(false) // api 데이터
// api key, url 처리
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  fetchRealTimeWeather() // DOM 불러오고 난 뒤 데이터 불러오기
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const filteredWeatherList = computed(() => {
  // trim : 문자 앞뒤 공백 제거
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }
  // filter 조건 맞는 새 배열 생성
  // includes 문자열 포함하는지 검사
  return weatherList.value.filter((item) => item.name.includes(query))
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}

// 실시간 데이터 들고오기 비동기 파이프라인
const fetchRealTimeWeather = async () => {
  isLoading.value = true
  try {
    const [seoulRes, suwonRes, busanRes, UlsanRes] = await Promise.all([
      axios.get(`${BASE_URL}?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Suwon&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Busan&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Ulsan&appid=${API_KEY}&units=metric&lang=kr`),
    ])
    weatherList.value = [
      { id: 'city_01', name: '서울', temp: seoulRes.data.main.temp, status: seoulRes.data.weather[0].description },
      { id: 'city_02', name: '수원', temp: suwonRes.data.main.temp, status: suwonRes.data.weather[0].description },
      { id: 'city_03', name: '부산', temp: busanRes.data.main.temp, status: busanRes.data.weather[0].description },
      { id: 'city_04', name: '울산', temp: UlsanRes.data.main.temp, status: UlsanRes.data.weather[0].description },
    ]
    console.log('API 통신 완료, 기상 데이터 동기화: ', weatherList.value)
  } catch (error) {
    console.log('API 연동 실패: ', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="search-box">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>
  </section>
  <section class="list-box">
    <BaseDashboardCard>
      <h3>지역별 날씨 현황</h3>
      <p v-if="isLoading" style="text-align: center; color: aquamarine; font-weight: bold; padding: 20px 0">실시간 기상 데이터 수신 중</p>
      <!-- 태그만들지 않고 묶어주는 역할 -->
      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          class="weather-card"
          @select-card="(msg) => (selectedCityInfo = msg)"
          @click-detail="handleDetailJump(item.id)"
        />
        <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">검색 결과가 없습니다.</p>
      </template>
    </BaseDashboardCard>
  </section>
  <div class="status-bar">{{ selectedCityInfo }}</div>
</template>
