<template>
  <div>
    <!-- 三级分类下拉 -->
    <el-card>
      <el-form inline="true">
        <el-form-item label="一级分类">
          <el-select style="width: 150px" v-model="c1Id">
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
    <div v-show="scene == 0">
      <!-- SPU数据表格 -->
      <el-card style="margin: 10px 0;">
        <el-button @click="addSPU" type="primary" size="default" icon="Plus" :disabled="!c3Id">添加SPU</el-button>
        <el-table style="margin: 10px 0;" border :data="spuRecords">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" width="100px" align="center"></el-table-column>
          <el-table-column label="SPU描述" prop="description" align="center"></el-table-column>
          <el-table-column label="SPU操作" align="center">
            <template #default="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSkuBtn(row)"></el-button>
              <el-button type="warning" size="small" icon="Edit" title="修改SPU" @click="updateSPU(row)"></el-button>
              <el-button type="info" size="small" icon="View" title="查看SKU列表" @click="findSku(row)"></el-button>
              <el-popconfirm :title="`确认删除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 分页器 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
        :disabled="false" :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
        @size-change="getHasSPU" @current-change="getHasSPU" />
    </div>
    <!-- 添加SPU|修改SPU 子组件 -->
    <SpuForm ref="spu" v-show="scene == 1" @SPUScene="changeSPUScene"></SpuForm>
    <!-- 添加SKU 子组件 -->
    <SkuForm ref="sku" v-show="scene == 2" @SKUScene="changeSKUScene"></SkuForm>
    <!-- 查看某SPU下的SKU列表对话框 -->
    <el-dialog title="SKU列表" v-model="show">
      <el-table border :data="skuArr">
        <el-table-column label="SKU名称" prop="skuName"></el-table-column>
        <el-table-column label="SKU价格(元)" prop="price"></el-table-column>
        <el-table-column label="SKU重量(克)" prop="weight"></el-table-column>
        <el-table-column label="SKU图片">
          <template #default="{ row }">
            <img v-if="row.skuDefaultImg" :src="row.skuDefaultImg" style="width:100px;height:100px" @error="(e) => (e.target as HTMLImageElement).style.display = 'none'" />
            <span v-else style="color:#999">暂无图片</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, onMounted } from 'vue';

import type { HasSpuResponseData, SpuData, ResSkuData } from '@/api/product/spu/type';
import { reqHasSpu, reqSkuListBySpu, reqDelSpu } from '@/api/product/spu';
import { ElMessage } from 'element-plus';

// 引入分类数据获取接口方法&相关ts类型
import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from '@/api/product/category'
import type { CategoryResponseData } from '@/api/product/category/type'

// 引入编辑&添加场景子组件
import SpuForm from './SpuForm.vue';
import SkuForm from './SkuForm.vue';

// 定义场景切换响应式数据: 0:展示已有SPU 1：添加或修改已有SPU 2：添加SKU
let scene = ref<number>(0 )

// 分页器默认页码
let pageNo = ref<number>(1)

// 每一页展示几条数据
let pageSize = ref<number>(3)

// 分页器总条数
let total = ref<number>(0)

// 定义各级分类id和数据存储
let c1Id = ref<string | number>('')
let c1Arr = ref<any>([])
let c2Id = ref<string | number>('')
let c2Arr = ref<any>([])
let c3Id = ref<string | number>('')
let c3Arr = ref<any>([])

// 存储已有的 SPU 数据
let spuRecords = ref<SpuData[]>([])

// 子组件实例
let spu = ref<any>()
let sku = ref<any>()

// 控制SKU列表对话框的显示与隐藏
let show = ref<boolean>(false)
// 存储某个SPU下全部SKU数据
let skuArr = ref<ResSkuData[]>([])

// 组件挂载时获取一级分类数据
onMounted(() => {
  getC1()
})
// 获取一、二、三级分类的数据的异步方法
const getC1 = async () => {
  let result: CategoryResponseData = await reqGetCategory1()
  if (result.code == 200) {
    c1Arr.value = result.data
  }
}
const getC2 = async () => {
  let result: CategoryResponseData = await reqGetCategory2(c1Id.value as number)
  if (result.code == 200) {
    c2Arr.value = result.data
  }
}
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

// 监听三级分类变化，发请求获取当前分类下的 SPU 数据
watch(c3Id, () => {
  // 清空上一次的查询结果
  spuRecords.value = []
  total.value = 0
  pageNo.value = 1
  if (c3Id.value) getHasSPU()
})

// 获取某一个三级分类下的全部已有SPU
const getHasSPU = async () => {
  let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, c3Id.value as number)
  if (result.code == 200) {
    console.log(result)
    spuRecords.value = result.data.records
    total.value = result.data.total
  }
}

// 表单SPU操作项中，点击修改SPU按钮回调
const updateSPU =(row:SpuData)=>{
  // 切换为场景1
  scene.value = 1
  // 调用子组件实例方法获取完整已有的SPU数据
  spu.value.initHasSpuData(row)
}

// spu展示表单中，点击添加SPU按钮回调
const addSPU = () => {
  // 切换为场景1
  scene.value = 1
  // 调用子组件方法初始化添加SPU数据
  spu.value.initAddSpu(c3Id.value)
}

// 点击添加SKU按钮的回调
const addSkuBtn = (row: SpuData) => {
  // 切换场景2
  scene.value = 2
  // 调用子组件方法初始化SKU数据
  sku.value.initSkuData(c1Id.value, c2Id.value, row)
}

// 点击查看SKU列表按钮的回调
const findSku = async (row: SpuData) => {
  let result: any = await reqSkuListBySpu(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    show.value = true
  }
}

// 删除某一个SPU
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqDelSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 如果当前页只剩1条且不是第一页，回退一页
    if (spuRecords.value.length <= 1 && pageNo.value > 1) {
      pageNo.value = pageNo.value - 1
    }
    getHasSPU()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// SpuForm绑定自定义事件SPUScene的事件回调
// 子组件通知父组件切换场景
const changeSPUScene = (val: number) => {
  // 子组件Spuform点击取消/保存后回到场景0展示SPU
  scene.value = val
  if (val == 0) getHasSPU()
}

// SkuForm绑定自定义事件SKUScene的事件回调
const changeSKUScene = (val: number) => {
  scene.value = val
  if (val == 0) getHasSPU()
}

</script>
