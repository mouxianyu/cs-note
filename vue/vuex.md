# Vuex

Vuex 是 Vue.js 的**状态管理库**，主要用于集中式管理应用的状态。

## 核心概念

-   **State**（状态）：存储应用的状态数据。
-   **Mutations**（变更）：**同步**函数，用于更改 store 中的状态，是唯一可以改变 state 的方法。
-   **Actions**（动作）：用于执行**异步**操作和触发 mutations。
-   **Getters**（获取器）：对状态进行计算和派生新的数据（类似 Computed）。
-   **Modules**（模块）：当应用变得复杂时，store 可以被分割成模块，每个模块拥有自己的 state、mutations、actions、getters，甚至是嵌套子模块。

> 在 Pinia 中 state 可以直接修改，但是不推荐，Vuex 不支持修改 state，只能通过 mutation 修改
> Pinia 去除 mutation 使得状态管理更加简洁和灵活，开发人员可以更自由地选择如何更新状态。无需定义专门的 mutation，减少了一些不必要的代码量

### Mutation 和 Action

-   mutation 有点类似于 setter
-   mutation 是同步更新状态的方法，只能进行同步操作，直接修改状态
-   action 用于处理异步操作，可以包含多个异步任务。通过触发 mutation 来间接更新状态
-   由于 mutations 是同步的，并且是 state 变更的唯一入口，**Vue DevTools** 可以很容易地跟踪到每个 mutation 的执行和它对 state 的影响。这对于开发过程中的问题诊断和调试非常有帮助

> 例如，在一个应用中，提交表单数据可以通过 action 来执行网络请求等异步操作，然后在请求成功后通过触发相应的 mutation 来更新状态。

### Vuex 和单纯的全局对象的区别

1. Vuex 存储的状态是响应式的
2. 无法直接更改 store 的状态，只能显示地提交（commit）mutation
