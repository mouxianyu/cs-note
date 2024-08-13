# this 作用域

-   在 JavaScript 中，this 是一个特殊的关键字，它在函数执行时指向一个对象。
-   this 的值取决于函数的调用方式，而不是函数定义时的位置
-   箭头函数不绑定自己的 this，它会捕获其所在上下文的 this 值。这意味着箭头函数中的 this 值在定义时就已经确定，并且在整个函数中保持不变

## 执行上下文（Execution Context）

在 JavaScript 中，执行上下文（Execution Context）是一个环境，在这个环境中代码被执行。它包含了变量、函数、作用域链等信息。执行上下文的创建和执行是 JavaScript 引擎运行代码的基础过程。

**执行上下文是由函数调用或全局代码的执行创建的**

-   **全局执行上下文**：这是默认的执行上下文，当 JavaScript 代码开始执行时首先进入这个上下文。在这个上下文中，this 指向全局对象（在浏览器中是 window，在 Node.js 中是 global）。
-   **函数执行上下文**：当函数被调用时，一个新的执行上下文被创建。这个上下文包含了函数的参数、局部变量、函数本身的 this 绑定等。每个函数调用都会创建一个新的执行上下文，并且将其推入执行栈（Execution Stack）。
-   **Eval 执行上下文**：eval 函数可以创建一个新的执行上下文，但出于安全和性能的考虑，它的使用通常不推荐。
-   **模块执行上下文**：在 ES6 模块中，每个模块都有自己的执行上下文，类似于函数执行上下文，但它们是封闭的，不会影响到全局上下文。
-   **箭头函数的执行上下文**：箭头函数没有自己的 this 上下文，它们捕获其所在上下文的 this 值。这意味着箭头函数内的 this 值在定义时就已经确定，而不是在调用时确定。

> 因为对象字面量（即对象）本身并不构成一个执行上下文，所以如果对象方法是箭头函数的话，它的执行上下文不是对象，this 也不指向对象

## this 绑定

-   **上下文绑定**：this 的值与函数的调用上下文有关。在不同的调用上下文中，this 可能指向不同的对象。
-   **默认值**：如果函数不是作为对象的方法调用，那么在非严格模式下，this 默认绑定到全局对象（浏览器中的 window 或 Node.js 中的 global）。在严格模式下，this 的值是 undefined。
-   **隐式绑定**：当函数作为对象的方法被调用时，this 隐式地绑定到该对象。例如，obj.method()中的 this 将指向 obj。
-   **显式绑定**：可以通过 call、apply 或 bind 方法显式地设置 this 的值。这些方法允许你在调用函数时指定 this 应该指向哪个对象。
-   **new 绑定**：当使用 new 关键字创建一个对象时，构造函数内的 this 绑定到新创建的对象上。
-   **箭头函数**：箭头函数不绑定自己的 this，它会捕获其所在上下文的 this 值。这意味着箭头函数中的 this 值在定义时就已经确定，并且在整个函数中保持不变。
-   **事件处理**：在事件处理函数中，this 通常指向触发事件的元素。
-   **回调函数**：在某些情况下，如 setTimeout 或 setInterval 的回调函数中，this 可能不会按照预期工作，因为它们通常不会隐式绑定到调用它们的上下文中。
-   **静态方法**：静态方法的 this 绑定类
-   **ES6 类**：在 ES6 类中，方法默认不会绑定 this 到类的实例，除非你在构造函数中显式调用它们。
-   **函数作为对象属性调用**：即使函数是作为对象的属性调用的，this 也可能不会指向该对象，除非函数是通过对象调用的。
    -   指的 `const fun = obj.fun` ,然后直接调用 `fun`，此时的 `fun` 的 `this` 是根据执行上下文确定的，而不是对象

## this 指向

### 1. 全局上下文

在全局函数中，`this` 指向全局对象（在浏览器中是 `window`，在 Node.js 中是 `global`）

```js
console.log(this) // 在浏览器中输出 window 对象
```

### 2. 对象方法中

当一个函数作为对象的方法被调用时，`this` 指向该对象。

```js
const person = {
    name: 'Alice',
    sayName: function () {
        console.log(this.name)
    }
}
person.sayName() // 输出 "Alice"，this 指向 person 对象
```

### 3. 构造函数中

在构造函数中，`this` 指向新创建的对象实例。

```js
function Person(name) {
    this.name = name
}
const person = new Person('Alice')
console.log(person.name) // 输出 "Alice"，构造函数中的 this 指向 person 实例
```

### 4. 事件处理中

在事件处理函数中，`this` 通常指向触发事件的元素。

```js
const button = document.getElementById('myButton')
button.addEventListener('click', function () {
    console.log(this) // 在点击时输出 button 元素
})
```

### 5. 使用 `call`、`apply` 或 `bind`

使用 `call`、`apply` 或 `bind` 方法调用函数时，可以显式地设置 `this` 的值。

```js
const person = {name: 'Alice'}
function sayName() {
    console.log(this.name)
}
sayName.call(person) // 使用 call 设置 this 指向 person 对象
```

### 6. 箭头函数中

箭头函数没有自己的 `this` 上下文，它会捕获其所在上下文的 `this` 值，作为自己的 `this`

> 箭头函数的 this 在函数定义的时候确定，不会根据执行上下文的变化而变化

```js
const person = {
    name: 'Alice',
    sayName: () => {
        console.log(this.name) // 这里的 this 指向外围作用域（可能是 window 或 undefined）
    }
}
person.sayName() // 输出全局对象的 name 属性，或在严格模式下是 undefined
```

### 7. 严格模式下

在严格模式（`'use strict'`）下，如果函数没有被调用在对象上下文中，`this` 的值将为 `undefined`。

```js
'use strict'
function sayName() {
    console.log(this) // 输出 undefined
}
sayName()
```

### 8. 独立函数调用

如果一个函数被独立调用，而不是作为对象的方法，一般来说，在非严格模式下 `this` 指向全局对象，在严格模式下 `this` 为 `undefined`。

```js
function sayName() {
    console.log(this)
}
sayName() // 在非严格模式下输出全局对象，在严格模式下输出 undefined
```

## this 指向什么时候发生改变

### 不会改变的情况

1. 箭头函数在函数定义的时候 this 就确定了，不会根据函数执行的位置改变

### 会改变的情况

1. 具名和匿名的普通函数的 this 都会根据执行上下文发生改变
2. 函数通过 call、apply、bind 方法被调用，可以显式改变 this 的指向（箭头函数不行）

[示例](/code/js/this-scope/index.js)
