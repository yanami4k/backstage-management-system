<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let chartsRef = ref(null)

onMounted(() => {
  const mycharts = echarts.init(chartsRef.value)
  mycharts.setOption({
    title: {
      text: '景区排行',
      left: 'center',
      top: 8,
      textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 }
    },
    grid: { left: 40, right: 20, top: 45, bottom: 10 },
    xAxis: {
      type: 'category',
      data: ['西湖', '长城', '黄山', '桂林', '三亚', '丽江', '九寨'],
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, rotate: 25 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10 }
    },
    series: [
      {
        type: 'bar',
        barWidth: 18,
        data: [95, 88, 76, 68, 56, 45, 38],
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a78bfa' },
            { offset: 1, color: '#818cf8' }
          ])
        },
        label: { show: true, position: 'top', color: 'rgba(255,255,255,0.5)', fontSize: 10 }
      }
    ],
    tooltip: { show: true }
  })
})
</script>

<template>
  <div class="card">
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<style scoped lang="scss">
.card {
  flex: 1.5;
  @include glass($bg: rgba(255, 255, 255, 0.03), $border: 1px solid rgba(255, 255, 255, 0.06), $shadow: none);
  border-radius: 12px;
  padding: 16px;
}
.charts {
  width: 100%;
  height: 100%;
}
</style>
