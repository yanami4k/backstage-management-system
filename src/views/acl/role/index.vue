<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { reqAllRole, reqAddOrUpdate, reqRolePermission, reqSetPermission, reqRemovePermission } from '@/api/acl/role'
import type { AllRole, RoleData, MenuData } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'

let pageOn = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(0)
let keyWord = ref('')
let roleArr = ref<AllRole>([])

const getRole = async () => {
  let result: any = await reqAllRole(pageOn.value, limit.value, keyWord.value)
  if (result.code == 200) {
    roleArr.value = result.data.records
    total.value = result.data.total
  }
}

const handleSizeChange = () => {
  pageOn.value = 1
  getRole()
}

const handleCurrentChange = () => {
  getRole()
}

const searchRole = () => {
  getRole()
  keyWord.value = ''
}

const reset = () => {
  getRole()
}

onMounted(() => {
  getRole()
})

// 添加与修改
let roleParams = ref<RoleData>({ id: '', roleName: '' })
let dialogVisible = ref(false)
let formRef = ref()

const addRole = () => {
  dialogVisible.value = true
}

const cancel = () => {
  dialogVisible.value = false
}

const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdate(roleParams.value)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: roleParams.value.id ? '修改成功' : '添加成功' })
    pageOn.value = roleParams.value.id ? pageOn.value : 1
    getRole()
  } else {
    ElMessage({ type: 'error', message: '操作失败' })
  }
  dialogVisible.value = false
}

const editRole = (row: RoleData) => {
  dialogVisible.value = true
  Object.assign(roleParams.value, row)
}

const rules: FormRules = {
  roleName: [
    { required: true, trigger: 'blur', message: '职位名称不能为空' },
    { min: 2, message: '职位名称至少为2位', trigger: 'blur' }
  ]
}

const closeDialog = () => {
  formRef.value.resetFields()
  Object.assign(roleParams.value, { roleName: '', id: '' })
}

// 分配权限
let drawer = ref(false)
let menuArr = ref<MenuData[]>([])
let selectArr = ref<number[]>([])
let tree = ref()

const setPermission = async (row: RoleData) => {
  drawer.value = true
  let result: any = await reqRolePermission(row.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
    roleParams.value.id = row.id
  }
}

const defaultProps = {
  children: 'children',
  label: 'name'
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

const savePermission = async () => {
  const roleId = roleParams.value.id as number
  const idArr = tree.value.getCheckedKeys()
  const idArr1 = tree.value.getHalfCheckedKeys()
  const permissionId = [...idArr1, ...idArr]
  let result: any = await reqSetPermission(roleId, permissionId)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '修改成功' })
  } else {
    ElMessage({ type: 'error', message: '修改失败' })
  }
  drawer.value = false
}

const closeDrawer = () => {
  selectArr.value = []
  roleParams.value.id = ''
}

// 删除
const delRole = async (row: RoleData) => {
  let result: any = await reqRemovePermission(row.id as number)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    pageOn.value = roleArr.value.length > 1 ? pageOn.value : pageOn.value--
    getRole()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
</script>

<template>
  <div>
    <el-card>
      <el-form inline style="display: flex; justify-content: space-between">
        <el-form-item label="搜索职位：">
          <el-input placeholder="请输入职位" v-model.trim="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyWord" @click="searchRole">搜索</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table border style="margin-top: 20px" :data="roleArr">
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="ID" align="center" width="80px" prop="id"></el-table-column>
        <el-table-column label="职位名称" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center" width="340">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User" @click="setPermission(row)">分配权限</el-button>
            <el-button type="warning" size="small" icon="Edit" @click="editRole(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.roleName}吗?`" width="240px" @confirm="delRole(row)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加/修改对话框 -->
      <el-dialog v-model="dialogVisible" :title="roleParams.id ? '更新职位' : '添加职位'" width="30%" @closed="closeDialog">
        <el-form :model="roleParams" :rules="rules" ref="formRef">
          <el-form-item label="职位名称" prop="roleName">
            <el-input placeholder="请输入职位名称" v-model.trim="roleParams.roleName"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </template>
      </el-dialog>
      <!-- 分配权限抽屉 -->
      <el-drawer v-model="drawer" title="分配权限" @closed="closeDrawer" append-to-body>
        <el-tree ref="tree" :data="menuArr" :props="defaultProps" show-checkbox
          :default-checked-keys="selectArr" default-expand-all node-key="id" style="margin-top: 20px" />
        <template #footer>
          <el-button type="primary" @click="savePermission">确定</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </template>
      </el-drawer>
      <el-pagination v-model:current-page="pageOn" v-model:page-size="limit" :page-sizes="[5, 7, 9, 10]"
        :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 20px" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
</style>
