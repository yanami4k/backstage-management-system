<template>
        <div class="logo">
            <img :src="setting.logo" v-if="setting.logoIsHidden">
            <p>{{setting.title}}</p>
        </div>
</template>
    
<script setup lang='ts'>
//引入logo与标题的配置文件
import setting from '@/setting'
</script>
    
<style lang="scss">
    .logo{
        display: flex;
        height: $base-logo-height;
        color: azure;
        align-items: center;
        padding: 20px;
        margin-top: 10px;
        border-bottom: #ffffff2e 2px solid ;
        img{
            width: 60px;
            height: 60px;
        }
        p{
            font-size: $base-logo-title-fontSize;
            margin-left: 10px;
        }
    }
</style>