<script setup>
// 상위로 입력 데이터를 전달할 이벤트
defineEmits(['update-query'])

// 상위로부터 현재 검색 상태 값 수신
defineProps({
    currentQuery: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <div class="search-box">
        <h3>도시 검색</h3>
        <input type="text" :value="currentQuery"
            @input="$emit('update-query', $event.target.value)"
            placeholder="검색할 도시 이름 입력" />
        <p class="hint">검색 중인 도시: <strong>{{ currentQuery }}</strong></p>
    </div>
</template>