# 生命周期

|   阶段   | Vue2              |        Vue3         |
| :------: | ----------------- | :-----------------: |
| 创建阶段 | **beforeCreate**  |      **setup**      |
|          | **created**       |                     |
| 挂载阶段 | beforeMount       |    onBeforeMount    |
|          | mounted           |      onMounted      |
| 更新阶段 | beforeUpdate      |   onBeforeUpdate    |
|          | updated           |      onUpdated      |
| 销毁阶段 | **beforeDestory** | **onBeforeUnmount** |
|          | **destoryed**     |   **onUnmounted**   |

主要变化就是，beforeCreate 和 created 变为 setup

beforeDestory、destoryed 改名为 beforeUnmount、unmount

此外，Vue3 还新增一些用于优化性能和处理错误的钩子函数，如 `onErrorCaptured`、`onActivated`、`onDeactivated` 、 `onServerPrefetch` 等钩子。

-   `onErrorCaptured` 在捕获了后代组件传递的错误时调用
-   `onActivated` 、`onDeactivated` 当`<KeepAlive>` 组件被插入到 DOM 或被移除时调用。
-   `onServerPrefetch` （SSR only）在组件实例在服务器上被渲染之前调用。

## 异步请求放在 created 还是 mounted

**created**：`created`钩子在 Vue 实例被创建之后立即被调用，此时组件的模板尚未编译，所以不能访问到 DOM 元素。

**mounted**：`mounted`钩子在 Vue 实例挂载到 DOM 之后调用，此时你可以访问到 DOM 元素

如果数据请求不需要依赖 DOM 操作，并且希望在组件渲染之前就获取数据，那么用`created`；

如果数据请求需要依赖于 DOM 元素或者需要在组件完全挂载后才执行，那么应该选择`mounted`
