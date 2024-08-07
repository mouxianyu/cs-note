# 闭包

## 例子

```javascript
function createClosure() {
    var secret = "I'm a secret!"
    return function () {
        console.log(secret)
    }
}

var myClosure = createClosure()
myClosure() // 输出: "I'm a secret!"
```

在这个例子中，`createClosure` 函数返回了一个匿名函数，这个匿名函数可以访问 `createClosure` 函数内的局部变量 `secret`。即使 `createClosure` 函数执行完毕后，返回的闭包仍然可以访问 `secret`，因为它形成了一个封闭的作用域。

## 概念

### 定义

闭包指的是一个函数能够**记住并访问其创建时所在的作用域**，即使这个函数在其原始作用域之外被执行。简单来说，闭包允许一个函数**访问创建时的环境**，即使它被移动到另一个作用域中。

### 自己理解

-   闭包就是能够读取其他函数的内部变量
-   定义在一个函数内部的函数
-   闭包就是将函数内部与外部连接起来的桥梁

## 闭包的用途

-   可以读取函数内部的变量
-   让这些变量始终保存在内存中，不会被垃圾回收机制回收
-   **🏷️ 数据封装**：闭包可以用来封装数据，隐藏内部状态，只通过函数接口暴露操作这些数据的方法
-   **🏷️ 异步编程**：在 JavaScript 等语言中，闭包常用于异步编程模式，如回调函数，允许在异步操作完成后访问特定的变量。
-   **🏷️ 模块模式**：在 JavaScript 中，闭包是实现模块模式的关键，模块模式允许将公有方法和私有变量封装在一个对象中。
-   **事件处理器**：在 Web 开发中，闭包可以用来持久化事件处理器的状态，即使 DOM 元素被销毁，事件处理器仍然可以访问其创建时的作用域。
-   **🏷️ 记忆功能**：闭包可以用来实现记忆功能，即缓存函数的结果，避免重复计算。
-   **迭代器和生成器**：闭包在迭代器和生成器的实现中扮演重要角色，允许它们保持状态跨多次调用。

## 使用注意

-   因为闭包变量都放在内存中，内存消耗比较大，所以不能滥用闭包，不然会有网页性能问题
-   不要随意改变父函数内部变量的值。可以把闭包当成**公共方法**（Public Method），内部变量当为**私有变量**（Private Variable）

## 单例模式可以由闭包实现

```javascript
function Storage() {
    this.name = '张三'
}

const Helper = (function () {
    let instance = null
    return function () {
        if (!instance) {
            instance = new Storage()
        }
        return instance
    }
})()

let p1 = Helper()
let p2 = Helper()
console.log(p1 === p2) // 输出 true，说明只有一个实例被创建
```
