# skala-vue

## 최종본: 여행지 5일 날씨

`ExerciseApp.vue`의 "최종본" 탭(`/final`, `/final/:cityId`)에 구현한 최종 과제. 과제4/5가 쓰던 라우터·뷰를 그대로 재사용하던 자리에, 전용 화면과 기능을 새로 만들었다.

### 원본(과제4/5) 대비 달라진 점

- **라우팅/화면 분리**: `/`, `/weather/:cityId`를 공유하던 구조에서 벗어나 `/final`, `/final/:cityId` 전용 라우트와 `FinalWeatherHomeView.vue` / `FinalWeatherDetailView.vue`를 새로 만들어 과제4/5와 완전히 독립적으로 동작하게 함
- **현재 날씨 → 5일 예보**: `data/2.5/weather`(현재 날씨 단건) 호출만 있던 것에, `data/2.5/forecast`(3시간 간격 5일치) 호출을 추가. 3시간 간격 데이터를 날짜별로 묶어 하루 최고/최저 기온과 대표 날씨를 뽑아내는 집계 로직(`aggregateDaily`)을 `travelStore.js`에 작성
- **디자인 전면 교체**: 날씨 상태(맑음/흐림/비/눈 등)에 따라 카드 배경이 바뀌는 테마 매핑을 `utils/weatherTheme.js`에 구현

### 여행지 목록

대륙별 대표 여름 휴양지 + 국내 여행지 (`stores/travelStore.js`의 `DESTINATIONS`):

| 여행지   | 국가   |
| -------- | ------ |
| 산토리니 | 그리스 |
| 마이애미 | 미국   |
| 푸켓     | 태국   |
| 칸쿤     | 멕시코 |
| 후쿠오카 | 일본   |
| 부산     | 한국   |
| 경주     | 한국   |

### 새 기능 — 옷차림·우산 추천 (하드코딩)

- 기온 구간별(7단계: 28℃ 이상 반팔 ~ 5℃ 미만 패딩) 옷차림 추천표와, 날씨 상태(비/눈/소나기/뇌우)일 때 우산 챙기기 추천을 `utils/weatherAdvice.js`에 하드코딩
- 상세 페이지의 "오늘의 준비물" 카드 2개(옷차림/우산)로 노출, 5일 예보 카드에도 비/눈 오는 날엔 ☂️ 배지 표시
- 옷차림 추천은 ℃/℉ 토글과 무관하게 항상 원본 섭씨 값 기준으로 판단

### 새 기능 — 5일 예보 기반 추천 배지 (하드코딩)

- `getWeekRecommendation(forecast)`가 5일 예보의 비/눈 계열 날짜 수와 평균 최고기온을 보고 4단계로 판정
  - ⭐ 비 0일 + 평균 최고기온 24~33℃ → "이번 주 추천 여행지"
  - 🌤️ 비 1일 이하 → "여행하기 좋은 한 주"
  - 🌦️ 비 2일 → "군데군데 비 소식"
  - 🌧️ 비 3일 이상 → "우천 많음, 다음 기회에"
- 홈 화면(`FinalWeatherHomeView.vue`)의 각 여행지 카드 상단에 알약 모양 배지로 표시, 최고 등급(⭐)은 노란색으로 강조

### 기존 기능 재사용

- 섭씨/화씨 단위 토글은 과제5에서 만든 `stores/configStore.js`(Pinia)를 새 코드 없이 그대로 재사용

### 파일 구조

```
src/
  views/final/
    FinalWeatherHomeView.vue    # 여행지 카드 목록 (현재 날씨)
    FinalWeatherDetailView.vue  # 상세 날씨 + 옷차림/우산 추천 + 5일 예보
  components/exercise/
    DailyForecastCard.vue       # 일별 예보 카드
  stores/
    travelStore.js              # 도시별 현재+예보 데이터 fetch/캐싱
  utils/
    weatherTheme.js             # 날씨 상태별 아이콘 URL
    weatherAdvice.js            # 기온별 옷차림, 우산 추천, 5일 예보 기반 주간 추천 하드코딩 테이블
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
