# skala-vue

🔗 [Live Demo](https://jun-yeong1.github.io/skala_vue/)

## 학습 정리: 자바스크립트 & Vue.js

### 자바스크립트

- **인터프리터 언어**: 한 줄씩 실행되며, 미리 선언되지 않은 변수를 코드 아래쪽에서 사용해도 선언을 위로 끌어올리는 **호이스팅**이 발생
- **함수**: 데이터 타입으로 취급되어 변수 저장 가능 — 함수 선언(`function a(){}`), 함수 표현식(`let a = function(a,b){...}`), 화살표 함수(`let a = (a,b) => a*b`)
- **객체**: `Object`, `Array`, `Function`, `Date`, `RegExp`, `Map/Set` 모두 참조 타입 → 전달 시 메모리 주소 공유(값 변경 가능), 복사 시 **깊은 복사** 발생. 스프레드 연산자(`...`)로 얕은 복사 가능
- **Promise / async-await**: 비동기 작업의 성공(`resolve`→`.then()`)/실패(`reject`→`.catch()`) 처리. `async`/`await`로 순차 실행 표현 가능
- **모듈**: `export`로 외부 노출 지정, `<script type="module">`로 일부 코드만 모듈로 사용
- 기타 문법: **property shorthand**(`title: title` → `title`), **optional chaining**(`?.`, null/undefined 시 에러 없이 undefined 반환)

### Vue.js

- **MVVM 아키텍처**: View(HTML/CSS/JS) ↔ ViewModel(Vue) ↔ Model(데이터)
- **Virtual DOM**: 실제 DOM과 페이지 사이에서 렌더링 비용을 줄여줌
- **양방향 데이터 바인딩**: 데이터 변경 → 화면 반영, 화면 변경 → 데이터 반영
- **컴포넌트**: 재사용 가능한 독립 UI 단위, 부모-자식 트리 구조로 조립
- **렌더링 방식**: CSR(브라우저에서 JS 실행, Vue 기본)과 SSR(서버가 완성된 HTML 전달)
- **SPA**: 하나의 HTML만 존재하고 이후 화면 전환은 JS가 처리 (↔ MPA는 매 이동마다 서버에 새 HTML 요청)
- **반응형**: `ref()`로 값을 반응형 상태로 선언

**디렉티브**

- `v-html`: HTML 문자열 렌더링, XSS 주의
- `v-text` / `{{ }}` 보간법
- `v-bind`(`:`로 축약): 속성 동적 바인딩
- `v-if` / `v-else`: 조건에 따라 태그 제거
- `v-show`: display:none 토글
- `v-for`: 배열 렌더링
- `v-pre`: 구문 그대로 출력
- `v-cloak`: 렌더링 지연 시 미노출 처리
- `v-once`: 최초 1회만 렌더링
- `v-memo`: 조건부 재렌더링
- `v-on`(`@`로 축약): 이벤트 리스너
- `v-model`: 양방향 바인딩, `.lazy`/`.number`/`.trim` 수식어

- **`<style scoped>`**: 해당 컴포넌트 내부에만 스타일 적용
- **Composition API**: `reactive()`(객체/배열 반응형화), `computed()`(의존 데이터 변경 시 자동 재계산), `watch()`/`watchEffect()`(반응형 데이터 변경 감지 후 로직 실행)
- **컴포넌트 라이프사이클**: 생성 → 부착 → 갱신 → 소멸
- **컴포넌트 간 통신**: `defineProps()`(부모→자식), `defineEmits()`(자식→부모 이벤트), `provide`/`inject`(먼 조상-자손 간 데이터 전달), **Slot**(자식이 만든 공간에 부모가 콘텐츠 주입)

### Vue Router & Pinia

- **Vue Router**: 서버에 새 페이지를 요청하지 않고 URL에 매칭되는 컴포넌트를 실시간으로 교체
- **Pinia**: Vue3 상태 관리 라이브러리. `defineStore()`로 전역 Store 생성(변수명은 `use+이름+Store` 규칙)

### API / Axios

- **REST API**: 주소는 동사가 아닌 명사로 설계 (`/getWeather` ✗ → `/weather` ✓)
- **Axios**: `get`/`post`/`put`/`patch`/`delete` 메서드로 HTTP 요청 처리, Promise 기반이라 `.then()` 또는 `async/await`로 비동기 처리 가능

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
