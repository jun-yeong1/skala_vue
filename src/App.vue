<script setup>
import ExerciseApp from './ExerciseApp.vue'
import PracticeApp from './PracticeApp.vue'

// 화면 전환
// 'practice' : 강의 예제
// 'exercise' : 과제 - 디폴트
const MODE = 'exercise'
// const MODE = 'practice'
</script>

<template>
  <PracticeApp v-if="MODE === 'practice'" />
  <ExerciseApp v-else />
</template>
