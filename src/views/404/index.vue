<template>
  <div class="box">
    <el-button type="primary" size="default" @click="$router.push({ path: '/home' })">返回首页</el-button>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

let $router = useRouter()
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/error_images/404.png') no-repeat;
  background-position: center;
}
</style>
