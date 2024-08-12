# 循环和迭代

## JS 中的循环和迭代

### `while` 循环

当你需要在**不明确迭代次数**的情况下进行循环时使用

```js
let i = 0
while (i < array.length) {
    console.log(array[i])
    i++
}
```

### `do...while` 循环

类似于 while 循环，但**至少会执行一次循环体**，无论条件是否为真

```js
let i = 0
do {
    console.log(array[i])
    i++
} while (i < array.length)
```

### `for` 循环

最基本的循环结构

```js
for (let i = 0; i < array.length; i++) {
    console.log(array[i])
}
```

### `for...in` 循环

用于遍历对象的**可枚举**属性（包括继承的属性）

```js
for (const key in obj) {
    console.log(key, obj[key])
}
```

### `for...of` 循环（ES6 引入）

用于遍历**可迭代**对象（如数组、字符串、Map、Set 等）的元素

```js
for (const element of array) {
    console.log(element)
}
```

## 数组遍历

### `Array.prototype.forEach()`

数组的高阶方法，用于对数组中的每个元素执行一次提供的函数

```js
array.forEach(function (element, index) {
    console.log(index, element)
})
```

### `Array.prototype.map()`

用于遍历数组并对每个元素执行操作，返回一个新数组

```js
const newArray = array.map(function (element, index) {
    return element * 2
})
```

### `Array.prototype.reduce()` 和 `Array.prototype.reduceRight()`

用于遍历数组并对所有元素执行累加操作，返回单一的结果

reduceRight 累加的方向是从右到左

```js
const sum = array.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue
}, 0)
```

### `Array.prototype.filter()`

用于遍历数组并根据提供的测试函数返回符合条件的元素组成的新数组

```js
const filteredArray = array.filter(function (element, index) {
    return element > 10
})
```

### `Array.prototype.every()` 和 `Array.prototype.some()`

用于检查数组中的所有元素或至少一个元素是否满足测试函数的条件

```js
const allPositive = array.every(function (element, index) {
    return element > 0
})
```

### `Array.prototype.find()` 和 `Array.prototype.findIndex()`

用于查找符合条件元素的第一个实例或其索引

```js
const firstPositive = array.find(function (element) {
    return element > 0
})
```

## 对象遍历

### `for...in` 循环：

-   遍历对象自身的可枚举属性和继承的可枚举属性。
-   需要使用 `hasOwnProperty` 方法来过滤掉继承的属性。

> `hasOwnProperty()` 方法返回一个布尔值，表示对象**自有属性**（而不是继承来的属性）中是否具有指定的属性。

### 获取对象的键值，结合数组遍历

可以使用 `Object.keys()` 、`Object.values()` 、 `Object.entries()` 、 `Reflect.ownKeys()` 等与 for 循环结合使用。

**下面这些都不会返回继承的属性**：

#### `Object.keys()`：

返回一个包含对象所有自身可枚举属性名称的数组，然后可以对这个数组进行遍历。

#### `Object.values()`：

返回一个包含对象所有自身可枚举属性值的数组。

#### `Object.entries()`：

返回一个包含对象所有自身可枚举属性的键值对数组。

#### `Reflect.ownKeys()`：

返回一个数组，包含对象自身的所有属性名，不论它们是否可枚举。

值等同于 `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`

#### `Object.getOwnPropertyNames()`

方法返回一个数组，其包含给定对象中所有自有属性（包括不可枚举属性，但不包括使用 symbol 值作为名称的属性）

#### `Object.getOwnPropertySymbols()`

返回一个包含给定对象所有自有 Symbol 属性的数组

> -   对象方法默认是可枚举的
> -   从 class 创建的实例的对象方法默认是不可枚举的
> -   私有属性无法获取

### 对象使用相关方法的结果

```js
const obj = {
    name: 'hh',
    age: 20,
    [Symbol('gender')]: 'male',
    // 属性方法是可枚举的
    say() {
        console.log('hello')
    }
}

// [ 'name', 'age', 'say' ]
console.log('Object.keys', Object.keys(obj))
// [ 'hh', 20, [Function: say] ]
console.log('Object.values', Object.values(obj))
// [ [ 'name', 'hh' ], [ 'age', 20 ], [ 'say', [Function: say] ] ]
console.log('Object.entries', Object.entries(obj))
// [ 'name', 'age', 'say', Symbol(gender) ]
console.log('Reflect.ownKeys', Reflect.ownKeys(obj))
// [ 'name', 'age', 'say' ]
console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))
// [ Symbol(gender) ]
console.log('Object.getOwnPropertySymbols', Object.getOwnPropertySymbols(obj))

const entries = []
for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key]
        entries.push([key, val])
    }
}

// [ [ 'name', 'hh' ], [ 'age', 20 ], [ 'say', [Function: say] ] ]
console.log(entries)
```

### Class 创建实例对象相关方法结果

```js
class MyObject {
    name

    // 私有属性打印不出来
    #age

    hobby;

    [Symbol('gender')]

    // class创建的实例中方法是不可枚举的
    say() {
        console.log('hello')
    }

    constructor(name, age, hobby, gender) {
        this.name = name
        this.#age = age
        this.hobby = hobby
        this[Symbol('gender')] = gender
    }
}

const obj = new MyObject('hh', 20, 'sing', 'male')

// Object.keys [ 'name', 'hobby' ]
console.log('Object.keys', Object.keys(obj))

// Object.values [ 'hh', 'sing' ]
console.log('Object.values', Object.values(obj))

// Object.entries [ [ 'name', 'hh' ], [ 'hobby', 'sing' ] ]
console.log('Object.entries', Object.entries(obj))

// Reflect.ownKeys [ 'name', 'hobby', Symbol(gender), Symbol(gender) ]
console.log('Reflect.ownKeys', Reflect.ownKeys(obj))

// Object.getOwnPropertyNames [ 'name', 'hobby' ]
console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))

// Object.getOwnPropertySymbols [ Symbol(gender), Symbol(gender) ]
console.log('Object.getOwnPropertySymbols', Object.getOwnPropertySymbols(obj))

const entries = []
for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key]
        entries.push([key, val])
    }
}
// [ [ 'name', 'hh' ], [ 'hobby', 'sing' ] ]
console.log(entries)
```

## 递归和迭代

**递归**是一种在函数定义中直接或间接**调用自身**的编程技术

### 区别

1. **原理不同：**

-   递归是函数自身调用自身来解决问题。
-   迭代是通过循环结构重复执行一系列操作来解决问题。

2. **实现方式不同：**

-   递归通过函数调用链来实现。
-   迭代使用循环语句来实现。

3. **空间复杂度不同：**

-   递归在函数调用过程中会消耗较多的内存空间，可能导致栈溢出。
-   迭代通常在空间使用上更高效。

4. **效率不同：**

-   在某些情况下，迭代可能比递归效率更高，特别是对于大规模数据处理。

5. **可读性不同：**

-   递归的代码结构有时更简洁、直观，但可能较难理解。
-   迭代的代码逻辑通常更清晰易读。
