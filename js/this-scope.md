# this 作用域

## 1. 全局上下文

在全局函数中，`this` 指向全局对象（在浏览器中是 `window`，在 Node.js 中是 `global`）

```js
console.log(this) // 在浏览器中输出 window 对象
```

## 2. 对象方法中

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

## 3. 构造函数中

在构造函数中，`this` 指向新创建的对象实例。

```js
function Person(name) {
    this.name = name
}
const person = new Person('Alice')
console.log(person.name) // 输出 "Alice"，构造函数中的 this 指向 person 实例
```

## 4. 事件处理中

在事件处理函数中，`this` 通常指向触发事件的元素。

```js
const button = document.getElementById('myButton')
button.addEventListener('click', function () {
    console.log(this) // 在点击时输出 button 元素
})
```

## 5. 使用 `call`、`apply` 或 `bind`

使用 `call`、`apply` 或 `bind` 方法调用函数时，可以显式地设置 `this` 的值。

```js
const person = {name: 'Alice'}
function sayName() {
    console.log(this.name)
}
sayName.call(person) // 使用 call 设置 this 指向 person 对象
```

## 6. 箭头函数中

箭头函数没有自己的 `this` 上下文，它会捕获其所在上下文的 `this` 值，作为自己的 `this`

```js
const person = {
    name: 'Alice',
    sayName: () => {
        console.log(this.name) // 这里的 this 指向外围作用域（可能是 window 或 undefined）
    }
}
person.sayName() // 输出全局对象的 name 属性，或在严格模式下是 undefined
```

## 7. 严格模式下

在严格模式（`'use strict'`）下，如果函数没有被调用在对象上下文中，`this` 的值将为 `undefined`。

```js
'use strict'
function sayName() {
    console.log(this) // 输出 undefined
}
sayName()
```

## 8. 独立函数调用

如果一个函数被独立调用，而不是作为对象的方法，一般来说，在非严格模式下 `this` 指向全局对象，在严格模式下 `this` 为 `undefined`。

```js
function sayName() {
    console.log(this)
}
sayName() // 在非严格模式下输出全局对象，在严格模式下输出 undefined
```
