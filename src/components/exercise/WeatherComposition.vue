<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 25, status: '흐림' },
    { id: 'city_03', name: '부산', temp: 22, status: '비' },
    { id: 'city_04', name: '울산', temp: 14, status: '맑음' },
])

// 검색용 빈 데이터 선언
const searchQuery = ref('')
const selectedCityInfo = ref('검색')
const selectedDetail = ref('')

const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 현재 날씨 정보: ${status}`)
    selectedDetail.value = {name: cityName, status}
}

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

watch(selectedDetail, (newVal) => {console.log(`상새보기 클릭 "${newVal}"`)})
</script>

<template>
    <div class="page-bg">
        <div class="dashboard-wrapper">
            <section class="search-box">
                <h3>도시 검색</h3>
                <!-- v-model는 스페이스, 클릭으로 업데이트 -->
                <!-- input type="text" v-model="searchQuery" placeholder="도시명을 입력하세요." -->
                <!-- value + @input 은 실시간 업데이트 반영됨 -->
                <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)"
                    placeholder="검색어" />
                <p class="hint">검색 중인 도시: <strong>{{ searchQuery }}</strong></p>
            </section>
            <section class="list-box">
                <h3>지역별 날씨 현황</h3>
                <div v-for="item in filteredWeatherList" :key="item.id" class="weather-card"
                    @click="selectedCityInfo = `${item.name}이 선택되었습니다.`">
                    <div class="weather-info">
                        <h4>{{ item.name }} ({{ item.status }})</h4>
                        <p>현재 기온: {{ item.temp }}°C</p>
                        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25°C 이상)</span>
                        <span v-else-if="item.temp >= 15" class="badge cool">🍃 신선함 (25°C 미만, 15°C 이상)</span>
                        <span v-else class="badge ice">🧊 추움 (15°C 미만)</span>
                    </div>
                    <!-- 상태바는 두고 알림창만 팝업됨 -->
                    <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">상세보기</button>
                </div>
                <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">
                    검색 결과가 없습니다.
                </p>
            </section>
            <div class="status-bar">{{ selectedCityInfo }}</div>
        </div>
    </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>