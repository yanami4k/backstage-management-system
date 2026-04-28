<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button size="default" type="primary" icon="plus" @click="addTrademark">
        添加品牌
      </el-button>
      <!-- 表格组件：用于展示已有的品牌数据 -->
      <el-table style="margin:10px 0px" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #default="{ row, $index }">
            <img :src="row.logoUrl" alt="加载出错啦" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #default="{ row, $index }">
            <el-button size="small" type="primary" icon="edit" @click="updateTrademark(row)"></el-button>
            <!-- 通过具名插槽，给组件注入删除按钮，点击删除按钮时弹出气泡确认框 -->
            <!-- 按钮回调-组件api -->
            <el-popconfirm :title="`确认删除${row.tmName}?`" width="250px" icon="Delete" @confirm="removeTradeMark(row)">
              <template #reference>
                <el-button size="small" type="danger" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <!-- page-sizes:设置下拉菜单数据 -->
      <!-- :background :设置分页器按钮背景颜色 -->
      <!-- layout：设置分页器六个子组件布局调整 -->
      <!-- current-change:组件自定义事件，页码变化时触发,v-model双向数据绑定，这个事件触发时会回传当前页码 -->
      <!-- @size-change:组件自定义事件，下拉菜单变化时触发 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout="total, sizes, prev, pager,->, next, jumper" :total="total"
        @current-change="changePageNo" @size-change="sizeChange" />
    </el-card>

    <!-- 对话框组件，用于改查操作 -->
    <!-- v-model属性控制对话框的显示与隐藏 -->
    <!-- title设置对话框左上角标题 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <!-- el-upload属性 action:上传图片的请求url，注意是组件内部发XMLHttpRequest未通过request接口，需带上api字段 -->
        <!-- show-file-list：展示上传文件的文件名 -->
        <!-- :before-upload：组件上传文件成功前触发的钩子，注入参数rawFile：当前上传的文件 ，该函数返回false或者rejected promise，文件被阻止上传：可进行校验-->
        <!-- :on-success：组件上传文件成功时触发的钩子，注入参数：response,uploadFile ，response：本次上传请求的服务器返回数据 uploadFile服务器返回数据&图片信息-->
        <!--  :headers 传入 token:组件内部发 XMLHttpRequest，不走 request.ts 的 axios 拦截器，需要带上token才能通过后端监测 -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="{ Token: userStore.token }">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽footer,用于放置取消&确认F按钮 -->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type';
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

// 定义响应式数据：当前页码
let pageNo = ref<number>(1)

// 定义响应式数据：每一页展示数据的条数
let limit = ref<number>(3)

// 存储已有品牌的数据项统计总数
let total = ref<number>(0)

// 存储当前页面已有品牌的数据列表
let trademarkArr = ref<Records>([])

// 控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)

// 定义表单收集的新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})

// 获取表单组件实例（用于校验）
let formRef = ref()


// 分页器页码变化时触发的回调函数
const changePageNo = (pager: number) => {
  // 当前页码变化时,再次发送请求，获取对应已有品牌数据展示,为回调注入当前页码
  getHasTrademark(pager)
}

// 下拉菜单变化时触发的回调函数
// 这个自定义事件，分页器组件会将下拉菜单选中的数据进行返回
// 调用一次发送请求即可，因为v-model自动将数据传给limit，这里用不到参数
const sizeChange = () => {
  // 改了每页条数后回到第1页，防止页面错误
  getHasTrademark(1)
}


// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据，调用函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code == 200) {
    // 响应式存储已有品牌的数据统计总数
    total.value = result.data.total
    // 响应式存储已有品牌的数据
    trademarkArr.value = result.data.records
  }
}

// 组件挂载时发送请求获取当前品牌数据
onMounted(() => {
  getHasTrademark()
})

//添加品牌按钮的回调
const addTrademark = () => {
  //清空表单校验提示信息（注意表单实例已渲染，才会清除,也可用nextick）
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')

  //清空表单数据,注意如果用户从修改品牌->添加品牌，trademarkParams与子组件数据合并包括id，所以此处也要清空id
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = 0
  //对话框显示
  dialogFormVisible.value = true
}

//修改已有品牌按钮的回调
//row:作用域插槽注入参数，当前已有的品牌数据
const updateTrademark = (row: TradeMark) => {
  //清空表单校验提示信息
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  // 对话框显示
  dialogFormVisible.value = true
  // 修改品牌时，注意此时的品牌已有id,此后发送请求时必需携带
  // trademarkParams.id = row.id
  // 展示已有品牌数据
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  // ES6合并对象语法：
  Object.assign(trademarkParams, row)
}

//对话框底部取消按钮回调
const cancel = () => {
  //隐藏对话框
  dialogFormVisible.value = false
}

//对话框底部确认按钮回调
const confirm = async () => {
  //发请求之前，对表单内容进行校验,校验通过才能进行下面的语句
  await formRef.value.validate()

  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    //添加|修改品牌成功
    //隐藏对话框
    dialogFormVisible.value = false
    //添加|修改提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    })
    //再次发请求获取已有全部品牌的数据：修改后留在当前页，添加后返回第一页
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    //添加|修改品牌失败
    dialogFormVisible.value = false
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    })
  }
}

// 图片上传前触发的钩子before-upload，注入参数：当前上传的文件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 约束品牌LOGO图片文件类型：格式png|jpg|gif 大小小于4M
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传文件大小应小于4M')
      return false
    }
  } else {
    ElMessage.error('上传文件格式为png|jpg|gif')
    return false
  }
}

// 组件上传文件成功时触发的钩子，注入参数：response,uploadFile
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  //收集上传图片的地址，添加一个新的品牌带给服务器
  trademarkParams.logoUrl = response.data
  // 清除校验提示信息
  formRef.value.clearValidate('logoUrl')
}

// 品牌自定义校验规则方法

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    // 品牌名大于2字符
    callBack()
  } else {
    callBack(new Error('品牌名称长度需大于两个字符'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //如果图片上传，放行
  if (value) {
    callBack()
  } else {
    callBack(new Error('未上传图片'))
  }
}

// 定义表单校验规则对象
const rules = {
  tmName: [
    //'blur':表单失去焦点时进行校验
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }]
}

// 删除按钮-气泡确认框按钮的回调
const removeTradeMark = async (row:TradeMark) => {
  //删除已有品牌(非空断言)
  let result = await reqDeleteTrademark(row.id!)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    })
    // 获取当前品牌数据，重新渲染
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
