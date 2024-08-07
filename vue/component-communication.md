# Vue 组件通信方式

1.  props 传递： 父传子
2.  $emit 触发事件： 子传父
3.  provide/inject： 祖先向后代传递
4.  透传 attribute：父传子
5.  ref：父组件获取子组件的实例
6.  全局状态管理：vuex/pinia
7.  Event Bus（Vue3 被移除，Vue3 官方推荐使用 mitt.js）

## 双向绑定

双向绑定就是 `props` 和 `$emit` 两个方向绑定的语法糖。

-   vue2：
    -   一个组件只能有一个 `v-model` 默认绑定的 `prop` 是 `value` ，默认绑定事件 `input`，无法使用其他事件（除非用非常规方式修改）
    -   使用 `.sync` 修饰符 可以双向绑定其他 `props` ，事件是使用 `v-on:update:propName`
-   vue3：
    -   `v-model` 默认 `prop` 为 `modelValue` ，事件不再是固定的 `input` ，而是 `update:modelValue`
    -   组件可以定义自己的 `prop` 和事件，不是使用默认的 `modelValue` 和 `update:modelValue`
    -   组件支持多个 `v-model` 绑定不同 `prop` (相当于 vue2 的 `.sync` 统一成用 `v-model`)

## 透传 attribute

属性在子组件的 props 没有明确声明，可以用$attrs 访问未被声明的属性

-   vue2： `$attrs` 绑定属性，`$listener` 绑定事件
-   vue3： `$attrs` 事件和属性都包含在一起

## ref

ref 可以获得已经挂载的 DOM 元素或组件实例子

使用`<script setup> `的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露.

```html
<script setup>
    import {ref} from 'vue'

    const a = 1
    const b = ref(2)

    // 像 defineExpose 这样的编译器宏不需要导入
    defineExpose({
        a,
        b
    })
</script>
```

当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为 `{ a: number, b: number }` (ref 都会自动解包，和一般的实例一样)

## Event Bus

Event Bus 是一个用于组件间通信的机制。它允许不同组件之间通过事件进行通信，而不必关心组件之间的层级关系。Event Bus 通常是一个空的 Vue 实例，用作事件中心，组件可以在这个中心上发布事件和监听事件。

缺点是难以追踪事件的来源和去向，以及在大型应用中可能导致难以维护的问题。

> 组件可以发布时间到 EventBus，也可以通过 EventBus 监听事件，来达到组件之间的互相通信

Vue3 没有 EventBus 可以用 props/$emit、provide/inject 等其他内置的功能。

或者使用三方库，如：

-   mitt
-   tiny-emitter
-   vue3-eventbus
