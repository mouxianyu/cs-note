# Ref 和 Reactive

ref 可以当成 `reactive({value:xxx})`，比较好理解。好像除了模版上 ref 可以省略.value，其他没有太大差别。不清楚 ref 的设计具体是出于什么原因。

## Ref 和 Reactive 的区别

1. ref 可以接受任何类型的值，包括原始类型（number、string、boolean 等）、深层嵌套的对象、数组、JS 内置数据结构（Map、Set 等）；reactive 只接受对象类型（对象、数组、Map、Set 等）
2. ref 的.value 可以替换整个对象，而不失去响应式，reactive 不行。如果 ref 不加.value 直接替换整个对象也是会失去响应式
3. ref 解构会失去响应（可以使用 toRef、toRefs）；ref 没法直接解构
4. ref 必须通过.value 访问，reactive 可以直接获取

## 为什么 Reactive 不能使用原始类型，Ref 可以

-   reactive 的底层是通过 [Proxy](/js/proxy.md) 实现的。`new Proxy(target, handler)` 中，target 必须是一个对象，如果不使用对象的话会报错：`TypeError: A Proxy's 'target' should be an Object`
-   ref 可以看成 `reactive({value:xxx})` （底层具体实现不太清楚）， 因此 ref 可以使用原始值，而且解释了为什么 ref 必须通过.value 访问

## 为什么 ref 的.value 可以替换整个对象，而不失去响应式，reactive 不行

把 ref 看成`reactive({value:xxx})` 就很好理解了

-   如果整个赋值的话其实都是会失去响应
-   如果 reactive 包装的内容加一层 value，就相当于 ref，都可以直接赋值不失去响应

```js
    <div id="app">
        <p>ref: {{refItem}}</p>
        <p>reactive: {{reactiveItem}}</p>
    </div>
    <script>
        const { createApp, ref, reactive } = Vue

        createApp({
            setup() {
                let refItem = ref('ref')
                let reactiveItem = reactive({ value: 'reactive' })
                // setTimeout(() => {
                //     // 整个赋值ref、reactive都会失去响应
                //     console.log('整个重新赋值')
                //     refItem = ref('ref replaced')
                //     reactiveItem = reactive({ value: 'reactive replaced' })
                // }, 1000);

                setTimeout(() => {
                    // ref .value赋值，可以任何赋值都能实现
                    console.log('ref .value赋值')
                    // refItem.value = 'ref .value replaced'
                    refItem.value = { obj: 'ref .value replaced' }

                    // reactive .value也可以实现，本质上没太大差别
                    // reactiveItem.value = ('reactive .value 赋值')
                    reactiveItem.value = { obj: '赋值对象' }

                }, 1000);
                return {
                    refItem,
                    reactiveItem
                }
            }
        }).mount('#app')
    </script>
```

## 失去响应的情况

-   reactive 直接解构会失去响应
-   reactive、ref 直接整个赋值会失去响应
-   ref 不通过.value 赋值会失去响应
