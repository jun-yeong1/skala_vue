// OpenWeatherMap의 weather.main 값에 따른 그라디언트/아이콘 톤 매핑
const THEMES = {
  Clear: { gradient: 'linear-gradient(160deg, #4facfe 0%, #a1c4fd 100%)', emoji: '☀️' },
  Clouds: { gradient: 'linear-gradient(160deg, #7f8c9a 0%, #bdc9d7 100%)', emoji: '☁️' },
  Rain: { gradient: 'linear-gradient(160deg, #3a4a63 0%, #6b8cae 100%)', emoji: '🌧️' },
  Drizzle: { gradient: 'linear-gradient(160deg, #5b7a9d 0%, #8fb3d6 100%)', emoji: '🌦️' },
  Thunderstorm: { gradient: 'linear-gradient(160deg, #232946 0%, #4b5a7c 100%)', emoji: '⛈️' },
  Snow: { gradient: 'linear-gradient(160deg, #83a4d4 0%, #e6f0fa 100%)', emoji: '❄️' },
  Mist: { gradient: 'linear-gradient(160deg, #757f9a 0%, #c8d3e0 100%)', emoji: '🌫️' },
  Haze: { gradient: 'linear-gradient(160deg, #757f9a 0%, #c8d3e0 100%)', emoji: '🌫️' },
  Fog: { gradient: 'linear-gradient(160deg, #757f9a 0%, #c8d3e0 100%)', emoji: '🌫️' },
}

const DEFAULT_THEME = { gradient: 'linear-gradient(160deg, #667eea 0%, #90a9f5 100%)', emoji: '🌤️' }

export function getWeatherTheme(main) {
  return THEMES[main] || DEFAULT_THEME
}

export function iconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function formatForecastDate(dateStr, index) {
  const date = new Date(`${dateStr}T00:00:00`)
  const label = index === 0 ? '오늘' : `${date.getMonth() + 1}/${date.getDate()}`
  return `${label} (${WEEKDAYS[date.getDay()]})`
}
