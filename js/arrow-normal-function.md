# 箭头函数与普通函数

## 箭头函数与普通函数的区别

-   **语法：** 箭头函数使用 `=>` 来定义，普通函数使用 `function` 来定义
-   **不能作为构造函数：** 箭头函数不能使用 `new` 关键字创建实例，普通函数可以
-   **prototype：** 箭头函数没有 prototype，普通函数有
-   **`this` 指向：** 箭头函数的 `this` 指向是在定义时确定的，不会随上下文改变（因此无法用 call/apply/bind 改变 this）； 普通函数的 `this` 指向在运行时动态确定
-   **没有自己 `arguments` 对象：**
    -   浏览器环境下如果在箭头函数内部打印 arguments 会报错，因为没有这个变量
    -   Nodejs 环境下箭头函数里面的 arguments 是**函数定义时**，外层的 arguments，不会随上下文改变。（Node 版本不同不一样）
    -   箭头函数可以使用**剩余参数**来获取参数，`(...args)=>{}`

```js
// Node v22.2.0
function funcArgs(info) {
    const arrowFuncArgs = info => {
        return arguments
    }
    const arrowArgs = arrowFuncArgs(info)
    // ! 打印结果相同
    console.log('arguments', arguments)
    console.log('arrowArgs', arrowArgs)
    return arguments
}

funcArgs('test')
```

```js
// Node v22.2.0
const arrowFuncArgs = info => {
    return arguments
}
function funcArgs(info) {
    const arrowArgs = arrowFuncArgs(info)
    // 打印结果不同，箭头函数指向全局作用域下的arguments
    console.log('arguments', arguments)
    console.log('arrowArgs', arrowArgs)
    return arguments
}

funcArgs('test')
```

## ES6 对象方法简写

```js
const obj = {
    // 普通函数
    foo: function () {}
    // 简写
    bar(){}
}
```

简写语法使用具名函数而不是匿名函数（如…foo: function() {}…）。具名函数可以从函数体调用（这对匿名函数是不可能的，因为没有标识符可以引用）。

### 简写方法特点

**与普通函数相同**

-   有 arguments，指代的是自己的参数

**与箭头函数相同**

-   不能作为构造函数
-   没有 prototype

**自己的特点**

-   this 指向对象
