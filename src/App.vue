<template>
  <div class="svg-demo">
    <span>SVG Demo</span>
    <svg-icon name="penguin" height="2000px" width="2000px"></svg-icon>
    <button @click="send">点我发送</button>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { reqLogin } from '@/api/user/index'
const send = async () => {
  let response = await reqLogin({ username: 'sad', password: '000000' })
  console.log(response)
}
</script>

<style scoped lang="scss">
.svg-demo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: $color;
}
</style>
