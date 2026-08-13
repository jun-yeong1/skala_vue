import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

// 최종본에서 다루는 여행지 목록 (대륙별 대표 여름 휴양지)
export const DESTINATIONS = [
  { id: 'santorini', name: '산토리니 (그리스)', query: 'Santorini,GR' },
  { id: 'miami', name: '마이애미 (미국)', query: 'Miami,US' },
  { id: 'phuket', name: '푸켓 (태국)', query: 'Phuket,TH' },
  { id: 'cancun', name: '칸쿤 (멕시코)', query: 'Cancun,MX' },
  { id: 'fukuoka', name: '후쿠오카 (일본)', query: 'Fukuoka,JP' },
  { id: 'busan', name: '부산 (한국)', query: 'Busan,KR' },
  { id: 'gyeongju', name: '경주 (한국)', query: 'Gyeongju,KR' },
]

// forecast API는 3시간 간격 데이터를 주기 때문에 날짜별로 묶어서
// 하루 최고/최저 기온과 대표 날씨(정오에 가장 가까운 데이터)를 뽑아낸다
function aggregateDaily(list) {
  const groups = {}
  list.forEach((entry) => {
    const [date, time] = entry.dt_txt.split(' ')
    if (!groups[date]) groups[date] = []
    groups[date].push({ ...entry, hour: Number(time.split(':')[0]) })
  })

  return Object.keys(groups)
    .slice(0, 5)
    .map((date) => {
      const entries = groups[date]
      const temps = entries.map((e) => e.main.temp)
      const noonEntry = entries.reduce((closest, e) => (Math.abs(e.hour - 12) < Math.abs(closest.hour - 12) ? e : closest))
      return {
        date,
        minTemp: Math.min(...temps),
        maxTemp: Math.max(...temps),
        icon: noonEntry.weather[0].icon,
        main: noonEntry.weather[0].main,
        description: noonEntry.weather[0].description,
      }
    })
}

export const useTravelStore = defineStore('travel', () => {
  const weatherMap = ref({}) // cityId -> { name, temp, humidity, wind, icon, main, description, forecast: [] }
  const loadingMap = ref({}) // cityId -> boolean
  const errorMap = ref({}) // cityId -> boolean

  async function fetchDestination(cityId) {
    const destination = DESTINATIONS.find((d) => d.id === cityId)
    if (!destination || weatherMap.value[cityId] || loadingMap.value[cityId]) return

    loadingMap.value[cityId] = true
    errorMap.value[cityId] = false
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${CURRENT_URL}?q=${destination.query}&appid=${API_KEY}&units=metric&lang=kr`),
        axios.get(`${FORECAST_URL}?q=${destination.query}&appid=${API_KEY}&units=metric&lang=kr`),
      ])
      const raw = currentRes.data
      weatherMap.value[cityId] = {
        name: destination.name,
        temp: raw.main.temp,
        humidity: raw.main.humidity,
        wind: raw.wind.speed,
        icon: raw.weather[0].icon,
        main: raw.weather[0].main,
        description: raw.weather[0].description,
        forecast: aggregateDaily(forecastRes.data.list),
      }
    } catch (error) {
      console.error(`[travelStore] ${destination.name} 날씨 로딩 실패: `, error)
      errorMap.value[cityId] = true
    } finally {
      loadingMap.value[cityId] = false
    }
  }

  function fetchAllDestinations() {
    return Promise.all(DESTINATIONS.map((d) => fetchDestination(d.id)))
  }

  return {
    DESTINATIONS,
    weatherMap,
    loadingMap,
    errorMap,
    fetchDestination,
    fetchAllDestinations,
  }
})
