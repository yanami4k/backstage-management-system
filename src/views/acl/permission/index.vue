<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/permission'
import type { MenuData, MenuParams } from '@/api/acl/permission/type'
import { ElMessage } from 'element-plus'

let tableData = ref<MenuData[]>([])

const getPermission = async () => {
  let result: any = await reqAllPermission()
  if (result.code == 200) {
    tableData.value = result.data
  }
}

onMounted(() => {
  getPermission()
})

let dialogVisible = ref(false)
let menuParams = ref<MenuParams>({ level: '', name: '', pid: '', code: '' })

const addPermission = (row: MenuData) => {
  dialogVisible.value = true
  menuParams.value.level = (row.level as number) + 1
  menuParams.value.pid = row.id as number
}

const editPermission = (row: MenuData) => {
  dialogVisible.value = true
  Object.assign(menuParams.value, row)
}

const closeDialog = () => {
  Object.assign(menuParams.value, { level: '', name: '', pid: '', code: '', id: '' })
}

const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuParams.value)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: menuParams.value.id ? '修改成功' : '添加成功' })
    getPermission()
  } else {
    ElMessage({ type: 'error', message: '操作失败' })
  }
  dialogVisible.value = false
}

const delMenu = async (row: MenuData) => {
  let result: any = await reqRemoveMenu(row.id as number)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getPermission()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
</script>

<template>
  <div>
    <el-card>
      <el-table :data="tableData" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作" width="320" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" :disabled="row.level === 4" @click="addPermission(row)">
              {{ row.level === 3 ? '添加功能' : '添加菜单' }}
            </el-button>
            <el-button size="small" type="warning" :disabled="row.level === 1" @click="editPermission(row)">编辑</el-button>
            <el-popconfirm width="200px" :title="`确定删除${row.name}吗?`" @confirm="delMenu(row)">
              <template #reference>
                <el-button size="small" type="danger" :disabled="row.level === 1">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加/修改菜单对话框 -->
    <el-dialog v-model="dialogVisible" :title="menuParams.id ? '修改菜单' : '添加菜单'" width="30%" @closed="closeDialog">
      <el-form label-width="80px" style="padding-right: 60px">
        <el-form-item label="名称">
          <el-input placeholder="请输入名称" v-model="menuParams.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请输入权限值" v-model="menuParams.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
