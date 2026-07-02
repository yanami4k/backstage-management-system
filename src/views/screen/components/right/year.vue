<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let chartsRef = ref(null)

onMounted(() => {
  const mycharts = echarts.init(chartsRef.value)
  mycharts.setOption({
    grid: { left: 50, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'category', show: false },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10 }
    },
    series: [{
      type: 'scatter',
      data: [[0, 33], [1, 44], [2, 123], [3, 54], [4, 24], [5, 54], [6, 23], [7, 65], [8, 54], [9, 98]],
      symbolSize: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: '#818cf8' },
          { offset: 1, color: '#22d3ee' }
        ])
      }
    }],
    tooltip: { show: true }
  })
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="dot" style="background:#818cf8;box-shadow:0 0 6px #818cf8"></span>
      <span class="label">年度游客量对比</span>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<style scoped lang="scss">
.card {
  flex: 1;
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
.charts {
  width: 100%;
  height: calc(100% - 32px);
}
</style>
