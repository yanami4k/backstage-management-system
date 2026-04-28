<template>
    <button @click="changeIcon">
        <el-icon style="margin-right: 10px;">
            <!-- 图标展开/折叠的状态变化而切换 -->
            <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
        </el-icon>
    </button>
    <!-- 左侧面包屑导航 -->
    <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path">
            <template v-if="!item.meta.hidden">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span style="margin: 0px 3px;">{{ item.meta.title }}</span>
            </template>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '@/stores/modules/setting';

let LayOutSettingStore = useLayOutSettingStore()
let $route = useRoute()

const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<script lang="ts">
export default {
    name: 'Breadcrumb'
}
</script>

<style scoped lang="scss">
.breadcrumb {
    :deep(.el-breadcrumb__inner) {
        color: rgba(240, 255, 255, 0.757) !important;
    }
}
</style>