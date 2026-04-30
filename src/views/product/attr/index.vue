<template>
  <div>
    <!-- 三选下拉菜单 -->
    <el-card>
      <el-form inline="true">
        <el-form-item label="一级分类">
          <el-select style="width: 150px" v-model="c1Id">
            <!-- option:label：选项显示的文字，value:select下拉菜单收集的数据 -->
            <el-option v-for="(c1, index) in c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select style="width: 150px" v-model="c2Id" :disabled="!c1Id">
            <el-option v-for="(c2, index) in c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select style="width: 150px" v-model="c3Id" :disabled="!c2Id">
            <el-option v-for="(c3, index) in c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 商品属性数据展示 -->
    <el-card style="margin: 10px 0;">
      <el-button type="primary" size="default" icon="plus">添加属性 </el-button>
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
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
// 引入分类数据获取接口方法
import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from '@/api/product/attr';
import { onMounted, ref, watch } from 'vue';

// 引入属性相关数据ts类型
import type { CategoryResponseData, Attr } from '@/api/product/attr/type';

// 引入获取当前属性与属性值数据方法
import { reqGetAttrlist } from '@/api/product/attr';

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

const getAttrList = async (c1Id: number, c2Id: number, c3Id: number) => {
  let result = await reqGetAttrlist(c1Id, c2Id, c3Id)
  if (result.code == 200)
    attrArr.value = result.data
}
</script>

<style></style>
