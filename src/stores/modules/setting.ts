//小仓库：layout组件相关配置
import { defineStore } from "pinia";
import { ref } from "vue";

let useLayOutSettingStore = defineStore('SettingStore', () => {
    // 用户控制菜单折叠或展开的响应式变量
    const fold = ref(false)
    const refsh = ref(false)
    return { fold,refsh }
})

export default useLayOutSettingStore
