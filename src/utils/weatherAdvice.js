// 기온 구간별 옷차림 추천 (하드코딩 기준표)
const OUTFIT_LEVELS = [
  { min: 28, emoji: '🩳', label: '민소매・반팔・반바지', tip: '최대한 가볍고 시원하게 입으세요' },
  { min: 23, emoji: '👕', label: '반팔 또는 얇은 셔츠', tip: '가벼운 옷차림이면 충분해요' },
  { min: 20, emoji: '👔', label: '얇은 가디건, 긴팔 셔츠', tip: '아침저녁으로는 겉옷 하나 챙기세요' },
  { min: 17, emoji: '🧥', label: '자켓 또는 가디건', tip: '선선하니 얇은 겉옷이 필요해요' },
  { min: 12, emoji: '🧣', label: '트렌치코트, 니트', tip: '쌀쌀하니 든든하게 챙겨 입으세요' },
  { min: 5, emoji: '🧤', label: '코트, 두꺼운 니트', tip: '춥습니다, 겨울 옷차림을 준비하세요' },
  { min: -Infinity, emoji: '🥶', label: '패딩, 두꺼운 코트', tip: '한파 수준이니 완전 무장하세요' },
]

export function getOutfitAdvice(tempCelsius) {
  return OUTFIT_LEVELS.find((level) => tempCelsius >= level.min)
}

// 비/눈 계열 날씨는 우산 챙기기를 추천
const RAIN_MAIN_TYPES = ['Rain', 'Drizzle', 'Thunderstorm', 'Snow']

export function getUmbrellaAdvice(main) {
  if (RAIN_MAIN_TYPES.includes(main)) {
    return { emoji: '☂️', label: '우산을 꼭 챙기세요', needed: true }
  }
  return { emoji: '👍', label: '우산 없이 다녀와도 좋아요', needed: false }
}

// 5일 예보 전체를 보고 이번 주에 여행하기 좋은 곳인지 하드코딩 기준으로 판단
export function getWeekRecommendation(forecast) {
  if (!forecast || forecast.length === 0) return null

  const rainyDays = forecast.filter((day) => RAIN_MAIN_TYPES.includes(day.main)).length
  const avgMaxTemp = forecast.reduce((sum, day) => sum + day.maxTemp, 0) / forecast.length

  if (rainyDays === 0 && avgMaxTemp >= 24 && avgMaxTemp <= 33) {
    return { emoji: '⭐', label: '이번 주 추천 여행지', level: 'best' }
  }
  if (rainyDays <= 1) {
    return { emoji: '🌤️', label: '여행하기 좋은 한 주', level: 'good' }
  }
  if (rainyDays <= 2) {
    return { emoji: '🌦️', label: '군데군데 비 소식', level: 'caution' }
  }
  return { emoji: '🌧️', label: '우천 많음, 다음 기회에', level: 'bad' }
}
