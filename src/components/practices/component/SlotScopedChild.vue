<script setup>
import { ref } from 'vue'

const message = ref('현재 상태')
const userCount = ref(10)
</script>

<template>
  <div class="base-card">
    <h3>하위 컴포넌트 child</h3>
    <slot :text="message" :count="userCount">
      <p>부모가 안줫을 때 디폴트 화면</p>
    </slot>
  </div>
</template>
