<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import WeatherMockup from './components/exercise/WeatherMockup.vue'
import WeatherComposition from './components/exercise/WeatherComposition.vue'
import WeatherParent from './components/exercise/WeatherParent.vue'
import UnitToggler from './components/exercise/UnitToggler.vue'

const tasks = [
  { id: 1, label: '과제 1' },
  { id: 2, label: '과제 2' },
  { id: 3, label: '과제 3' },
  { id: 4, label: '과제 4' },
  { id: 5, label: '과제 5' },
  { id: 6, label: '최종본' },
]

const activeTask = ref(1)

// 과제4/5와 최종본이 같은 라우터를 공유하므로,
// 최종본 탭 진입/이탈 시 경로를 /final 쪽으로 맞춰준다
const router = useRouter()
const route = useRoute()

watch(activeTask, (task, prevTask) => {
  if (task === 6 && !route.path.startsWith('/final')) {
    router.push('/final')
  } else if (prevTask === 6 && route.path.startsWith('/final')) {
    router.push('/')
  }
})
</script>

<template>
  <div class="exercise-row">
    <nav class="task-nav">
      <button v-for="task in tasks" :key="task.id" type="button" class="task-nav-item" :class="{ active: activeTask === task.id }" @click="activeTask = task.id">
        {{ task.label }}
      </button>
    </nav>

    <div class="app-container" v-if="activeTask === 1">
      <h1>과제 1: 날씨 (Mockup)</h1>
      <hr />
      <WeatherMockup />
    </div>

    <div class="app-container" v-else-if="activeTask === 2">
      <h1>과제 2: 날씨 (컴포지션)</h1>
      <hr />
      <WeatherComposition />
    </div>

    <div class="app-container" v-else-if="activeTask === 3">
      <h1>과제 3: 날씨 (컴포넌트)</h1>
      <hr />
      <WeatherParent />
    </div>

    <div class="app-container" v-else-if="activeTask === 4">
      <h1>과제 4: 날씨 라우터 적용</h1>
      <hr />
      <div class="page-bg">
        <div class="dashboard-wrapper">
          <nav class="navigation-bar">
            <RouterLink to="/" class="nav-item">날씨 대시보드</RouterLink>
            <span class="divider">|</span>
            <RouterLink to="/about" class="nav-item">서비스 소개</RouterLink>
          </nav>
          <main>
            <RouterView />
          </main>
        </div>
      </div>
    </div>

    <div class="app-container" v-else-if="activeTask === 5">
      <h1>과제 5: 스토어 적용+API</h1>
      <hr />
      <div class="page-bg">
        <div class="dashboard-wrapper">
          <nav class="navigation-bar">
            <RouterLink to="/" class="nav-item">날씨 대시보드</RouterLink>
            <span class="divider">|</span>
            <RouterLink to="/about" class="nav-item">서비스 소개</RouterLink>
            <UnitToggler />
          </nav>
          <main>
            <RouterView />
          </main>
        </div>
      </div>
    </div>

    <div class="final-task" v-else-if="activeTask === 6">
      <div class="final-stage">
        <nav class="final-nav">
          <RouterLink to="/final" class="final-nav-title">✈️ 여행지 5일 날씨</RouterLink>
          <UnitToggler />
        </nav>
        <main class="final-main">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>

<style scoped>
.exercise-row {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.task-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 16px;
  z-index: 10;
}

.task-nav-item {
  padding: 8px 16px;
  border: 1px solid #dfe1e5;
  border-radius: 8px;
  background: #ffffff;
  color: #4b5563;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.task-nav-item:hover {
  background: #f3f4f6;
}

.task-nav-item.active {
  background: #3b7cf6;
  border-color: #3b7cf6;
  color: #ffffff;
}

/* ---- 최종본 (여행지 5일 날씨): #app의 1280px 제한을 깨고 화면 전체 폭 사용 ---- */
.final-task {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.final-stage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255, 255, 255, 0.06), transparent 45%),
    linear-gradient(160deg, #0f2027 0%, #203a43 45%, #2c5364 100%);
  box-sizing: border-box;
  padding: 20px clamp(20px, 5vw, 64px) 64px;
}

.final-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.final-nav-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: -0.01em;
}

.final-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
