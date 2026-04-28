<template>
    <el-button icon="Refresh" size="small" circle :dark="true" color="#0b041b" @click="updateRefsh" />
    <el-button icon="FullScreen" size="small" circle :dark="true" color="#0b041b" @click="fullscreen" />
    <el-button icon="Setting" size="small" circle :dark="true" color="#0b041b" />
    <img :src="userStore.avatar" style="width: 20px;height: 20px;margin: 10px;border-radius: 50%;" >
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>
import useLayOutSettingStore from '@/stores/modules/setting';
//获取用户相关的小仓库，以展示用户信息
import { useUserStore } from '@/stores/modules/user';
// 引入路由器
import { useRouter,useRoute } from 'vue-router';

let userStore = useUserStore()

let LayOutSettingStore = useLayOutSettingStore()

let $router = useRouter()

let $route = useRoute()

//刷新页面回调
const updateRefsh = () => {
    LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}

//全屏回调
const fullscreen = () => {
    let full = document.fullscreenElement
    if (!full) {
        //文档根节点的方法requestFullscreen()实现全屏
        document.documentElement.requestFullscreen()
    } else {
        //退出全屏模式
        document.exitFullscreen()
    }
}
//退出登录回调
const logout = async() => {
    //清空数据（username、avatar、token（仓库＋浏览器））
    await userStore.userLogout()
    //跳转到登录页面,给login组件携带一个query参数:当前页面的路径，用于下次登录时重定向到这个页面
    $router.push({path:'/login',query:{redirect:$route.path}})
}

</script>

<script lang="ts">
export default {
    name: 'Setting'
}
</script>

<style scoped lang="scss"></style>