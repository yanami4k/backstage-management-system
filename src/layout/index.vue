<template>
    <div class="layout-container">
        <!-- 左侧导航区 -->
        <!-- { fold: LayOutSettingStore.fold ? true : false }: fold是否为真控制该标签是否又"fold"这个类名-->
        <div class="layout-slider" :class="{ fold: LayOutSettingStore.fold }">
            <Logo></Logo>
            <!-- 展示左侧导航区，使用el+的scrollbar组件 -->
            <el-scrollbar class="scollbar">
                <!-- 菜单组件，根据路由动态生成菜单 -->
                <!-- default-active:页面展示时默认激活页面的index -->
                <el-menu  :collapse="LayOutSettingStore.fold" class="menu-root" :default-active="$route.path">
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 两层flex布局，顶部导航,内容展示区域由第二层：layout-right控制 -->
        <div class="layout-right">
            <!-- 顶部导航  -->
            <div class="layout-tabbar">
                <Tabbar></Tabbar>
            </div>
            <!-- 内容展示区域 -->
            <div class="layout-main">
                <Main></Main>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
//引入路由对象
import { useRoute } from 'vue-router';
//引入左侧导航区logo子组件
import Logo from '@/layout/logo/index.vue'
//引入菜单组件
import Menu from '@/layout/menu/index.vue'
//引入用户相关的小仓库
import { useUserStore } from '@/stores/modules/user';
//引入layout配置仓库
import useLayOutSettingStore from '@/stores/modules/setting';

//右侧内容展示区
import Main from './main/index.vue'
//引入顶部导航区
import Tabbar from './tabbar/index.vue';


//获取用户相关的小仓库
let userStore = useUserStore()

//获取layout配置仓库
let LayOutSettingStore = useLayOutSettingStore()


//获取路由对象
let $route = useRoute()

</script>

<script lang="ts">
//一级组件layout命名
export default {
    name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout-container {
    display: flex;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a0f1f 0%, #0d1528 50%, #101a35 100%);
}

.layout-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.layout-slider {
    display: flex;
    flex-direction: column;
    width: $base-menu-width;
    height: 100%;
    @include glass($bg: rgba(37, 44, 58, 0.22));
    transition: all 0.3s;

    .scollbar {
        flex: 1;
        width: $base-menu-width;
    }

    &.fold {
        width: $base-menu-folded-width;

    }

}

.scollbar {
    flex: 1;
    width: $base-menu-width;
}

//隐藏el-scrollbar__bar滚动条
:deep(.el-scrollbar__bar) {
    display: none;
}


.layout-tabbar {
    height: $base-tabbar-height;
    @include glass($bg: rgba(37, 44, 58, 0.22));
    color: azure;
}

.layout-main {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    @include glass($bg: rgba(37, 44, 58, 0.22), $blur: 1px);
}


//根菜单背景、边框、整体菜单皮肤
:deep(.menu-root) {
    --el-menu-bg-color: transparent;
    --el-menu-text-color: azure;
    --el-menu-hover-text-color: azure;
    --el-menu-active-color: azure;
    --el-menu-hover-bg-color: #0b041b;

    background-color: transparent !important;
    border-right: none !important;
}

:deep(.menu-root .el-menu) {
    background-color: transparent !important;
}

:deep(.menu-root .el-menu-item),
:deep(.menu-root .el-sub-menu__title) {
    color: azure !important;
    background-color: transparent !important;
}

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
