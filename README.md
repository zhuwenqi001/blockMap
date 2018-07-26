# 街区地图

### 项目描述

这是一个基于React的地图相关的单页应用。功能包括：

- 以文字列表和地图marker的形式，展示获取到的地点数据；
- 实现实时数据筛选，并在两种形式中同步体现；
- 点击具体地点数据，以infoWindow的形式展示维基百科相关数据。

### 项目运行

- 基于node、npm环境
    + npm install 安装相关依赖
    + npm start 运行项目
- 调用API
    + [高德地图组件](https://elemefe.github.io/react-amap/components/map)
    + [维基百科](https://elemefe.github.io/react-amap/components/map)

### 组件介绍
- MarkerFilter.js 标志地址筛选，通过发布订阅模式将筛选结果传递给兄弟组件；
- BaseMap.js 基于amap实现地图相关功能；
- eventEmitter.js 发布订阅模式处理模块 [参考](https://github.com/sunyongjian/blog/issues/27)



