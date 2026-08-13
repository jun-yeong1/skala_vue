<script setup>
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import VueBind from './components/practices/basic/VueBind.vue'
import VueBindClass from './components/practices/basic/VueBindClass.vue'
import VueBindShorthand from './components/practices/basic/VueBindShorthand.vue'
import VueBindStyle from './components/practices/basic/VueBindStyle.vue'
import VueFor from './components/practices/basic/VueFor.vue'
import VueHtml from './components/practices/basic/VueHtml.vue'
import VueHtmlXss from './components/practices/basic/VueHtmlXss.vue'
import VueIf from './components/practices/basic/VueIf.vue'
import VueShow from './components/practices/basic/VueShow.vue'
import VueText from './components/practices/basic/VueText.vue'
import VuePre from './components/practices/basic/VuePre.vue'
import VueOnce from './components/practices/basic/VueOnce.vue'
import VueCloak from './components/practices/basic/VueCloak.vue'
import VueMemo from './components/practices/basic/VueMemo.vue'
import EventVon from './components/practices/basic/EventVon.vue'
import EventObject from './components/practices/basic/EventObject.vue'
import EventModifier from './components/practices/basic/EventModifier.vue'
import ModelBasic from './components/practices/basic/ModelBasic.vue'
import ModelForm from './components/practices/basic/ModelForm.vue'
import ModelModifier from './components/practices/basic/ModelModifier.vue'
import StyleScoped from './components/practices/basic/StyleScoped.vue'
import VueRef from './components/practices/basic/VueRef.vue'
import VueReactive from './components/practices/basic/VueReactive.vue'
import ComputedExa from './components/practices/basic/ComputedExa.vue'
import WatchExa from './components/practices/basic/WatchExa.vue'
import WatchMulti from './components/practices/basic/WatchMulti.vue'
import WatchDeep from './components/practices/basic/WatchDeep.vue'
import WatchReactive from './components/practices/basic/WatchReactive.vue'
import WatchEffect from './components/practices/basic/WatchEffect.vue'
import LifecycleParent from './components/practices/component/LifecycleParent.vue'
import PropsEmitsParent from './components/practices/component/PropsEmitsParent.vue'
import SlotDefaultParent from './components/practices/component/SlotDefaultParent.vue'
import SlotNamedParent from './components/practices/component/SlotNamedParent.vue'
import SlotScopedParent from './components/practices/component/SlotScopedParent.vue'
import StoreCounter from './components/practices/library/StoreCounter.vue'
import AxiosWeather from './components/practices/library/AxiosWeather.vue'
import AxiosJson from './components/practices/library/AxiosJson.vue'
import ElementPlus from './components/practices/library/ElementPlus.vue'
</script>

<template>
  <h1>Hello Skala-Vue</h1>
  <br />
  <div class="practice-section">
    <h1>1. 학습환경구성</h1>
    <hr />
    <SampleOne />
    <SampleTwo />
    <VueBind />
    <VueBindClass />
    <VueBindShorthand />
    <VueBindStyle />
    <VueFor />
    <VueHtml />
    <VueHtmlXss />
    <VueIf />
    <VueShow />
    <VueText />
    <VuePre />
    <VueOnce />
    <VueCloak />
    <VueMemo />
    <EventVon />
    <EventObject />
    <EventModifier />
    <ModelBasic />
    <ModelForm />
    <ModelModifier />
    <StyleScoped />
    <VueRef />
    <VueReactive />
    <ComputedExa />
    <WatchExa />
    <WatchMulti />
    <WatchDeep />
    <WatchReactive />
    <WatchEffect />
    <LifecycleParent />
    <PropsEmitsParent />
    <SlotDefaultParent />
    <SlotNamedParent />
    <SlotScopedParent />
    <StoreCounter />
    <AxiosWeather />
    <AxiosJson />
    <ElementPlus />
  </div>
</template>

<style>
/* 외부 스타일 들고오기 */
@import '@/assets/practice.css';
</style>
