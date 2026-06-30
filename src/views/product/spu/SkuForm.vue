<template>
  <el-card>
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="请输入价格(元)" type="number" v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="请输入重量(克)" type="number" v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input placeholder="请输入描述信息" type="textarea" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline label-width="100px">
          <el-form-item style="margin-bottom:10px" v-for="item in attrArr" :key="item.id" :label="item.attrName">
            <el-select v-model="item.attrIdAndValueId">
              <el-option v-for="val in item.attrValueList" :key="val.id" :label="val.valueName"
                :value="`${item.id}:${val.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.saleIdAndValueId">
              <el-option v-for="val in item.spuSaleAttrValueList" :key="val.id" :label="val.saleAttrValueName"
                :value="`${item.id}:${val.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="tableRef">
          <el-table-column type="selection" width="80px" align="center"></el-table-column>
          <el-table-column label="图片">
            <template #default="{ row }">
              <img :src="row.imgUrl" style="width:100px;height:100px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="setDefault(row)">设置默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import type { SpuData, ResSkuData } from '@/api/product/spu/type';
import { reqGetAttrlist } from '@/api/product/attr';
import type { AttrResponseData } from '@/api/product/attr/type';
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu';
import type { SpuHasImg, SaleAttrResponseData, SkuAddResp } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['SKUScene'])

// 存储平台属性
let attrArr = ref<any>([])
// 存储销售属性
let saleArr = ref<any>([])
// 存储照片数据
let imgArr = ref<any>([])
// 表格实例
let tableRef = ref()

// 发送给服务器的参数
let skuParams = ref<ResSkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: ''
})

// 初始化 SKU 数据
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  // 清空旧数据
  Object.assign(skuParams.value, {
    category3Id: spu.category3Id,
    spuId: spu.id,
    tmId: spu.tmId,
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
  })
  // 获取平台属性
  let result: AttrResponseData = await reqGetAttrlist(c1Id as number, c2Id as number, spu.category3Id as number)
  attrArr.value = result.data
  // 获取销售属性
  let result1: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  saleArr.value = result1.data
  // 获取照片墙的数据
  let result2: SpuHasImg = await reqSpuImageList(spu.id as number)
  imgArr.value = result2.data
}

// 设置默认图片
const setDefault = (row: any) => {
  skuParams.value.skuDefaultImg = row.imgUrl
  // 勾选复选框
  imgArr.value.forEach((item: any) => {
    tableRef.value.toggleRowSelection(item, false)
  })
  tableRef.value.toggleRowSelection(row, true)
}

// 保存按钮的回调
const save = async () => {
  // 整理平台属性参数
  attrArr.value.forEach((item: any) => {
    if (item.attrIdAndValueId) {
      const [attrId, valueId] = item.attrIdAndValueId.split(':')
      skuParams.value.skuAttrValueList!.push({
        attrId,
        valueId
      })
    }
  })
  // 整理销售属性参数
  skuParams.value.skuSaleAttrValueList = saleArr.value.reduce((prev: any[], next: any) => {
    if (next.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId
      })
    }
    return prev
  }, [])
  // 发请求
  let result: SkuAddResp = await reqAddSku(skuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    // 通知父组件切换场景回0
    $emit('SKUScene', 0)
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}

// 点击取消按钮的回调
const cancel = () => {
  $emit('SKUScene', 0)
}

defineExpose({ initSkuData })
</script>

<style scoped>
.el-input {
  width: 203px;
}
</style>
