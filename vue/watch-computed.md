# Watch 、 Computed

## Watch 和 Computed 的区别

-   **用途**：watch 主要用于监听数据的变化并执行相应的回调函数；computed 则用于计算派生数据。
-   **触发方式**：watch 是响应式地监听数据的变化，只要数据发生变化就会触发；computed 只有当依赖的数据发生变化时才会重新计算。
-   **缓存特性**：computed 具有缓存特性，只有当依赖的数据变化时才会重新计算结果；watch 每次都会执行回调。
-   **返回值**：computed 返回计算后的结果；watch 主要是执行回调操作。

> -   computed 主要用于声明性地描述一个值是如何根据组件中其他数据计算得来的，并且这个值是被动的，不会触发任何副作用。
> -   watch 用于侦听数据的变化，并在变化时执行一些操作，这些操作可能是异步的或有副作用的。
>
> watch 是主动监听，computed 被动随着依赖数据的更新而更新

## Watch 和 WatchEffect 的区别

-   watch 是显式的指定要监听的数据，watchEffect 是自动追踪变化，不用具体指定要监听的数据
-   watchEffect 会立即执行一次回调，watch 需要设置 immediate: true 来立即执行回调
-   watch 配置项比较多，可以处理更多的场景，watchEffect 代码简介方便
