# Webpack

## 概念

## 配置

-   `mode:'development|production|none'`: 用于指定当前的模式
-   `output.publicPath`：指定绝对路径，如果不设置的话会使用相对路径

## 开发环境

-   `webpack` 的 观察模式： 监听文件变化然后运行打包，但是不会开启一个服务，只是本地更新
-   `webpack-dev-server`： 开启一个本地的 nodejs 服务，文件变化后能够事实重新加载
-   `webpack-dev-middleware`： webpack-dev-server 内部通过此实现，就是一个 nodejs 的中间件，需要自己实现开启一个 node server（如 express），然后该中间件会将 webpack 处理过后的文件实时发送给 server

### 相关配置

-   `devtool: 'inline-source-map'`: source 会展示源代码的位置，方便调试，生产环境的时候应该删除
-   `devServer.static`: 指定开发环境中静态资源的目录。这些静态资源包括图片、样式文件、字体等，它们在开发过程中不需要通过 Webpack 打包处理，可以直接提供给前端访问

## loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

### 配置

-   `test`： 正则表达式，识别出哪些文件会被转换
-   `use`： 定义出在进行转换时，应该使用哪个 loader（执行顺序是逆序的）

> `{test: /\.css/i, use: ['style-loader', 'css-loader']}` 表示：「在 require()/import 语句中被解析为 '.css' 的路径」时，在你对它打包之前，先 use(使用) css-loader、style-loader 按顺序转化下转换一下

### 样式

`css-loader`：解析 CSS 文件，将其转换为 CommonJS 模块，以便在 JavaScript 中进行使用
`style-loader`： 将 CSS 代码通过 `<style>` 标签插入到 HTML 文档的 `<head>` 中，使样式能够在页面上生效（开发时使用，方便热更新）
`mini-css-extract-plugin.loader`：`mini-css-extract-plugin` 提供的 loader，将 CSS 代码从打包后的 JavaScript 文件中提取出来，生成单独的 CSS 文件（生产时使用，方便 css 文件缓存）

## plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

`html-webpack-plugin`：自动生成 Html 文件
`mini-css-extract-plugin`：提取 js 中的 css，生成单独的 css 文件

## 优化（optimization）

### optimization.runtimeChunk

将 `entry` 的 `runtime` 提取出来，并且 `runtime` 打包后的 `hash` 通常不会变化，利于浏览器缓存加载

-   `single`： 所有 `entry` 都共用一个 `runtime`
-   `multiple|true`：每个 `entry` 都会生成一个 `runtime`

#### runtime

-   Webpack 中的 runtime 指的是在构建过程中，Webpack 用来**处理模块加载、执行以及模块间依赖关系**的代码片段。
-   这些代码是打包后 bundle 的一部分，负责在**运行时解析模块依赖、按需加载模块以及执行模块代码**。
-   Webpack runtime 包括了模块的**加载器、编译器、解析器**等组件，它使用一种称为“chunk graph”的数据结构来高效管理模块之间的依赖关系
-   例如，当使用动态导入（`import()`）时，runtime 会处理模块的加载和执行过程（动态引入的文件会加载，但是等到调用的时候才会执行）

### optimization.SplitChunksPlugin

-   可以将公共的依赖模块提取到已有的入口 `chunk` 中，或者提取到一个新生成的 `chunk`
-   重复依赖会提取成一个新的 `chunk` ，供所有使用过的依赖一起使用，减少 bundle 大小，并且打包后该 `chunk` 的 `hash` 通常不会变化，有利于浏览器缓存

#### 默认情况下

webpack 将根据以下条件自动拆分 chunks：

-   新的 chunk 可以被**共享**，或者模块来自于 **node_modules** 文件夹
-   新的 chunk **体积大于 20kb**（在进行 min+gz 之前的体积）
-   当按需加载 chunks 时，并行请求的最大数量小于或等于 30
-   当加载初始化页面时，并发请求的最大数量小于或等于 30

当尝试满足最后两个条件时，最好使用较大的 chunks。

## preload 和 prefetch

声明 import 时使用下列内置指令可以让 webpack 输出“Resource Hint”告知浏览器：

-   预获取（prefetch）：将来某些导航下可能需要的资源
-   预加载（preload）：当前导航下可能需要资源

### 使用注意

1. webpack 4.6.0+ 版本支持 prefetch、preload，但是是通过 js 生成的 html 标签，而不是直接在 html 里面
2. 直接在 html 生成需要使用插件之类的配置，可以使用 preload-webpack-plugin（只支持 webpack 3）、automatic-prefetch-plugin、prefetch-plugin 等

### 示例代码

```js
btn.onclick = async function () {
    // 这个prefetch不是在html直接生成，而是通过js动态生成
    // 没有prefetch：等到点击的时候再去加载脚本执行
    // 有prefetch：浏览器会在空闲的时候加载chunk，等到点击的时候再执行脚本
    const {default: printMe} = await import(/* webpackPrefetch: true */ './print.js')
    printMe()
}
```

> qwik.js 就是利用了上面实现的动态加载和 prefetch 来提高加载速度

## 分析 bundle

一旦开始分离代码，一件很有帮助的事情是，分析输出结果来检查模块在何处结束。官方分析工具 是一个不错的开始。还有一些其他社区支持的可选项：

-   webpack-chart：webpack stats 可交互饼图。
-   webpack-visualizer：分析并可视化 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
-   webpack-bundle-analyzer：一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
-   webpack bundle optimize helper：这个工具会分析 bundle，并提供可操作的改进措施，以减少 bundle 的大小。
-   bundle-stats：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果。

## 缓存

### 提取引导模版

由于像 lodash 或 react 这样的第三方库很少像本地源代码一样频繁修改，因此通常推荐将第三方库提取到单独的 vendor chunk 中。

```js
optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
            }
        }
    }
}
```

### 模块标识符

每个 `module.id` 会默认基于解析顺序增加。换言之，当解析顺序发生变化，ID 也会随之改变。

-   调整 `import` 的顺序，会导致解析顺序发生变化，所以被 import 的 ID 也会发生变化
-   新增加 `import` 或者减少 `import` ，可能会导致 `runtime` 发生变化

包含如下情况：

-   main bundle 会随着自身的新增内容的修改而发生变化。
-   vendor bundle 会随着自身的 module.id 的变化而发生变化。
-   manifest runtime 会因为现在包含一个新模块的引用而发生变化。

#### optimization.moduleIds

告知 webpack 当选择模块 id 时需要使用哪种算法。将 optimization.moduleIds 设置为 false 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。

| 选项          | 描述                                  |
| ------------- | ------------------------------------- |
| natural       | 按使用顺序的数字 id。                 |
| named         | 对调试更友好的可读的 id。             |
| deterministic | 被哈希转化成的小位数值模块名。        |
| size          | 专注于让初始下载包大小更小的数字 id。 |

deterministic 选项有益于长期缓存，但对比于 hashed 来说，它会导致更小的文件 bundles。数字值的长度会被选作用于填满最多 80%的 id 空间。当 optimization.moduleIds 被设置成 deterministic，默认最小 3 位数字会被使用。要覆盖默认行为，要将 optimization.moduleIds 设置成 false，并且要使用 webpack.ids.DeterministicModuleIdsPlugin。
