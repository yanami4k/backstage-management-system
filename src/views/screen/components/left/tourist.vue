<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let peopleNum = ref('216908')
let chartsRef = ref(null)

onMounted(() => {
  const myCharts = echarts.init(chartsRef.value)
  myCharts.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.55, 0.5],
        radius: '75%',
        center: ['50%', '50%'],
        color: ['#818cf8', '#60a5fa', '#38bdf8'],
        backgroundStyle: { color: 'transparent' },
        outline: { show: false },
        label: {
          color: '#fff',
          fontSize: 20,
          formatter: '{c}%'
        }
      }
    ],
    tooltip: { show: true }
  })
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="dot" style="background:#818cf8;box-shadow:0 0 6px #818cf8"></span>
      <span class="label">实时游客统计</span>
      <span class="sub">可预约总量 <em>999,999</em> 人</span>
    </div>
    <div class="content">
      <div class="people">
        <span v-for="(item, index) in peopleNum" :key="index">{{ item }}</span>
        <span>人</span>
      </div>
      <div class="charts" ref="chartsRef"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  flex: 1.2;
  @include glass($bg: rgba(255, 255, 255, 0.03), $border: 1px solid rgba(255, 255, 255, 0.06), $shadow: none);
  border-radius: 12px;
  padding: 16px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .label {
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    font-weight: 600;
    flex: 1;
  }
  .sub {
    color: rgba(255, 255, 255, 0.45);
    font-size: 12px;
    em {
      color: #f59e0b;
      font-style: normal;
    }
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .people {
    margin: 16px 0 8px;
    span {
      display: inline-block;
      width: 40px;
      height: 36px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      text-align: center;
      line-height: 36px;
      color: #38bdf8;
      font-size: 18px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      margin: 0 2px;
    }
  }
  .charts {
    width: 100%;
    height: 200px;
  }
}
</style>
