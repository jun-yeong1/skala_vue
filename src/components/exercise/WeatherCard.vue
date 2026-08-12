<script setup>

import { computed } from 'vue';
import { useConfigStore } from '@/stores/configStore';
// 상위로부터 데이터 주입받을 규격 
const props = defineProps({
    cityItem: { type: Object, required: true },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
    const rawTemp = props.cityItem.temp
    if (configStore.unit === 'fahrenheit') {
        return Math.round((rawTemp * 9) / 5 + 32) // 화씨로 변환식
    }
    return rawTemp
})
</script>

<template>
    <div class="weather-card"
            @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
        <div class="weather-info">
            <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
            <p>현재 기온: {{displayTemp}}{{ configStore.unitSymbol }}</p>

            <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움</span>
            <span v-else-if="cityItem.temp >= 15" class="badge cool">🍃 신선함</span>
            <span v-else class="badge ice">🧊 추움</span>
        </div>
        <button class="btn-detail"
                @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
            상세보기
        </button>
    </div>
</template>

<style>

</style>