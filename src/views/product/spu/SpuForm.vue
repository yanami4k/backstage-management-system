<template>
  <el-card>
    <el-form>
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
      </el-form-item>

      <el-form-item label="SPU品牌">
        <el-select v-model="spuParams.tmId">
          <el-option v-for="item in trademark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU描述" v-model="spuParams.description"></el-input>
      </el-form-item>

      <el-form-item label="SPU照片">
        <el-upload v-model:file-list="imageList" action="/api/admin/product/fileUpload" list-type="picture-card"
          :headers="{ Token: token }" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
          :before-upload="handleBefore">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height:100%" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="SPU销售属性">
        <el-select :placeholder="unSaleAttr.length ? `还存在${unSaleAttr.length}个未选` : '无'"
          v-model="unSaleAttrIdAndValue">
          <el-option v-for="item in unSaleAttr" :key="item.id" :label="item.name"
            :value="`${item.id}:${item.name}`"></el-option>
        </el-select>
        <el-button style="margin-left: 10px; margin-top: 10px;" type="primary" size="default" icon="Plus"
          :disabled="!unSaleAttrIdAndValue" @click="addSaleAttr">添加属性值</el-button>
        <!-- table:展示销售属性&属性值 -->
        <el-table border style="margin:10px 0px" :data="saleAttr">
          <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
          <el-table-column label="销售属性名" align="center" width="120px" prop="saleAttrName"></el-table-column>
          <el-table-column label="销售属性值" align="center">
            <template #default="{ row, $index }">
              <el-tag v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id"
                style="margin-right: 10px" closable @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input v-if="row.flag" v-model.trim="row.saleAttrValue" size="small"
                style="width:100px" placeholder="请输入属性值" @keyup.enter="toLook(row)"
                @blur="toLook(row)" />
              <el-button v-else size="small" icon="Plus" @click="toEdit(row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #default="{ $index }">
              <el-button type="danger" size="small" icon="Delete"
                @click="saleAttr.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="default" @click="save"
          :disabled="saleAttr.length === 0">保存</el-button>
        <el-button type="info" size="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import {
  reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu
} from '@/api/product/spu';
import type { AllTradeMark, SpuData, Trademark, SpuImg, SaleAttrData, HasSaleAttr, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/modules/user';
import type { UploadProps } from 'element-plus';

let $emit = defineEmits(['SPUScene'])
let userStore = useUserStore()
let token = userStore.token as string

// 存储品牌数据
let trademark = ref<Trademark[]>([])
// 存储照片墙数据
let imageList = ref<SpuImg[]>([])
// 存储已有销售属性
let saleAttr = ref<SaleAttrData[]>([])
// 存储全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 收集未选销售属性的 id 与 name
let unSaleAttrIdAndValue = ref<string>('')
// 控制照片墙预览
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')

// 存储 SPU 表单数据
let spuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: []
})

// 计算还未拥有的销售属性
const unSaleAttr = computed(() => {
  return allSaleAttr.value.filter(item => {
    return saleAttr.value.every(val => {
      return item.name !== val.saleAttrName
    })
  })
})

// 初始化已有 SPU 数据（修改场景）
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  // 获取全部品牌数据
  let result: AllTradeMark = await reqAllTradeMark()
  trademark.value = result.data
  // 获取某一个 SPU 下全部商品的图片数据
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  imageList.value = result1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  // 获取 SPU 下已有的销售属性数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  saleAttr.value = result2.data
  // 获取全部的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allSaleAttr.value = result3.data
}

// 初始化添加 SPU（添加场景）
const initAddSpu = async (c3Id: number | string) => {
  // 先清空数据
  Object.assign(spuParams.value, {
    id: undefined,
    category3Id: c3Id,
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: []
  })
  // 清空照片墙
  imageList.value = []
  // 清空销售属性
  saleAttr.value = []
  unSaleAttrIdAndValue.value = ''
  // 获取全部品牌数据
  let result: AllTradeMark = await reqAllTradeMark()
  trademark.value = result.data
  // 获取全部的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allSaleAttr.value = result3.data
}

// 添加销售属性按钮的回调
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = unSaleAttrIdAndValue.value.split(':') as [string, string]
  const newSaleAttr: SaleAttrData = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  saleAttr.value.push(newSaleAttr)
  unSaleAttrIdAndValue.value = ''
}

// 属性值点击添加按钮的回调（切换到编辑模式）
const toEdit = (row: SaleAttrData) => {
  row.flag = true
  row.saleAttrValue = ''
}

// 属性值失去焦点的回调（切换到观察模式）
const toLook = (row: SaleAttrData) => {
  // 非法判断：属性值不能为空
  if (row.saleAttrValue?.trim() === '') {
    return ElMessage({
      type: 'warning',
      message: '属性值不能为空'
    })
  }
  // 非法判断：属性值不能重复
  if (row.spuSaleAttrValueList.find(item => item.saleAttrValueName === row.saleAttrValue)) {
    row.saleAttrValue = ''
    return ElMessage({
      type: 'warning',
      message: '属性值不能重复'
    })
  }
  // 收集属性值数据
  row.spuSaleAttrValueList.push({
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: row.saleAttrValue as string
  })
  row.flag = false
}

// 照片墙预览钩子
const handlePictureCardPreview: UploadProps['onPreview'] = (file) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url!
}

// 照片墙删除文件钩子
const handleRemove = () => {
  // 不做额外处理
}

// 照片墙上传文件前的钩子
const handleBefore: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage.error('文件大小超过3M')
    }
  } else {
    ElMessage.error('只能上传格式为：jpg, png, gif')
    return false
  }
}

// 保存按钮的回调
const save = async () => {
  // 整理照片墙数据
  spuParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  })
  // 整理销售属性数据
  spuParams.value.spuSaleAttrList = saleAttr.value as any
  // 发请求
  let result: any = await reqAddOrUpdateSpu(spuParams.value as any)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '修改成功' : '添加成功'
    })
    // 通知父组件切换场景回0
    $emit('SPUScene', 0)
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '修改失败' : '添加失败'
    })
  }
}

// 点击取消按钮：通知父组件切换场景为0
const cancel = () => {
  $emit('SPUScene', 0)
}

defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped>
.el-input {
  width: 203px;
}
</style>
