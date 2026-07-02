<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let chartsRef = ref(null)

onMounted(() => {
  const mycharts = echarts.init(chartsRef.value)
  mycharts.setOption({
    title: {
      text: '预约渠道统计',
      left: 'center',
      top: 8,
      textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 }
    },
    radar: {
      center: ['50%', '55%'],
      radius: '55%',
      axisName: { color: 'rgba(255,255,255,0.45)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      indicator: [
        { name: '官网', max: 6500 },
        { name: 'APP', max: 16000 },
        { name: '小程序', max: 30000 },
        { name: '线下', max: 38000 },
        { name: '第三方', max: 52000 }
      ]
    },
    tooltip: { show: true },
    series: [{
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000],
          name: 'Q1',
          areaStyle: { color: 'rgba(129, 140, 248, 0.2)' },
          lineStyle: { color: '#818cf8' },
          itemStyle: { color: '#818cf8' }
        },
        {
          value: [5000, 14000, 28000, 26000, 42000],
          name: 'Q2',
          areaStyle: { color: 'rgba(34, 211, 238, 0.2)' },
          lineStyle: { color: '#22d3ee' },
          itemStyle: { color: '#22d3ee' }
        }
      ]
    }]
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
  flex: 1;
  @include glass($bg: rgba(255, 255, 255, 0.03), $border: 1px solid rgba(255, 255, 255, 0.06), $shadow: none);
  border-radius: 12px;
  padding: 16px;
}
.charts {
  width: 100%;
  height: 100%;
}
</style>
