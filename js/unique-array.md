# 数组去重

## 1. 遍历并判断元素是否已经在数组中

创建一个唯一数组，遍历原始数组，如果没有就放进唯一数组，如果有就跳过

下面两个可以自由搭配：

-   判断： indexOf、includes
-   遍历：for、for...of、forEach、reduce 等

```js
// reduce + indexOf
function byIndexOf(arr) {
    return arr.reduce((acc, val) => {
        if (acc.indexOf(val) === -1) {
            acc.push(val)
        }
        return acc
    }, [])
}
// for...of + includes
function byIncludes(arr) {
    let unique = []
    for (const val of arr) {
        if (!unique.includes(val)) {
            unique.push(val)
        }
    }
    return unique
}
```

## 2.使用 filter 方法

利用 indexOf 只会返回数组中第一个元素的索引，利用 filter 将唯一元素筛选出来

```js
let uniqueArray = array.filter((item, index) => array.indexOf(item) === index)
```

## 3.利用一些本身自带唯一特性的内容

-   Set 只能包含唯一值
-   Object 键的唯一性（如果键是 undefined 会有问题）
-   Map 键的唯一性

### 1.使用 Set 对象

使用 Set 对象可以自动去除数组中的重复元素，因为 Set 只能包含唯一的值。

```js
let uniqueArray = [...new Set(array)]
```

### 2.使用 Object 作为映射（有问题，如果数组中有 undefined 会报错）

利用对象的键值唯一性，可以创建一个映射来存储数组中的唯一值。

```js
let uniqueArray = Object.keys(
    array.reduce((acc, val) => {
        acc[val] = true
        return acc
    }, {})
)
```

### 3.使用 Map 对象:

Map 对象可以存储键值对，并且键是唯一的。

```js
let uniqueArray = Array.from(new Map(array.map(item => [item, true])).keys())
```

## 4.使用 sort 和 length 比较（会改变原来的顺序）

先将数组排序，然后比较相邻元素，如果不同则添加到新数组中。

```js
let uniqueArray = []
array.sort()
uniqueArray.push(array[0])
for (let i = 1; i < array.length; i++) {
    if (array[i] !== array[i - 1]) {
        uniqueArray.push(array[i])
    }
}
```
