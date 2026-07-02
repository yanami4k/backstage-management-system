<template>
  <div>
    <el-card class="glass-card">
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }}，{{ userStore.username }}</h3>
          <p class="subtitle">易后台企业运营管理系统</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <SvgIcon name="welcome" width="600px" height="300px" style="opacity: 0.6"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getTime } from '@/utils/getTime';
import { useUserStore } from '@/stores/modules/user';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

let userStore = useUserStore()
</script>

<style scoped lang="scss">
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 18px 22px;
  margin: 20px;

  .box {
    display: flex;

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .bottom {
      margin-left: 20px;

      .title {
        font-size: 30px;
        font-weight: 900;
        margin-bottom: 30px;
        color: #f0ffff;
      }

      .subtitle {
        font-style: italic;
        color: skyblue;
      }
    }
  }
}

.bottoms {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
