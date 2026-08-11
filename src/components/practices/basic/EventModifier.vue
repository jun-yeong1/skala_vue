<script setup>
const handleLink = () => {
    alert('링크 클릭했지만 페이지 이동 안함')
}
const handleBox = () => {
    alert('부모 박스 클릭')
}
const handleChild1 = () => {
    alert('자식1 클릭')
}
const handleChild2 = () => {
    alert('자식2 클릭')
}
</script>

<template>
  <div class="practice-section">
    <h2>이벤트 수식어 학습</h2>
    <p>이벤트 수식어는 이벤트를 처리할 때 추가적인 기능</p>
    <p>1) .prevent : 이벤트의 기본 동작을 막음</p>
    <a href="https://www.naver.com" @click.prevent="handleLink">네이버 이동</a>
    <br />
    <p>2) .stop : 이벤트 버블링을 막음(자식->부모)</p>
    <div @click="handleBox" style="padding: 20px; background-color: #eee">
      <p>부모 박스(박스 영역 클릭할 때 handleBox 함수 호출)</p>
      <button @click="handleChild1">버블링 발생 버튼 - 자식1</button>
      <button @click.stop="handleChild2">버블링 차단 버튼 - 자식2</button>
    </div>
  </div>
</template>