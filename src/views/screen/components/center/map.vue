<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'

let mapRef = ref(null)

echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
  const mycharts = echarts.init(mapRef.value)
  mycharts.setOption({
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.25,
      top: 60,
      label: { show: false },
      itemStyle: {
        areaColor: 'rgba(30, 50, 100, 0.6)',
        borderColor: 'rgba(100, 140, 220, 0.3)',
        borderWidth: 1,
        shadowColor: 'rgba(0, 100, 255, 0.15)',
        shadowBlur: 10
      },
      emphasis: {
        itemStyle: { areaColor: 'rgba(60, 100, 200, 0.5)' },
        label: { show: false }
      }
    },
    series: [
      {
        type: 'lines',
        coordinateSystem: 'geo',
        polyline: false,
        data: [
          { coords: [[116.4, 39.9], [121.5, 31.2]], lineStyle: { color: '#38bdf8', width: 1.5 } },
          { coords: [[116.4, 39.9], [113.3, 23.1]], lineStyle: { color: '#818cf8', width: 1 } },
          { coords: [[116.4, 39.9], [104.1, 30.6]], lineStyle: { color: '#a78bfa', width: 1 } },
          { coords: [[121.5, 31.2], [120.2, 30.3]], lineStyle: { color: '#60a5fa', width: 1 } }
        ],
        effect: {
          show: true,
          period: 5,
          symbol: 'circle',
          symbolSize: 6,
          color: '#38bdf8'
        }
      }
    ]
  })
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="dot" style="background:#38bdf8;box-shadow:0 0 6px #38bdf8"></span>
      <span class="label">全国游客流量分布</span>
    </div>
    <div class="map" ref="mapRef"></div>
  </div>
</template>

<style scoped lang="scss">
.card {
  flex: 2.5;
  @include glass($bg: rgba(255, 255, 255, 0.03), $border: 1px solid rgba(255, 255, 255, 0.06), $shadow: none);
  border-radius: 12px;
  padding: 16px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .label {
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    font-weight: 600;
  }
}
.map {
  width: 100%;
  height: calc(100% - 32px);
}
</style>
