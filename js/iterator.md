# 迭代器

JavaScript 中的迭代器（Iterator）是一种**接口**，为不同的数据结构提供了一种统一的访问机制。它允许你遍历（即访问）一个集合（比如**数组、字符串、Map、Set**等）中的每一个元素，而不需要了解该集合的内部结构。迭代器主要依赖于两个关键概念：可迭代对象（**Iterable**）和迭代器对象（**Iterator**）。

## 可迭代对象（Iterable）

可迭代对象是指实现了  `Symbol.iterator`  方法的对象。这些对象默认提供了迭代器，常见的可迭代对象包括**数组、字符串、Map、Set 、Generator**等。

## 迭代器对象（Iterator）

迭代器对象是实现了  `next()`  方法的对象。每次调用  `next()`  方法都会返回一个结果对象（Result Object），该对象有两个属性：

-   `value`：当前迭代到的值。
-   `done`：一个布尔值，表示迭代是否完成。

```js
// 创建一个数组
const array = [1, 2, 3]

// 获取数组的迭代器
const iterator = array[Symbol.iterator]()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

## `for...of`  循环

JavaScript 提供了  `for...of`  循环来简化遍历可迭代对象的过程。这个循环内部自动调用迭代器的  `next()`  方法。

```js
const array = [10, 20, 30]
for (const value of array) {
    console.log(value) // 10, 20, 30
}
```

### for...in

`for...in`  循环主要用于遍历对象的可枚举属性(`enumerable`)

### 可枚举属性

-   通过对象字面量定义的属性

    ```js
    const obj = {
        a: 1,
        b: 2
    }
    ```

-   通过  `Object.defineProperty()`  或  `Object.defineProperties()`  显式指定为可枚举的属性

    ```js
    const obj = {}

    Object.defineProperty(obj, 'a', {
        value: 1,
        enumerable: true
    })
    ```

-   内置对象的可枚举属性：内置对象如  `Array`、`Object`、`String`  等

### Array 不推荐用 for...in 遍历

1. **遍历顺序不确定**：for in 遍历的顺序是不确定的，可能会因浏览器实现而不同。
2. **遍历额外属性**：它不仅会遍历数组元素，还可能遍历到数组对象上继承的其他属性，这可能导致不必要的操作和错误。

```js
const arr = ['a', 'b', 'c']

for (let index in arr) {
    console.log(index) // 输出 '0', '1', '2'，可能不按顺序
    console.log(arr[index]) // 输出 'a', 'b', 'c'
}
```
