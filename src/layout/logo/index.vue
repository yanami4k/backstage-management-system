<template>
    <div class="logo">
        <SvgIcon name="vue" width="36px" height="36px" v-if="setting.logoIsHidden"/>
        <transition name="title-fade">
            <p v-show="!LayOutSettingStore.fold">{{ setting.title }}</p>
        </transition>
    </div>
</template>

<script setup lang='ts'>
import setting from '@/setting'
import useLayOutSettingStore from '@/stores/modules/setting';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

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