<template>
    <div class="layout-container">
        <!-- 左侧导航区 -->
        <div class="layout-slider">
            <Logo></Logo>
            <!-- 展示左侧导航区，使用el+的scrollbar组件 -->
            <el-scrollbar class="scollbar">
                <!-- 菜单组件，根据路由动态生成菜单 -->
                <el-menu class="menu-root">
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 两层flex布局，顶部导航,内容展示区域由第二层：layout-right控制 -->
        <div class="layout-right">
            <!-- 顶部导航  -->
            <div class="layout-tabbar"></div>
            <!-- 内容展示区域 -->
            <div class="layout-main">
                <Main></Main>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
//引入左侧导航区logo子组件
import Logo from '@/layout/logo/index.vue'
//引入菜单组件
import Menu from '@/layout/menu/index.vue'
//获取用户相关的小仓库
import { useUserStore } from '@/stores/modules/user';
//右侧内容展示区
import Main from './main/index.vue'

let userStore = useUserStore()

</script>

<style scoped lang="scss">
.layout-container {
    display: flex;
    width: 100%;
    height: 100vh;
    background-image: url(@/assets/images/layout_backgound.jpeg);
    background-size: cover;
}

.layout-right {
    flex: 1; //吃掉侧边栏剩余宽度
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.layout-slider {
    display: flex;
    flex-direction: column;
    width: $base-menu-width;
    height: 100vh;
    @include glass($bg: rgba(37, 44, 58, 0.22));
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
}

.layout-main {
    flex: 1; // 吃掉顶部导航剩余高度
    padding: 20px;
    overflow: auto; // 添加滚动条
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
