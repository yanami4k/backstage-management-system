<template>
    <div class="logo">
        <img :src="setting.logo" v-if="setting.logoIsHidden">
        <!-- 给title加上淡入延迟，菜单展开时文字不会乱跑 -->
        <transition name="title-fade">
            <p v-show="!LayOutSettingStore.fold">{{ setting.title }}</p>
        </transition>
    </div>
</template>

<script setup lang='ts'>
// 引入logo与标题的配置文件
import setting from '@/setting'
// 引入layout仓库fold属性
import useLayOutSettingStore from '@/stores/modules/setting';

let LayOutSettingStore = useLayOutSettingStore()

</script>

<script lang='ts'>
export default {
    name: 'Logo'
}
</script>

<style lang="scss">
.logo {
    display: flex;
    height: $base-logo-height;
    color: azure;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    border-bottom: #ffffff2e 2px solid;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
}

// title淡入延迟
.title-fade-enter-active {
    transition: opacity 0.3s ease 0.2s;
}

.title-fade-leave-active {
    transition: opacity 0.05s ease;
}

.title-fade-enter-from,
.title-fade-leave-to {
    opacity: 0;
}
</style>