// 后端统一响应格式
// 所有接口返回的 JSON 最外层都是这个结构
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 单个品牌的数据类型
export interface TradeMark {
    //  品牌唯一标识。? 表示可选：新增时不需要传，编辑时必须传
    id?: number,
    tmName: string,
    logoUrl: string
}

// 定义表格数据源：品牌列表的类型
// 就是 TradeMark 对象组成的数组
export type Records = TradeMark[]

// 定义 API 返回值：分页查询品牌列表时，后端返回的完整数据结构
// 继承了 ResponseData，所以自带 code、message、ok
export interface TradeMarkResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}
