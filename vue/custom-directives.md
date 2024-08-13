# 自定义指令

除了 Vue 内置的一系列指令 (比如 `v-model` 或 `v-show`) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)。

## 示例

在鼠标悬停时添加一个动态类

```js
// 注册一个全局自定义指令 `v-hover`
Vue.directive('hover', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding) {
        // 聚焦元素
        el.focus()

        // 添加事件监听器
        el.addEventListener('mouseenter', function () {
            el.classList.add('hover')
        })

        el.addEventListener('mouseleave', function () {
            el.classList.remove('hover')
        })
    }
})
```
