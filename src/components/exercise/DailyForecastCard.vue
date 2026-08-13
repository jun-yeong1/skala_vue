<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { getWeatherTheme, iconUrl, formatForecastDate } from '@/utils/weatherTheme'
import { getUmbrellaAdvice } from '@/utils/weatherAdvice'

const props = defineProps({
  day: { type: Object, required: true },
  index: { type: Number, required: true },
})

const configStore = useConfigStore()
const theme = computed(() => getWeatherTheme(props.day.main))
const umbrellaAdvice = computed(() => getUmbrellaAdvice(props.day.main))

function toDisplayTemp(rawTemp) {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
}

const displayMax = computed(() => toDisplayTemp(props.day.maxTemp))
const displayMin = computed(() => toDisplayTemp(props.day.minTemp))
const dateLabel = computed(() => formatForecastDate(props.day.date, props.index))
</script>

<template>
  <div class="daily-forecast-card" :style="{ background: theme.gradient }">
    <span v-if="umbrellaAdvice.needed" class="umbrella-badge" title="우산을 챙기세요">☂️</span>
    <p class="date-label">{{ dateLabel }}</p>
    <img :src="iconUrl(day.icon)" :alt="day.description" class="weather-icon" />
    <p class="description">{{ day.description }}</p>
    <div class="temp-range">
      <span class="temp-max">{{ displayMax }}{{ configStore.unitSymbol }}</span>
      <span class="temp-min">{{ displayMin }}{{ configStore.unitSymbol }}</span>
    </div>
  </div>
</template>

<style scoped>
.daily-forecast-card {
  position: relative;
  flex: 0 0 auto;
  width: 140px;
  padding: 22px 14px;
  border-radius: 22px;
  color: #ffffff;
  text-align: center;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.2);
}

.umbrella-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.95rem;
}

.date-label {
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: 700;
}

.weather-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

.description {
  margin: 2px 0 14px;
  font-size: 0.78rem;
  opacity: 0.92;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.temp-range {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
}

.temp-max {
  font-weight: 700;
}

.temp-min {
  opacity: 0.75;
}
</style>
