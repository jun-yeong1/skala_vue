<script setup>
</script>

<template>
  <div class="practice-section">
    <h2>Scoped 스타일 및 외부 CSS 활용</h2>
    <p>스타일에 Scoped 옵션을 주면 해당 컴포넌트에서만 이용할 수 있는 스타일</p>
    <p class="title">이 글자는 이 컴포넌트 내부에서만 적용됩니다.</p>
    <button class="btn-external">외부 CSS에서 불러온 버튼 스타일</button>
  </div>
</template>

<style scoped>
/* 내 방 전용 타이틀 디자인 */
.title {
  color: #7572c4;
  font-weight: bold;
  font-size: 18px;
}
</style>
