<template>
    <!-- 路由组件出口的位置,封装vue-router过渡动画 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang='ts'>

</script>

<style scoped>

.fade-enter-from{
    opacity: 0;
}

.fade-enter-to{
    transition: all 1s;
}

</style>