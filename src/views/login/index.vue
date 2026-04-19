<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24" class="login-panel">
        <el-card class="login-form-card">
          <el-form :model="loginForm" :rules="rules" ref="loginForms">
            <h1>Hello</h1>
            <h2>易后台-企业运营管理系统</h2>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" class="login-btn" color="#ac8dbf" size="default"
                @click="login_callback">Login</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <Vue3Lottie class="lottie-box" :animationData="lottie1" :loop="true" :speed=0.75 :autoPlay="true" height="200px"
      width="200px" />
  </div>
</template>

<script setup lang="ts">
//引入el-icon组件
import { User, Lock } from '@element-plus/icons-vue';
import lottie1 from '@/assets/Lottie/operation.json'
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/getTime';

// 引入 Element Plus 的表单类型，进行类型声明
import type { FormItemRule, FormRules } from 'element-plus'
// 自定义校验器自己的回调类型
type ValidatorCallback = (error?: Error) => void

// 获取路由器
let $router = useRouter()

// 定义变量控制按钮加载效果
let loading = ref(false)

// 定义变量：表单数据
let loginForm = reactive({ username: '', password: '' })
let userStore = useUserStore()

// 获取el-form组件实例
let loginForms = ref()

// 自定义校验规则函数
const validatorUserName = ( _rule:FormItemRule,value:string,callback:ValidatorCallback) => {
  if(value.length>=5){
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}

const validatorPassword = ( _rule:FormItemRule,value:string,callback:ValidatorCallback) => {
  if(value.length>=6){
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

// 定义表单校验规则配置对象
const rules:FormRules = {
  username: [
    // 自定义校验规则
    { validator: validatorUserName, trigger: 'change' }
  ],
  password: [
    { validator: validatorPassword, trigger: 'change' }
  ]
}


const login_callback = async () => {
  // 表单验证成功后才能发送请求
  await loginForms.value.validate()
  // 按钮加载效果开始
  loading.value = true

  try {
    // promise成功继续执行try内部
    await userStore.userLogin(loginForm)
    // 加载效果关闭
    loading.value = false
    // 编程式导航，跳转首页
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}`
    })
  } catch (error) {
    // 加载效果关闭
    loading.value = false
    ElNotification({
      type: 'error',
      // 类型断言
      message: (error as Error).message
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh; // vh:视口高度
  background-image: url('@/assets/images/login.png');
  background-repeat: no-repeat;
  background-size: cover; // 背景大小：覆盖
}

.lottie-box {
  position: absolute;
  top: 10%;
  left: 80%;
}

//以右边的el-col作为父容器，进行flex布局
.login-panel {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form-card {
  //调整登录面板位置
  transform: translate(3%, 5%);
  width: 80%;
  @include glass($bg: rgba(255, 255, 255, 0.2),$border:1px solid rgba(148, 163, 184, 0.16),);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 18px 22px;
}


h1 {
  color: #f0ffff;
  font-size: 40px;
}

h2 {
  color: #f0ffff;
  font-size: 20px;
  margin: 10px 0px;
}

.login_btn {
  width: 100%;
  color: #f0ffff;
}

// :deep穿透el输入框组件样式：与页面风格统一
:deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: none;
}

// 输入文字样式调整
:deep(.el-input__inner) {
  color: #f0ffff;
}

:deep(.el-input__inner::placeholder) {
  color: #f0ffff;
}
</style>
