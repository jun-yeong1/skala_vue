<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 25, status: '흐림' },
  { id: 'city_03', name: '부산', temp: 22, status: '비' },
  { id: 'city_04', name: '울산', temp: 14, status: '맑음' },
])

// 검색용 빈 데이터 선언
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색')
const selectedDetail = ref('')

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

// selectedCityInfo 변경 추척
watch(selectedCityInfo, (newInfo) => {
  console.log(`[watch 감지] 상태 문구 업데이트 -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출 기능] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링`)
})

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨 정보: ${status}`)
  selectedDetail.value = { name: cityName, status }
}
</script>

<template>
  <div class="page-bg">
    <div class="dashboard-wrapper">
      <section class="search-box">
        <BaseDashboardCard>
          <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
        </BaseDashboardCard>
      </section>
      <section class="list-box">
        <BaseDashboardCard>
          <h3>지역별 날씨 현황</h3>
          <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" class="weather-card" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="showDetail" />
          <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">검색 결과가 없습니다.</p>
        </BaseDashboardCard>
      </section>
      <div class="status-bar">{{ selectedCityInfo }}</div>
    </div>
  </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>
