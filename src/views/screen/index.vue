<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/left/tourist.vue'
import Source from './components/left/source.vue'
import Age from './components/left/age.vue'
import Map from './components/center/map.vue'
import Line from './components/center/line.vue'
import Rank from './components/right/rank.vue'
import Year from './components/right/year.vue'
import Counter from './components/right/counter.vue'

let screenRef = ref<HTMLElement | null>(null)

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

onMounted(() => {
  if (screenRef.value) {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
})

window.addEventListener('resize', () => {
  if (screenRef.value) {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
})
</script>

<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <Top></Top>
      <div class="main">
        <div class="left">
          <Tourist></Tourist>
          <Source></Source>
          <Age></Age>
        </div>
        <div class="center">
          <Map></Map>
          <Line></Line>
        </div>
        <div class="right">
          <Rank></Rank>
          <Year></Year>
          <Counter></Counter>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0f1f 0%, #0d1528 40%, #111d3a 100%);
  overflow: hidden;
  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    padding: 0 24px;
    .main {
      display: flex;
      gap: 16px;
      .left {
        flex: 1;
        flex-direction: column;
        display: flex;
        gap: 12px;
        height: 1020px;
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 12px;
        justify-content: space-between;
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    }
  }
}
</style>
