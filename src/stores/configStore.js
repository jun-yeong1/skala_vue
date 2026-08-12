import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useConfigStore = defineStore('config', () => {
    // 변수 초기값은 도씨
    const unit = ref('celsius')
    // 변경에 맞추어 심볼 변경
    const unitSymbol = computed(() => {
        return unit.value === 'celsius' ? '℃' : '℉'
    })
    // 버튼 클릭 토글 함수
    function toggleUnit() {
        unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
    }
    return {
        unit,
        unitSymbol,
        toggleUnit,
    }
})