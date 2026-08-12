<script setup>
import {ref, computed, watch, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'

import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';
import SearchBar from '@/components/exercise/SearchBar.vue';
import WeatherCard from '@/components/exercise/WeatherCard.vue';

const router = useRouter()
const route = useRoute()

const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 25, status: '흐림' },
    { id: 'city_03', name: '부산', temp: 22, status: '비' },
    { id: 'city_04', name: '울산', temp: 14, status: '맑음' },
])

// 검색용 빈 데이터 선언
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색')

onMounted(() => {
    if (route.query.search) {
        searchQuery.value = route.query.search
    }
})

watch(searchQuery, (newQuery) => {
    router.push({
        path: route.path,
        query: { search: newQuery || undefined }
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
</script>

<template>
    <section class="search-box">
        <BaseDashboardCard>
            <SearchBar :current-query="searchQuery"
                @update-query="(val) => (searchQuery = val)" />
        </BaseDashboardCard>
    </section>
    <section class="list-box">
        <BaseDashboardCard>
            <h3>지역별 날씨 현황</h3>
            <WeatherCard v-for="item in filteredWeatherList" :key="item.id"
                :city-item="item"
                class="weather-card"
                @select-card="(msg) => selectedCityInfo = msg"
                @click-detail="handleDetailJump(item.id)" />
            <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">
                검색 결과가 없습니다.
            </p>
        </BaseDashboardCard>
    </section>
    <div class="status-bar">{{ selectedCityInfo }}</div>
</template>