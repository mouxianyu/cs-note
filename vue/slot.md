# 插槽 Slots

Vue 的插槽（Slot）是一种用于在组件中定义可替换内容区域的机制

## 插槽类型

-   **默认插槽**：这是最常见的插槽类型，子组件中未被填充的部分会显示默认插槽的内容。
-   **具名插槽**：可以为插槽指定名称，父组件在填充时通过对应的名称来指定内容放置的位置。
-   **作用域插槽**：允许子组件向父组件传递数据，父组件可以根据这些数据来定制插槽的内容。

### 作用域插槽

子组件

```html
<!-- 子组件 -->
<template>
    <ul>
        <li v-for="item in items" :key="item.id">
            <slot :item="item">{{ item.defaultText }}</slot>
            <!-- 将item作为插槽的一部分 -->
        </li>
    </ul>
</template>
```

父组件

```html
<template>
    <child-component>
        <template v-slot:default="slotProps">
            <span>{{ slotProps.item.text }}</span>
        </template>
    </child-component>
</template>
```
