<template>
  <div>
    <!-- 三选下拉菜单 -->
    <el-card>
      <el-form inline="true">
        <el-form-item label="一级分类">
          <el-select :disabled="scene !== 0" style="width: 150px" v-model="c1Id">
            <!-- option:label：选项显示的文字，value:select下拉菜单收集的数据 -->
            <el-option v-for="(c1, index) in c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select style="width: 150px" v-model="c2Id" :disabled="!c1Id && scene !== 0">
            <el-option v-for="(c2, index) in c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select style="width: 150px" v-model="c3Id" :disabled="!c2Id && scene !== 0">
            <el-option v-for="(c3, index) in c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 商品属性数据展示 -->
    <el-card style="margin: 10px 0;">
      <div v-show="scene == 0">
        <el-button @click="addAttr" type="primary" size="default" icon="plus" :disabled="!c3Id">添加属性</el-button>
        <el-table border style="margin:10px 0" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="{ row, $index }">
              <!-- row:已有的属性对象 -->
              <el-tag type="primary" v-for="(item, index) in row.attrValueList" :key="item.id" style="margin: 5px;">{{
                item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #default="{ row, $index }">
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确认删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 场景切换，点击编辑属性按钮后切换到下面的编辑页面 -->
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addAttrValue" type="primary" size="default" icon="plus"
          :disabled="!attrParams.attrName">添加属性值</el-button>
        <el-table border style="margin:10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input placeholder="请输入属性值名称" v-model="row.valueName" v-if="row.flag" @blur="observe(row, $index)"
                :ref="(vc: any) => inputArr[$index] = vc"></el-input>
              <div v-else @click="edit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ row, $index }">
              <el-button type="danger" size="small" icon="delete"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="save(attrParams)" type="primary" size="default"
          :disabled="!attrParams.attrName || !attrParams.attrValueList.length">保存</el-button>
        <el-button @click="cancel" size="default">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
// 引入分类数据获取接口方法
import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from '@/api/product/category'
import { onMounted, ref, watch, reactive, nextTick } from 'vue';

// 引入属性相关数据ts类型
import type { Attr, AttrValue } from '@/api/product/attr/type';
import type { CategoryResponseData } from '@/api/product/category/type';

// 引入获取当前属性与属性值数据方法
import { reqGetAttrlist, reqUpdateAttr, reqDeleteAttr } from '@/api/product/attr';
import { ElMessage } from 'element-plus';

// 存储一级分类的数据
let c1Arr = ref<any>([])
// Element Plus 的 el-select 初始无选中时，内部就是空字符串，类型一致
let c1Id = ref<string | number>('')

// 存储二级分类的数据
let c2Arr = ref<any>([])
let c2Id = ref<string | number>('')

// 存储三级分类的数据
let c3Arr = ref<any>([])
let c3Id = ref<string | number>('')

// 存储属性数据
let attrArr = ref<Attr[]>([])

// 控制card组件切换,0显示table，1显示编辑页面
let scene = ref<number>(0)

// 收集新增的属性数据
let attrParams = reactive<Attr>({
  attrName: '',       // 新增属性名
  attrValueList: [],   // 新增属性值数组,内部为attrValue[]
  categoryId: '',     // 当前三级分类id
  categoryLevel: 3,   // 表示分类等级,为3
})

// 定义一个响应式数组，用于存储el-input组件实例，调用focus方法实现表单编辑项自动聚焦业务
let inputArr = ref<any>([])

onMounted(() => {
  // 组件挂载时获取一级分类数据
  getC1()
})

// 获取一级分类的数据的异步方法
const getC1 = async () => {
  let result: CategoryResponseData = await reqGetCategory1()
  if (result.code == 200) {
    c1Arr.value = result.data
  }
}

// 获取二级分类的数据的异步方法
const getC2 = async () => {
  let result: CategoryResponseData = await reqGetCategory2(c1Id.value as number)
  if (result.code == 200) {
    c2Arr.value = result.data
  }
}

// 获取三级分类的数据的异步方法
const getC3 = async () => {
  let result: CategoryResponseData = await reqGetCategory3(c2Id.value as number)
  if (result.code == 200) {
    c3Arr.value = result.data
  }
}

// 监听一级分类变化，获取二级分类数据
watch(c1Id, () => {
  c2Id.value = ''
  c3Id.value = ''
  c2Arr.value = []
  c3Arr.value = []
  if (c1Id.value) getC2()
})

// 监听二级分类变化，获取三级分类数据
watch(c2Id, () => {
  c3Id.value = ''
  c3Arr.value = []
  if (c2Id.value) getC3()
})

// 监听三级分类数据，发请求获取当前分类下的属性数据
watch(c3Id, () => {
  //清空上一次的查询结果
  attrArr.value = []
  if (c3Id.value)
    getAttrList(c1Id.value as number, c2Id.value as number, c3Id.value as number)
})

// 获取已有的属性与属性值方法
const getAttrList = async (c1Id: number, c2Id: number, c3Id: number) => {
  let result = await reqGetAttrlist(c1Id, c2Id, c3Id)
  if (result.code == 200)
    attrArr.value = result.data
}

// 添加属性按钮回调
const addAttr = () => {
  // 清空表单数据,再收集数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })

  // 切换为编辑属性结构
  scene.value = 1
  // 收集三级分类id,用于用户增加/编辑属性
  attrParams.categoryId = c3Id.value
}

// table表格修改已有属性按钮回调
const updateAttr = (row: Attr) => {
  scene.value = 1
  // 将已有的属性对象赋值给attrParams对象，实现编辑时原有属性的回显（深拷贝，点击保存前，数据的变动应保持独立JSON.parse(JSON.stringify())）
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// "取消"按钮的回调
const cancel = () => {
  scene.value = 0
}

// 添加属性值按钮的回调
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
  // 获取新增的的el-input组件，进行自动聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存按钮回调
const save = async (data: Attr) => {
  let result: any = await reqUpdateAttr(data)
  if (result.code === 200) {
    // 切换场景
    scene.value = 0
    // 提示信息
    ElMessage({
      type: 'success',
      message: data.id ? '修改成功' : '添加成功'
    })
    // 重新获取属性数据,使刚添加的属性渲染出来
    getAttrList(c1Id.value as number, c2Id.value as number, c3Id.value as number)
  } else {
    ElMessage({
      type: 'error',
      message: data.id ? '修改失败' : '添加失败'
    })
  }
}

// 属性值表单元素失去焦点事件回调（切换到观察模式）
const observe = (row: AttrValue, $index: number) => {
  // 非法情况1 :属性名为空
  if (row.valueName.trim() == '') {
    // 删除掉属性值为空的元素，索引$index处,删一个
    attrParams.attrValueList.splice($index, 1)
    // 提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }
  // 非法情况2 ：属性值重复
  let repeat = attrParams.attrValueList.find((item) => {
    // 注意此时的判断的数组不包含当前失焦的属性值对象,item!=row
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    // 将重复的属性值从数组中删除
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return
  }

  row.flag = false

}

// 属性值表单元素点击回调（切换到编辑模式）
const edit = (row: AttrValue, $index: number) => {
  row.flag = true
  // nextTick：响应式数据发生变化，获取下一个tick更新的组件实例
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

// 删除属性方法
const deleteAttr = async (attrId: number) => {
  let result: any = await reqDeleteAttr(attrId)
  if (result.code == 200) {
    // 删除成功
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 重新渲染属性列表
    getAttrList(c1Id.value as number, c2Id.value as number, c3Id.value as number)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}


</script>

<style></style>
