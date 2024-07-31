# typeof 和 instanceof

## typeof

用于检查原始数据的值，返回一个值的数据类型

```javascript
typeof 'Hello' // 返回 "string"
typeof 42 // 返回 "number"
typeof true // 返回 "boolean"
typeof undefined // 返回 "undefined"
typeof Symbol() // 返回 "symbol"
typeof 123456789012345678901234567890n // 返回 "bigint"
typeof function () {} // 返回 "function"
typeof [] // 返回 "object"（数组是对象的一种）
typeof null // 返回 "object"（这是一个特例）
```

### 实现原理

JavaScript 在底层存储变量时，会在变量的机器码低位 1-3 位存储它的类型信息：

-   `000`: 对象
-   `010`: 浮点数
-   `100`: 字符串
-   `110`: 布尔值
-   `1`: 整数
    其中，`null`  和  `undefined`  信息存储比较特殊：
-   `null`，所有机器码均为 0
-   `undefined`，用  `-2^32`  整数来表示

> `typeof`  在 判断  `null`  的时候，由于  `null`  的所有机器码均为 0，因此直接被判断为  `object`。
> 但是，如果在使用  `instanceof`  时，`null`  又不被认为是  `object`
> 这是 javascript 的历史遗留 Bug

### 手写实现 typeof

```js
function myTypeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
```

在 JavaScript 中，`call` 方法允许你调用一个函数，并将函数内部的 `this` 指向指定的对象。当你调用 `Object.prototype.toString.call(11)` 时，实际上是在执行以下步骤：

1. `Object.prototype.toString` 是一个定义在 `Object.prototype` 上的方法。通常情况下，如果你调用 `Object.prototype.toString()`，`this` 会指向 `Object.prototype` 本身。
2. 但是，当你使用 `call` 方法时，你告诉 JavaScript 引擎将 `this` 的值设置为 `call` 方法的第二个参数，在这个例子中是数字 `11`。
3. 由于 `11` 是一个原始类型的值而不是对象，JavaScript 会进行自动装箱，将 `11` 转换为一个 `Number` 包装对象。这个 `Number` 对象的原型链上会包含 `Object.prototype`。
4. 因此，`call` 方法将 `Object.prototype.toString` 内部的 `this` 指向这个自动创建的 `Number` 对象。
5. 当 `toString` 方法执行时，它会返回一个表示 `this` 参数类型的字符串。由于 `this` 现在指向了一个 `Number` 对象，所以返回的字符串是 `[object Number]`。

**简单来说就是 `Number(11)` ，调用了 `Object.prototype` 的 `toString`，而不是调用`Number.prototype的toString`，`Number.prototype.toString`有对`Object.prototype.toString`进行重写。**

但实际上，这并不是 typeof，上面的功能，超出了 typeof 的能力，例如：

```js
typeof [] === 'array' // false
myTypeof([]) === 'array' // true
```

可以优化用 map 匹配

## instanceof

检查引用类型，确定一个对象是否是某个类的实例，或者是否构造于某个构造函数或某个对象的原型链上

```js
const arr = []
console.log(arr instanceof Array) // 返回 true
console.log(arr instanceof Object) // 返回 true，因为Array是Object的子类

class MyClass {}
const myInstance = new MyClass()
console.log(myInstance instanceof MyClass) // 返回 true
```

### 手写实现 instanceof

```js
// 注意：Node打印的信息不完整，需要放在浏览器中查看到更完整的信息
const myInstanceof = (obj, constructor) => {
    // Object.prototype.__proto__是null，也就是原型链最根部了
    if (obj === null) return false
    // 如果不是对象也不是函数
    if (typeof obj !== 'function' && typeof obj !== 'object') return false
    let proto = Object.getPrototypeOf(obj)
    while (proto !== null) {
        if (proto === constructor.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

// true
console.log(myInstanceof(function () {}, Function))
// true
console.log(function () {} instanceof Function)
// true
console.log(myInstanceof([], Array))
// true
console.log(myInstanceof(() => 0, Function))
// true
console.log(myInstanceof(() => 0, Function))
// false
console.log(myInstanceof(() => 0, Number))

class Parent {}
class Child extends Parent {}

class Name {}
class FirstName extends Name {}

const myName = new Name()
const myChild = new Child()

// true
console.log(myInstanceof(myName, Name))
// true
console.log(myInstanceof(myName, FirstName))

// true
console.log(myInstanceof(myChild, Child))
// true
console.log(myInstanceof(myChild, Parent))
```

## 区别

1. **类型检查的范围**：`typeof` 可以检查原始类型和函数，但不能区分对象的不同构造函数。`instanceof` 专门用于检查对象是否是某个构造函数的实例。
2. **返回值类型**：`typeof` 返回一个字符串，表示类型名称；`instanceof` 返回一个布尔值，表示是否是实例。
3. **对于 `null` 的检查**：`typeof null` 返回 `"object"`，这是一个语言特有的异常情况。而 `instanceof` 操作符不能用于 `null`，因为 `null` 不是一个对象。
4. **对于数组的检查**：`typeof []` 返回 `"object"`，因为数组是对象的一种类型。使用 `instanceof` 可以明确地检查一个变量是否是数组：`[] instanceof Array` 返回 `true`。
5. **原型链的影响**：`instanceof` 检查的是对象的原型链，如果构造函数的原型被修改或替换，可能会影响 `instanceof` 的结果。

## 实现判断所有类型的函数

```js
// 自己版本
const getType = obj => {
    if (obj === undefined || obj === null) return typeof obj
    if (Number.isNaN(obj)) return 'nan'
    return Object.getPrototypeOf(obj).constructor.name.toLowerCase()
}

// 网络版本
const getType2 = obj => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

console.log(getType(false))
console.log(getType(Symbol('tt')))
console.log(getType(1n))
console.log(getType(NaN))
console.log(getType(null))
console.log(getType(undefined))
console.log(getType(11))
console.log(getType(/111/))
console.log(getType(new Date()))
console.log(getType(new Set()))
console.log(getType([]))
console.log(getType({}))
console.log(getType(() => {}))

class Parent {}
class Child extends Parent {}
console.log(getType(new Child()))
console.log(getType(new Parent()))
```
