<template>
    <!-- 根据路由表动态生成菜单 -->
    <template v-for="(item) in menuList" :key="item.path">

        <template v-if="!item.children?.length">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <!-- 没有子路由的一级路由 -->
                <template #title>
                    <!-- component标签，加载路由元信息中对应的图标 -->
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <template v-else-if="item.children.length === 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
                <!-- 有且只有一个子路由的一级路由 -->
                <template #title>
                    <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <el-sub-menu v-else-if="!item.meta.hidden" :index="item.path">
            <!-- 有子路由且个数大于一（使用sub-menu  & 递归组件） -->
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
// 引入路由器为菜单点击事件回调进行编程式路由导航
import { useRouter } from 'vue-router';
// 获取父组件传递来的全部路由数组
defineProps(['menuList'])

let $router = useRouter()

// 点击菜单的回调
const goRoute = (vc:{ index: string }) => {
    // 路由跳转
    $router.push(vc.index)
}
</script>

<script lang='ts'>
//递归组件必须有名字，递归组件的命名
export default {
    name: 'Menu'
}
</script>

<style scoped lang="scss">
:deep(.menu-root),
:deep(.menu-root .el-menu-item:hover),
:deep(.menu-root .el-sub-menu__title:hover) {
    background-color: #0b041b !important;
}

:deep(.menu-root .el-menu-item.is-active),
:deep(.menu-root .el-sub-menu.is-active > .el-sub-menu__title) {
    color: azure !important;
    background-color: #0b041b !important;
}
</style>