# 立即执行函数

立即执行函数（Immediately Invoked Function Expression，IIFE）是一种在定义时立即执行的 JavaScript 函数表达式

## 作用

-   **创建私有作用域**：可以防止变量污染全局作用域，将变量和函数的作用范围限制在函数内部。
-   **封装逻辑**：将相关的代码封装在一个函数中，便于管理和维护。
-   **自执行代码块**：有时候需要在代码加载后立即执行一些操作，IIFE 可以方便地实现这一点。
-   **利用闭包**：IIFE 可以创建闭包，捕获并持久化外部变量的状态。

IIFE 的语法结构通常如下：

```js
;(function () {
    // 函数体
})()
```

或者使用括号包裹来返回一个匿名函数，并立即调用它：

```js
!(function () {
    // 函数体
})()
```

## jQuery

jQuery 库本身就是通过立即执行函数（IIFE）封装的。这种封装方式有助于创建一个独立的私有作用域，避免污染全局命名空间。

jQuery 代码的开始通常看起来像这样：

```js
;(function (window, undefined) {
    // jQuery 代码
    // 这里的所有变量和函数都是局部的，不会影响到全局作用域
})(window)
```

-   `(function( window, undefined ) {...})` 是一个立即执行函数表达式。
-   window 参数传递给了 IIFE，使得在函数内部可以通过 window 访问全局对象，而不必使用全局变量 window。
-   undefined 是一个参数，但并没有实际使用它，这样做的目的是确保在压缩代码时，即使某些变量被删除，undefined 也不会被重新赋值，因为 undefined 是一个严格保留字。
-   window 作为参数传递给 IIFE 后，通常在函数内部用 $ 或 jQuery 作为局部变量来引用它，这样 $ 就不会成为全局变量。