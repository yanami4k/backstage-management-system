<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let chartsRef = ref(null)

onMounted(() => {
  const myCharts = echarts.init(chartsRef.value)
  myCharts.setOption({
    legend: {
      top: 10,
      right: 10,
      textStyle: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 11 },
      itemWidth: 8,
      itemHeight: 8
    },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '55%'],
        roseType: 'area',
        itemStyle: { borderRadius: 6 },
        label: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 12 },
        labelLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
        data: [
          { value: 40, name: '18岁以下', itemStyle: { color: '#a78bfa' } },
          { value: 38, name: '18-25岁', itemStyle: { color: '#818cf8' } },
          { value: 32, name: '26-35岁', itemStyle: { color: '#60a5fa' } },
          { value: 30, name: '36-50岁', itemStyle: { color: '#38bdf8' } },
          { value: 28, name: '50岁以上', itemStyle: { color: '#22d3ee' } }
        ]
      }
    ]
  })
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="dot" style="background:#a78bfa;box-shadow:0 0 6px #a78bfa"></span>
      <span class="label">游客年龄分布</span>
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
