Vue3的改进和新特性
## 新增组合式API（Composition API）
Vue3引入了组合式API，提供了一种新的方式来组织逻辑。组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用**函数**而不是**声明选项**的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API

- [响应式 API](https://cn.vuejs.org/api/reactivity-core.html)：例如 `ref()` 和 `reactive()`，使我们可以直接创建响应式状态、计算属性和侦听器。
- [生命周期钩子](https://cn.vuejs.org/api/composition-api-lifecycle.html)：例如 `onMounted()` 和 `onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。
	-  “钩子”（Hooks）这个术语通常指的是一种允许用户或开发者介入或修改软件系统或应用程序某些部分行为的机制
	- 钩子之所以被称为“钩子”，是因为它们像钓鱼的钩子一样，可以“钩住”代码执行流程中的特定点。一旦“钩住”，就可以在那个点上执行额外的操作或逻辑，而不会影响主流程的执行。
- [依赖注入](https://cn.vuejs.org/api/composition-api-dependency-injection.html)：例如 `provide()` 和 `inject()`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

**声明式API（Vue2）**：强调描述要达到的目标或状态，而不是具体的实现过程。

**响应式API（Vue3）**：基于数据的变化自动进行响应和处理。

## 响应式系统改进（Proxy）
Vue 3 使用了 **Proxy** 来实现响应式系统，替代了 Vue 2 中的 `Object.defineProperty`。这使得 Vue 3 能够更高效地追踪依赖和更新 DOM，同时解决了 Vue 2 中一些无法检测到的响应式问题。

[Proxy](/js/Proxy.md)

## 生命周期钩子
Vue3 更新了组件的生命周期钩子

- `beforeCreate` 和 `created` 被 `setup` 函数替代
- 新增了 `onErrorCaptured`、`onActivated`、`onDeactivated` 、 `onServerPrefetch` 

[生命周期](Vue/生命周期.md)


## 性能提升
Vue 3 在**虚拟 DOM 的重写**、组件初始化、编译器优化等方面进行了性能提升，使得渲染速度更快，更新更高效。

### 虚拟DOM重写
- **动态标记**：通过标记动态节点，在更新时更高效地处理。
- **事件缓存**：优化事件处理的性能。
- **静态提升**：将一些静态的内容提升到渲染函数之外，减少重复计算。
- **子树渲染**：更智能地判断子树是否需要重新渲染。
- **缓存策略**：对虚拟 DOM 树进行缓存，提高复用率。

## 更好的 TypeScript 支持
Vue 3 的代码库使用 TypeScript 重写，提供了更好的类型推断和类型检查，使得在 Vue 3 中使用 TypeScript 更加方便和安全。

## 模板语法的变化

### v-model
- prop和默认事件名称变更
	- prop：`value` -> `modelValue`
	- 事件：`input` -> `update:modelValue`
- 移除 `.sync` 修饰符，用`v-model` 或 自定义事件（prop赋值+emit事件触发变更）实现类似功能。
- 可以在一个组件上使用多个 `v-model` ，可以用`defineModel` 减少代码
- 可以自定义 `v-model`  修饰符，如 `v-model.capitalize` 实现自动首字母大写（非modelValue的prop目前不可以自定义）

### v-if和v-for优先级
- 两者作用于同一个元素上时，`v-if` 会拥有比 `v-for` 更高的优先级，Vue2与Vue3相反

### Fragment
Vue 3 允许模板中有多个根节点

## 新增内置组件

### Teleport
允许将组件的 DOM 移动到 DOM 的其他位置

### Suspense（实验性功能）
支持异步组件的加载状态，可以在组件加载时显示后备内容