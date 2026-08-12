<script setup>
import SlotNamedChild from '../component/SlotNamedChild.vue';
</script>
<template>
    <div class="practice-section">
        <h2>Named Slot 주입</h2>
        <SlotNamedChild>
            <template v-slot:header>
                <h3>Child 주입</h3>
            </template>
            <p>안녕하세요 제목입니다.</p>
        </SlotNamedChild>
    </div>
</template>