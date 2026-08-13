<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTravelStore } from '@/stores/travelStore'
import { useConfigStore } from '@/stores/configStore'
import { getWeatherTheme, iconUrl } from '@/utils/weatherTheme'
import { getWeekRecommendation } from '@/utils/weatherAdvice'

const router = useRouter()
const travelStore = useTravelStore()
const configStore = useConfigStore()

onMounted(() => {
  travelStore.fetchAllDestinations()
})

const destinations = computed(() =>
  travelStore.DESTINATIONS.map((d) => {
    const weather = travelStore.weatherMap[d.id]
    return {
      ...d,
      weather,
      loading: !!travelStore.loadingMap[d.id],
      error: !!travelStore.errorMap[d.id],
      recommendation: weather ? getWeekRecommendation(weather.forecast) : null,
    }
  }),
)

// 추천 등급이 가장 좋은 여행지를 이번 주 최고 추천으로 하이라이트
const LEVEL_PRIORITY = { best: 0, good: 1, caution: 2, bad: 3 }

const topPick = computed(() => {
  const candidates = destinations.value.filter((d) => d.recommendation)
  if (candidates.length === 0) return null
  return candidates.reduce((top, d) => (LEVEL_PRIORITY[d.recommendation.level] < LEVEL_PRIORITY[top.recommendation.level] ? d : top))
})

// 추천 등급이 좋은 여행지가 그리드 상단에 오도록 정렬 (아직 로딩/실패한 곳은 뒤로)
const sortedDestinations = computed(() =>
  [...destinations.value].sort((a, b) => {
    const aPriority = a.recommendation ? LEVEL_PRIORITY[a.recommendation.level] : 99
    const bPriority = b.recommendation ? LEVEL_PRIORITY[b.recommendation.level] : 99
    return aPriority - bPriority
  }),
)

function toDisplayTemp(rawTemp) {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
}

function goDetail(cityId) {
  router.push(`/final/${cityId}`)
}
</script>

<template>
  <div class="final-home">
    <header class="home-hero">
      <h1 class="hero-title">어디로 떠나볼까요?</h1>
      <p class="hero-subtitle">실시간 날씨를 확인하고 다음 여행지를 골라보세요</p>
    </header>

    <section v-if="topPick" class="top-pick" :style="{ background: getWeatherTheme(topPick.weather.main).gradient }" @click="goDetail(topPick.id)">
      <span class="top-pick-label">⭐ 이번 주 최고 추천 여행지</span>
      <div class="top-pick-body">
        <div class="top-pick-info">
          <h2 class="top-pick-city">{{ topPick.weather.name }}</h2>
          <p class="top-pick-desc">{{ topPick.recommendation.label }} · {{ topPick.weather.description }}</p>
        </div>
        <div class="top-pick-temp-group">
          <img :src="iconUrl(topPick.weather.icon)" :alt="topPick.weather.description" class="top-pick-icon" />
          <p class="top-pick-temp">{{ toDisplayTemp(topPick.weather.temp) }}{{ configStore.unitSymbol }}</p>
        </div>
      </div>
      <span class="top-pick-cta">지금 바로 떠나기 →</span>
    </section>

    <div class="destination-grid">
      <div
        v-for="destination in sortedDestinations"
        :key="destination.id"
        class="destination-card"
        :style="{ background: destination.weather ? getWeatherTheme(destination.weather.main).gradient : undefined }"
        @click="goDetail(destination.id)"
      >
        <template v-if="destination.loading">
          <p class="status-text">날씨 불러오는 중…</p>
        </template>
        <template v-else-if="destination.error">
          <p class="status-text">날씨 정보를 불러오지 못했어요.</p>
        </template>
        <template v-else-if="destination.weather">
          <span v-if="destination.recommendation" class="week-badge" :class="`week-badge-${destination.recommendation.level}`">
            {{ destination.recommendation.emoji }} {{ destination.recommendation.label }}
          </span>
          <div class="card-top">
            <h2 class="city-name">{{ destination.weather.name }}</h2>
            <img :src="iconUrl(destination.weather.icon)" :alt="destination.weather.description" class="weather-icon" />
          </div>
          <p class="temp">{{ toDisplayTemp(destination.weather.temp) }}{{ configStore.unitSymbol }}</p>
          <p class="description">{{ destination.weather.description }}</p>
          <span class="card-cta">5일 예보 보기 →</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.final-home {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #ffffff;
}

.home-hero {
  padding: 8px 4px 0;
}

.hero-title {
  margin: 0 0 8px;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: aliceblue;
}

.hero-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.72);
}

.top-pick {
  position: relative;
  padding: 28px 32px;
  border-radius: 28px;
  cursor: pointer;
  background: linear-gradient(160deg, #667eea 0%, #90a9f5 100%);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.top-pick::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

.top-pick:hover {
  transform: translateY(-4px) scale(1.005);
  box-shadow: 0 26px 52px rgba(0, 0, 0, 0.36);
}

.top-pick-label {
  position: relative;
  display: inline-block;
  margin-bottom: 14px;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  background: rgba(255, 214, 10, 0.85);
  color: #4a3200;
}

.top-pick-body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.top-pick-city {
  margin: 0 0 6px;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
}

.top-pick-desc {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.top-pick-temp-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-pick-icon {
  width: 56px;
  height: 56px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
}

.top-pick-temp {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: 800;
  line-height: 1;
}

.top-pick-cta {
  position: relative;
  display: inline-block;
  margin-top: 18px;
  font-size: 0.85rem;
  font-weight: 700;
  opacity: 0.9;
}

.destination-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-auto-rows: 1fr;
  gap: 20px;
  min-height: 380px;
}

.destination-card {
  position: relative;
  min-height: 220px;
  padding: 28px;
  border-radius: 28px;
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(160deg, #667eea 0%, #90a9f5 100%);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.destination-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0%, transparent 55%);
  pointer-events: none;
}

.destination-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.32);
}

.week-badge {
  position: relative;
  align-self: flex-start;
  margin-bottom: 12px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

.week-badge-best {
  background: rgba(255, 214, 10, 0.85);
  color: #4a3200;
}

.week-badge-good {
  background: rgba(255, 255, 255, 0.28);
  color: #ffffff;
}

.week-badge-caution {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.week-badge-bad {
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.city-name {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 800;
}

.weather-icon {
  width: 52px;
  height: 52px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
}

.temp {
  margin: 16px 0 4px;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
}

.description {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.92;
}

.card-cta {
  position: relative;
  margin-top: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  opacity: 0.85;
}

.status-text {
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
