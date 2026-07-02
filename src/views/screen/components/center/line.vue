<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let chartsRef = ref(null)

onMounted(() => {
  const mycharts = echarts.init(chartsRef.value)
  mycharts.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 20, top: 20, bottom: 24 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: { show: false },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11 }
    },
    series: [
      {
        type: 'line',
        data: [120, 1240, 660, 698, 210, 1678, 435],
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: { color: '#818cf8', width: 2 },
        itemStyle: { color: '#818cf8' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(129, 140, 248, 0.25)' },
            { offset: 1, color: 'rgba(129, 140, 248, 0)' }
          ])
        }
      }
    ]
  })
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="dot" style="background:#818cf8;box-shadow:0 0 6px #818cf8"></span>
      <span class="label">未来7天游客趋势</span>
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
  margin-bottom: 4px;
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
