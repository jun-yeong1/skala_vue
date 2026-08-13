<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTravelStore } from '@/stores/travelStore'
import { useConfigStore } from '@/stores/configStore'
import { getWeatherTheme, iconUrl } from '@/utils/weatherTheme'
import { getOutfitAdvice, getUmbrellaAdvice } from '@/utils/weatherAdvice'
import DailyForecastCard from '@/components/exercise/DailyForecastCard.vue'

const route = useRoute()
const router = useRouter()
const travelStore = useTravelStore()
const configStore = useConfigStore()

const cityId = computed(() => route.params.cityId)

onMounted(() => {
  travelStore.fetchDestination(cityId.value)
})

const weather = computed(() => travelStore.weatherMap[cityId.value])
const isLoading = computed(() => !!travelStore.loadingMap[cityId.value])
const isError = computed(() => !!travelStore.errorMap[cityId.value])
const theme = computed(() => getWeatherTheme(weather.value?.main))
// 옷차림/우산 추천은 항상 섭씨 원본 기온 기준으로 판단한다 (단위 토글과 무관)
const outfitAdvice = computed(() => weather.value && getOutfitAdvice(weather.value.temp))
const umbrellaAdvice = computed(() => weather.value && getUmbrellaAdvice(weather.value.main))

function toDisplayTemp(rawTemp) {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
}
</script>

<template>
  <div class="final-detail">
    <button class="back-btn" @click="router.push('/final')">← 여행지 목록으로</button>

    <p v-if="isLoading" class="status-text">날씨 불러오는 중…</p>
    <p v-else-if="isError" class="status-text">날씨 정보를 불러오지 못했어요.</p>

    <template v-else-if="weather">
      <section class="hero" :style="{ background: theme.gradient }">
        <h1 class="city-name">{{ weather.name }}</h1>
        <img :src="iconUrl(weather.icon)" :alt="weather.description" class="hero-icon" />
        <p class="hero-temp">{{ toDisplayTemp(weather.temp) }}{{ configStore.unitSymbol }}</p>
        <p class="hero-description">{{ weather.description }}</p>
        <div class="hero-stats">
          <span>💧 습도 {{ weather.humidity }}%</span>
          <span>🌬️ 풍속 {{ weather.wind }}m/s</span>
        </div>
      </section>

      <section class="advice-section">
        <div class="advice-card">
          <span class="advice-emoji">{{ outfitAdvice.emoji }}</span>
          <div>
            <p class="advice-label">{{ outfitAdvice.label }}</p>
            <p class="advice-tip">{{ outfitAdvice.tip }}</p>
          </div>
        </div>
        <div class="advice-card" :class="{ 'advice-warn': umbrellaAdvice.needed }">
          <span class="advice-emoji">{{ umbrellaAdvice.emoji }}</span>
          <div>
            <p class="advice-label">{{ umbrellaAdvice.label }}</p>
            <p class="advice-tip">{{ weather.description }} 기준 추천이에요</p>
          </div>
        </div>
      </section>

      <section class="forecast-section">
        <h3 class="section-title">5일 예보</h3>
        <div class="forecast-strip">
          <DailyForecastCard v-for="(day, index) in weather.forecast" :key="day.date" :day="day" :index="index" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.final-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #ffffff;
}

.back-btn {
  align-self: flex-start;
  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.16);
}

.status-text {
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 40px 0;
}

.hero {
  flex: 1;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.city-name {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
}

.hero-icon {
  width: 120px;
  height: 120px;
  margin: 8px 0 -8px;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
}

.hero-temp {
  margin: 0;
  font-size: clamp(3.5rem, 8vw, 5.5rem);
  font-weight: 800;
  line-height: 1;
}

.hero-description {
  margin: 8px 0 20px;
  font-size: 1.1rem;
  opacity: 0.92;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 0.9rem;
  opacity: 0.92;
}

.advice-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.advice-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.advice-card.advice-warn {
  background: rgba(255, 180, 180, 0.14);
  border-color: rgba(255, 180, 180, 0.35);
}

.advice-emoji {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.advice-label {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 700;
}

.advice-tip {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.78;
}

.section-title {
  margin: 0 0 16px;
  font-size: 1.1rem;
  font-weight: 700;
}

.forecast-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding-bottom: 8px;
}
</style>
