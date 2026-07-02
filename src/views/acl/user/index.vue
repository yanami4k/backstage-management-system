<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetRole, reqDelUser, reqDelSelectUser } from '@/api/acl/user'
import type { Records, User, AllRole, SetRoleData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'

let pageOn = ref<number>(1)
let limit = ref<number>(5)
let total = ref<number>(0)
let userInfoArr = ref<Records>([])

const getUserInfo = async () => {
  let result: any = await reqUserInfo(pageOn.value, limit.value, keyWord.value)
  if (result.code == 200) {
    userInfoArr.value = result.data.records
    total.value = result.data.total
  }
}

const handleCurrentChange = () => {
  getUserInfo()
}

const handleSizeChange = () => {
  pageOn.value = 1
  getUserInfo()
}

let keyWord = ref('')

const searchUser = () => {
  getUserInfo()
  keyWord.value = ''
}

const reset = () => {
  getUserInfo()
}

onMounted(() => {
  getUserInfo()
})

// 添加与修改
let userParams = ref<User>({
  username: '',
  password: '',
  name: ''
})
let drawer = ref(false)
let formRef = ref()

const addUser = () => {
  drawer.value = true
}

const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams.value)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: userParams.value.id ? '更新成功' : '添加成功' })
    drawer.value = false
    pageOn.value = userParams.value.id ? pageOn.value : 1
    getUserInfo()
  } else {
    ElMessage({ type: 'error', message: '操作失败' })
    drawer.value = false
  }
}

const cancel = () => {
  drawer.value = false
}

const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams.value, row)
}

const rules: FormRules = {
  username: [
    { required: true, trigger: 'blur', validator: (_rule: any, value: any, callback: any) => { if (!value) callback(new Error('用户名不能为空')); else if (value.length < 5) callback(new Error('长度至少为5位')); else callback() } }
  ],
  name: [
    { required: true, trigger: 'blur', validator: (_rule: any, value: any, callback: any) => { if (!value) callback(new Error('昵称不能为空')); else if (value.length < 5) callback(new Error('长度至少为5位')); else callback() } }
  ],
  password: [
    { required: true, trigger: 'blur', validator: (_rule: any, value: any, callback: any) => { if (!value) callback(new Error('密码不能为空')); else if (value.length < 6) callback(new Error('长度至少为6位')); else callback() } }
  ]
}

const closeDrawer = () => {
  formRef.value.resetFields()
  Object.assign(userParams.value, { id: '', username: '', password: '', name: '' })
}

// 分配角色
let drawer1 = ref(false)
let checkAll = ref(false)
let isIndeterminate = ref(false)
let checkedCities = ref<AllRole>([])
let allRole = ref<AllRole>([])

const getAllRole = async (userId: number) => {
  let result: any = await reqAllRole(userId)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    checkedCities.value = result.data.assignRoles
  }
}

const setRole = (row: User) => {
  drawer1.value = true
  Object.assign(userParams.value, row)
  getAllRole(row.id as number)
}

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? allRole.value : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

const saveRole = async () => {
  const params: SetRoleData = {
    userId: userParams.value.id as number,
    roleIdList: checkedCities.value.map(item => item.id)
  }
  let result: any = await reqSetRole(params)
  if (result.code == 200) {
    getUserInfo()
    ElMessage({ type: 'success', message: '分配成功' })
  } else {
    ElMessage({ type: 'error', message: '分配失败' })
  }
  drawer1.value = false
}

const closeRole = () => {
  drawer1.value = false
}

const closeDrawerRole = () => {
  Object.assign(userParams.value, { id: '', username: '', password: '', name: '' })
}

// 删除
const delUser = async (row: User) => {
  let result: any = await reqDelUser(row.id as number)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    pageOn.value = userInfoArr.value.length > 1 ? pageOn.value : pageOn.value--
    getUserInfo()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}

let idList = ref<number[]>([])

const selectChange = (rowList: Records) => {
  idList.value = rowList.map(item => item.id as number)
}

const selectAllChange = (rowList: Records) => {
  idList.value = rowList.map(item => item.id as number)
}

const delSelectUser = async () => {
  let result: any = await reqDelSelectUser(idList.value)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getUserInfo()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
</script>

<template>
  <div>
    <el-card>
      <el-form inline class="search-form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyWord" @click="searchUser">搜索</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-popconfirm title="确定删除吗?" width="240px" @confirm="delSelectUser">
        <template #reference>
          <el-button type="danger" :disabled="!idList.length">批量删除</el-button>
        </template>
      </el-popconfirm>
      <el-table border style="margin-top: 20px" :data="userInfoArr" @select="selectChange" @select-all="selectAllChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" width="50px" align="center" type="index"></el-table-column>
        <el-table-column label="ID" width="80px" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="昵称" prop="name"></el-table-column>
        <el-table-column label="用户角色" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" width="200px" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" width="200px" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="320" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="warning" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.username}吗?`" width="240px" @confirm="delUser(row)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageOn" v-model:page-size="limit" :page-sizes="[5, 7, 9, 10]"
        :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 20px" />
    </el-card>
    <!-- 添加/修改用户抽屉 -->
    <el-drawer v-model="drawer" :title="userParams.id ? '修改用户' : '添加用户'" @closed="closeDrawer" append-to-body>
      <el-form label-width="80px" :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model.trim="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input placeholder="请输入用户昵称" v-model.trim="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!userParams.id">
          <el-input placeholder="请输入密码" type="password" v-model.trim="userParams.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-drawer>
    <!-- 分配角色抽屉 -->
    <el-drawer v-model="drawer1" title="分配用户角色" @closed="closeDrawerRole" append-to-body>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="userParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in allRole" :key="item.id" :label="item">{{ item.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="saveRole">确定</el-button>
        <el-button @click="closeRole">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.search-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
