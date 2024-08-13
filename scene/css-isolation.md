# CSS 样式隔离

1. BEM（Block Element Modifier）
2. CSS Modules
3. CSS in JS
4. Shadow DOM
5. Vue Scoped

## BEM

`.block__element--modifier`通过约定来以这种方式命名

-   **Block:** 代表页面上的独立组件或实体，具有自己的意义和功能。每个块应该有一个唯一的类名，通常使用全小写字母，单词之间用连字符（-）连接。
    -   例如：`<button class="button">Click me</button>`
-   **Element**: 是块的子部分，没有单独的意义，只能与块一起使用。元素的类名由块的类名加上两个下划线（\*\*）和元素的名称组成。
    -   例如：`<span class="button**text">Click me</span>`
-   **Modifier**: 用于表示块或元素的不同状态或变体。修饰符的类名由块或元素的类名加上两个连字符（--）和修饰符的名称组成。
    -   例如：`<button class="button button--large">Click me</button>`

### 优点

1. 简单
2. 可读性好

### 缺点

1. 依赖约定，容易出现纰漏
2. 命名太长

## CSS Modules

-   将 CSS 代码模块化，避免全局样式污染。
-   给每个组件（指的不同组件，不是一个组件的不同实例引用）都加上唯一的哈希值，例如
    -   使用 hash 属性： `.btn[data-v-e6bcce90]`
    -   类名添加 hash`.btn-e6bcce90`
    -   直接改变类名为 hash`.e6bcce90`
-   可以使用 webpack、rollup、vite、postcss 之类的打包工具处理

### 优点

1. 学习成本低：API 简洁到几乎零学习成本
2. 能 100%解决 css 无作用域样式污染问题

### 缺点

1. 没有变量，通常要结合预处理器
2. 代码可读性差，hash 值不方便 debug（代码可读性可以用属性选择器来实现 hash）

## CSS in JS

CSS in JS 是 2014 年推出的一种设计模式，它的核心思想是把 CSS 直接写到各自组件中，也就是说**用 JS 去写 CSS**，而不是单独的样式文件里

```js
const style = {backgroundColor: 'blue', color: 'white'}
return <div style={style}>Inline Style Example</div>
```

大多数 CSS in JS 库（如 Styled-components 和 Emotion）会生成唯一的类名，并在文档的 `<head> `中插入相应的 CSS 规则。

### 优点

-   支持动态和条件性样式，可以很容易实现主题配置样式

### 缺点

-   可能会增加最终打包文件的大小。
-   学习曲线可能比传统 CSS 更陡峭。
-   调试可能比传统 CSS 更加复杂。

## Shadow DOM（Web Component）

Shadow DOM 提供了天然的样式封装机制。在影子树内的样式只会应用于该树内的元素，而不会影响到主文档树中的元素。

### 优点

-   组件内部的样式和结构完全隔离
-   原生支持

### 缺点

-   浏览器兼容性问题，有些浏览器不支持
-   调试困难

## Vue Scoped

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素

```html
<style scoped>
    .example {
        color: red;
    }
</style>

<template>
    <div class="example">hi</div>
</template>
```

转化成

```html
<style>
    .example[data-v-f3f3eg9] {
        color: red;
    }
</style>

<template>
    <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### 优点

1. 简单好用

### 缺点

1. 只适用于 Vue 框架
2. 使用 /deep/ 或 >>> 深度选择器可能会破坏封装性，需要谨慎使用
