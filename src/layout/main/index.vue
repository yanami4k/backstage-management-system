<template>
    <!-- 路由组件出口的位置,封装vue-router过渡动画 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang='ts'>
import useLayOutSettingStore from '@/stores/modules/setting';
import { watch, ref, nextTick } from 'vue'

// 控制当前组件是否销毁重建
let flag = ref(true)

let LayOutSettingStore = useLayOutSettingStore()
//监听仓库内refsh的变化，如果变化，执行组件的销毁与重新挂载

watch(() => LayOutSettingStore.refsh, () => {
    flag.value = false
    nextTick(() => {
        flag.value = true
    })
})

</script>

<script lang='ts'>
export default {
    name: 'Main'
} 
</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    transition: all 1s;
}
</style>