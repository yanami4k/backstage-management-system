<template>
  <div>
    <el-card>
      <el-table border :data="skuData" max-height="75vh">
        <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column label="名称" show-overflow-tooltip prop="skuName" min-width="120"></el-table-column>
        <el-table-column label="描述" show-overflow-tooltip prop="skuDesc" width="120"></el-table-column>
        <el-table-column label="默认图片" width="120">
          <template #default="{ row, $index }">
            <img v-if="row.skuDefaultImg" :src="row.skuDefaultImg" style="width:80px;height:80px" @error="(e) => (e.target as HTMLImageElement).style.display = 'none'" />
            <span v-else style="color:#999">暂无图片</span>
          </template>
        </el-table-column>
        <el-table-column label="重量(克)" prop="weight" width="90"></el-table-column>
        <el-table-column label="价格(元)" prop="price" width="90"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template #default="{ row, $index }">
            <el-button :type="row.isSale === 1 ? 'primary' : 'info'" size="small"
              :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
              :title="row.isSale === 1 ? '已上架，点击下架' : '已下架，点击上架'"
              @click="updateSale(row)"></el-button>
            <el-button type="info" size="small" icon="Edit" title="编辑" @click="toEdit"></el-button>
            <el-button type="primary" size="small" icon="InfoFilled" title="详情"
              @click="infoShow(row.id)"></el-button>
            <el-popconfirm title="确认删除?" width="200px" @confirm="deleteSku(row)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" title="删除"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 15, 20]"
        :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
        @current-change="getSkuData" @size-change="handleSizeChange" style="margin-top:20px" />
      <!-- 抽屉组件，展示商品详情 -->
      <el-drawer v-model="drawer" title="商品详情" :with-header="true">
        <el-row>
          <el-col :span="8">名称</el-col>
          <el-col :span="16">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">描述</el-col>
          <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">价格</el-col>
          <el-col :span="16">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">平台属性</el-col>
          <el-col :span="16">
            <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id" style="margin:0 10px 10px 0">
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">销售属性</el-col>
          <el-col :span="16">
            <el-tag v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id" style="margin:0 10px 10px 0">
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">商品图片</el-col>
          <el-col :span="16">
            <div class="block text-center">
              <el-carousel height="150px" trigger="click">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" style="width:100%;height:100%" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { reqSkuList, reqOnSaleSku, reqCancelSaleSku, reqSkuInfo, reqDelSku } from '@/api/product/sku';
import type { SkuData, ResSkuData, ResSkuInfoData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';

// 分页器当前页
let pageNo = ref<number>(1)
// 每一页展示几条数据
let limit = ref<number>(5)
// 数据总条数
let total = ref<number>(0)
// 存储 SKU 数据
let skuData = ref<SkuData[]>([])

// 获取 SKU 数据
const getSkuData = async () => {
  let result: ResSkuData = await reqSkuList(pageNo.value, limit.value)
  if (result.code == 200) {
    skuData.value = result.data.records
    total.value = result.data.total
  }
}

// 条/页发生变化
const handleSizeChange = () => {
  pageNo.value = 1
  getSkuData()
}

// 商品的上架与下架
const updateSale = async (row: SkuData) => {
  if (row.isSale === 0) {
    // 商品已下架，点击更新为上架
    let result: any = await reqOnSaleSku(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '上架成功'
      })
      getSkuData()
    }
  } else {
    // 商品已上架，点击更新为下架
    let result: any = await reqCancelSaleSku(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '下架成功'
      })
      getSkuData()
    }
  }
}

// 编辑按钮的回调
const toEdit = () => {
  ElMessage({
    type: 'success',
    message: '此功能还在开发中~~~'
  })
}

// 控制商品详情抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 存储 SKU 详情
let skuInfo = ref<SkuData>({})

// 点击详情按钮的回调
const infoShow = async (skuId: number) => {
  drawer.value = true
  let result: ResSkuInfoData = await reqSkuInfo(skuId)
  skuInfo.value = result.data
}

// 删除 SKU
const deleteSku = async (row: SkuData) => {
  let result: any = await reqDelSku(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 如果当前页只剩1条数据，回退一页
    if (skuData.value.length <= 1 && pageNo.value > 1) {
      pageNo.value = pageNo.value - 1
    }
    getSkuData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

onMounted(() => {
  getSkuData()
})
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}
</style>
