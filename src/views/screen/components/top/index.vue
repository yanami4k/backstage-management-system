<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

let $router = useRouter()

let time = ref('')
let timer: any = null

onMounted(() => {
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  timer = setInterval(() => {
    time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="top">
    <div class="left">
      <span class="home-btn" @click="$router.push({ path: '/home' })">← 返回首页</span>
    </div>
    <div class="center">
      <h1 class="title">智慧旅游可视化大数据平台</h1>
      <div class="divider">
        <span></span><i></i><span></span>
      </div>
    </div>
    <div class="right">
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  margin-bottom: 10px;
  .left {
    .home-btn {
      color: rgba(255, 255, 255, 0.65);
      font-size: 14px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #00d4ff;
      }
    }
  }
  .center {
    text-align: center;
    .title {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(90deg, #00d4ff, #7c3aed, #00d4ff);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 3s linear infinite;
      margin: 0;
      letter-spacing: 4px;
    }
    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 6px;
      span {
        width: 80px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent);
      }
      i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #00d4ff;
        box-shadow: 0 0 8px #00d4ff;
      }
    }
  }
  .right {
    .time {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      font-variant-numeric: tabular-nums;
    }
  }
}

@keyframes shine {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
</style>
