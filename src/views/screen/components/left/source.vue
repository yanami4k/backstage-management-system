<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let chartsRef = ref(null)

onMounted(() => {
  const myCharts = echarts.init(chartsRef.value)
  myCharts.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: 80,
      right: 30,
      top: 10,
      bottom: 10
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: {
      type: 'category',
      data: ['上海', '广州', '成都', '杭州', '西安'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 13
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: 14,
        data: [
          { value: 82, itemStyle: { color: '#a78bfa' } },
          { value: 65, itemStyle: { color: '#818cf8' } },
          { value: 53, itemStyle: { color: '#60a5fa' } },
          { value: 41, itemStyle: { color: '#38bdf8' } },
          { value: 30, itemStyle: { color: '#22d3ee' } }
        ],
        label: {
          show: true,
          position: 'right',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: 12,
          formatter: '{c}%'
        },
        itemStyle: {
          borderRadius: [0, 7, 7, 0]
        }
      }
    ]
  })
})
</script>

<template>
  <div class="source card">
    <div class="card-header">
      <span class="dot"></span>
      <span class="label">城市游客来源 TOP5</span>
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
  margin-bottom: 12px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #818cf8;
    box-shadow: 0 0 6px #818cf8;
  }
  .label {
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    font-weight: 600;
  }
}
.charts {
  width: 100%;
  height: calc(100% - 36px);
}
</style>
