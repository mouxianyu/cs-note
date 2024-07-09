Vue3的改进和新特性
## 新增组合式API（Composition API）
Vue3引入了组合式API，提供了一种新的方式来组织逻辑。组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用**函数**而不是**声明选项**的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API

- [响应式 API](https://cn.vuejs.org/api/reactivity-core.html)：例如 `ref()` 和 `reactive()`，使我们可以直接创建响应式状态、计算属性和侦听器。
- [生命周期钩子](https://cn.vuejs.org/api/composition-api-lifecycle.html)：例如 `onMounted()` 和 `onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。
	> “钩子”（Hooks）这个术语通常指的是一种允许用户或开发者介入或修改软件系统或应用程序某些部分行为的机制
	> 钩子之所以被称为“钩子”，是因为它们像钓鱼的钩子一样，可以“钩住”代码执行流程中的特定点。一旦“钩住”，就可以在那个点上执行额外的操作或逻辑，而不会影响主流程的执行。
- [依赖注入](https://cn.vuejs.org/api/composition-api-dependency-injection.html)：例如 `provide()` 和 `inject()`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

**声明式API（Vue2）**：强调描述要达到的目标或状态，而不是具体的实现过程。
**响应式API（Vue3）**：基于数据的变化自动进行响应和处理。

## 响应式系统改进（Proxy）

- **Composition API**：Vue 3 引入了组合式 API，提供了一种新的方式来组织组件逻辑，使得代码更加模块化和可复用。这包括 `setup` 函数、`reactive`、`ref`、`computed` 和 `watch` 等函数 。
- **响应式系统的改进**：Vue 3 使用了 **Proxy** 来实现响应式系统，替代了 Vue 2 中的 `Object.defineProperty`。这使得 Vue 3 能够更高效地追踪依赖和更新 DOM，同时解决了 Vue 2 中一些无法检测到的响应式问题。
- **性能提升**：Vue 3 在**虚拟 DOM 的重写**、组件初始化、编译器优化等方面进行了性能提升，使得渲染速度更快，更新更高效。
- **更好的 TypeScript 支持**：Vue 3 的代码库使用 TypeScript 重写，提供了更好的类型推断和类型检查，使得在 Vue 3 中使用 TypeScript 更加方便和安全。
- **新的生命周期钩子**：Vue3 更新了组件的生命周期钩子，例如 `beforeCreate` 和 `created` 被 `setup` 函数替代，==同时新增了 `onBeforeMount`、`onMounted` 等钩子。==
- **模板语法的变化**：Vue 3 允许模板中有**多个根节点**，而 Vue 2 只允许有一个根节点。此外，Vue 3 还引入了 `v-model` 的新语法，使用 `modelValue` 代替了 `value` 作为默认的 prop 名称。
- **移除全局 API**：Vue 3 移除了一些全局 API，如 `$on`、`$once` 和 `$off`，而是通过实例方法或组合式 API 提供了相应的功能。
- **Teleport 和 Suspense**：Vue 3 新增了 `Teleport` 组件，允许将组件的 DOM 移动到 DOM 的其他位置；`Suspense` 组件则支持异步组件的加载状态，可以在组件加载时显示后备内容。