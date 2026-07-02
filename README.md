# 易后台 - 企业运营管理系统

企业级后台管理系统前端项目，基于 Vue3 + TypeScript 打造，覆盖商品管理、权限控制、数据可视化等核心业务场景。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|:----:|
| 前端框架 | Vue 3 (Composition API) | 3.5 |
| 开发语言 | TypeScript | 6.0 |
| 构建工具 | Vite | 8.0 |
| 状态管理 | Pinia | 3.0 |
| 路由 | Vue Router | 5.0 |
| UI 组件库 | Element Plus | 2.13 |
| 数据可视化 | ECharts + echarts-liquidfill | 6.1 |
| CSS 预处理 | SCSS | — |
| HTTP 客户端 | Axios | — |
| 日期处理 | Day.js | 1.11 |
| 代码规范 | ESLint (flat config) + Oxlint + Stylelint | — |
| SVG 图标 | vite-plugin-svg-icons | — |

## 功能模块

### 登录与鉴权

- JWT Token 认证，登录/登出
- 动态路由权限守卫
- 用户信息获取，头像与昵称展示
- Lottie 动画登录页面，玻璃磨砂表单卡片

### 首页

- 用户问候卡片（时段自适应：早上好 / 上午好 / 下午好 / 晚上好）
- 欢迎插图（SVG 矢量图）
- 玻璃磨砂风格卡片，与登录页视觉统一

### 商品管理

| 子模块 | 功能 |
|--------|------|
| 品牌管理 | 品牌 CRUD、分页列表、Logo 图片上传 |
| 平台属性 | 三级分类联动、属性值增删改、表格内编辑 |
| SPU 管理 | SPU 列表、新增/修改 SPU（品牌选择、照片墙上、销售属性编辑）、删除 SPU、查看 SKU 列表 |
| SKU 管理 | SKU 分页列表、上架/下架切换、详情抽屉、删除 SKU、SPU 下添加 SKU（平台属性+销售属性+图片选择） |

### 权限管理 (ACL)

| 子模块 | 功能 |
|--------|------|
| 用户管理 | 用户 CRUD、批量删除、角色分配（复选框全选）、搜索 |
| 角色管理 | 角色 CRUD、权限分配（树形控件勾选半选）、搜索 |
| 菜单管理 | 树形表格展示、添加子菜单/功能按钮、编辑、删除、四级菜单层级 |

### 数据大屏

- 1920×1080 分辨率，自适应缩放适配任意显示器
- 9 个可视化组件：
  - 实时游客统计（水球图）
  - 城市游客来源 TOP5（横向柱状图）
  - 游客年龄分布（玫瑰饼图）
  - 全国游客流量分布（中国地图 + 飞行航线特效）
  - 未来 7 天游客趋势（渐变面积折线图）
  - 景区排行（渐变色柱状图）
  - 年度游客量对比（散点图）
  - 预约渠道统计（雷达图）
- 暗色主题 + 玻璃磨砂卡片 + 紫蓝青渐变色板

### 404 页面

- 居中 404 插图 + 返回首页按钮

## 项目结构

```
backstage-management-system/
├── index.html                         # HTML 入口
├── vite.config.ts                     # Vite 配置（代理、SVG、SCSS 全局变量）
├── eslint.config.ts                   # ESLint flat 配置
├── oxlintrc.json                      # Oxlint 配置
├── mock/                              # Mock 数据
├── public/                            # 静态资源
└── src/
    ├── main.ts                        # 应用入口
    ├── App.vue                        # 根组件
    ├── permission.ts                  # 路由鉴权守卫
    ├── setting.ts                     # 项目配置（标题、Logo）
    │
    ├── api/                           # API 接口层
    │   ├── type.ts                    # 通用响应类型
    │   ├── user/                      # 登录/用户信息
    │   │   ├── index.ts
    │   │   └── type.ts
    │   ├── acl/                       # 权限管理
    │   │   ├── user/index.ts & type.ts
    │   │   ├── role/index.ts & type.ts
    │   │   └── permission/index.ts & type.ts
    │   └── product/                   # 商品管理
    │       ├── trademark/index.ts & type.ts
    │       ├── category/index.ts & type.ts
    │       ├── attr/index.ts & type.ts
    │       ├── spu/index.ts & type.ts
    │       └── sku/index.ts & type.ts
    │
    ├── assets/                        # 静态资源
    │   ├── icons/                     # SVG 图标（vue, penguin, welcome）
    │   ├── images/                    # 图片（login, 404, screen）
    │   └── Lottie/                    # Lottie 动画
    │
    ├── components/                    # 公共组件
    │   └── SvgIcon/                   # SVG 图标组件
    │
    ├── layout/                        # 布局系统
    │   ├── index.vue                  # 布局容器（侧边栏+顶栏+内容区）
    │   ├── logo/index.vue             # Logo 与标题
    │   ├── menu/index.vue             # 侧边栏菜单（递归渲染）
    │   ├── main/index.vue             # 内容区路由出口
    │   └── tabbar/                    # 顶部导航栏
    │       ├── index.vue
    │       ├── breadcrumb/index.vue   # 面包屑导航
    │       └── setting/index.vue      # 设置（刷新、折叠、主题）
    │
    ├── router/                        # 路由配置
    │   ├── index.ts                   # 路由实例
    │   └── routes.ts                  # 路由表（常量+动态）
    │
    ├── stores/                        # Pinia 状态管理
    │   └── modules/
    │       ├── user.ts                # 用户状态（token、用户名、头像）
    │       ├── setting.ts             # 布局设置（折叠、刷新）
    │       └── types/types.ts         # 类型定义
    │
    ├── styles/                        # 全局样式
    │   ├── reset.scss                 # CSS Reset
    │   ├── variable.scss              # SCSS 变量 & mixin（glass 磨砂混入）
    │   └── index.scss                 # 样式入口
    │
    ├── utils/                         # 工具函数
    │   ├── request.ts                 # Axios 封装（拦截器、Token 注入）
    │   ├── token.ts                   # Token 本地存储操作
    │   └── getTime.ts                 # 时段问候语
    │
    └── views/                         # 页面视图
        ├── login/index.vue            # 登录页
        ├── home/index.vue             # 首页
        ├── 404/index.vue              # 404 页
        ├── screen/                    # 数据大屏
        │   ├── index.vue
        │   └── components/
        │       ├── top/index.vue
        │       ├── left/ (tourist, source, age)
        │       ├── center/ (map, line, china.json)
        │       └── right/ (rank, year, counter)
        ├── acl/                       # 权限管理
        │   ├── user/index.vue
        │   ├── role/index.vue
        │   └── permission/index.vue
        └── product/                   # 商品管理
            ├── trademark/index.vue
            ├── attr/index.vue
            ├── spu/ (index.vue, SpuForm.vue, SkuForm.vue)
            └── sku/index.vue
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```sh
pnpm install
```

### 启动开发服务器

```sh
pnpm dev
```

访问 http://localhost:5173

### 构建生产包

```sh
pnpm build
```

产物输出至 `dist/` 目录。

### 代码检查

```sh
pnpm type-check    # TypeScript 类型检查
pnpm lint          # ESLint + Oxlint + Stylelint
```
