# 深拷贝和浅拷贝

## 浅拷贝

基本类型拷贝值，引用类型拷贝地址

JS 中浅拷贝有

-   `Object.assign()`
-   `{...}`、`[...]` 拓展运算符
-   `Array.prototype.silce()`
-   `Array.prototype.concat()`

## 深拷贝

对于引用类型，不是两个地址共用一个数据，是不同地址不同数据

深拷贝有

-   `lodash` 的 `cloneDeep`
-   `jquery.extend(deepCopy,...)` 需要将第一个参数设置为 `true`
-   `JSON.parse(JSON.stringfy(obj))` （缺陷：不会拷贝对象上 `value` 为 `undefined` 的值，对应的 `key` 会被去除; `NaN` 会
    被转化为 `null` ；`Date` 对象变为 `Date` 字符串等等问题）
-   自定义函数递归循环拷贝

## 自定义实现循环递归深拷贝

### 前置内容

#### Reflect.ownKeys()

`Reflect.ownKeys` 方法返回一个由目标对象自身的属性键组成的数组。它的返回值等同于
`Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`。

-   `Object.keys(obj)` - 只返回对象自身的可枚举属性的键，以数组形式返回。
-   `Object.getOwnPropertyNames(obj)` - 返回对象自身的所有属性的键，不论它们是否可枚举。
-   `Object.getOwnPropertySymbols(obj)` - 返回对象自身的所有符号属性的键。
-   `Reflect.ownKeys(obj)` - 返回一个数组，包含对象自身的所有属性键，包括字符串键和符号键。

#### 循环引用

循环引用是指在两个或多个对象之间存在相互引用的情况，形成一个封闭的循环关系。

```js
const objA = {
    ref: objB
}

const objB = {
    ref: objA
}
```

#### 强引用和弱引用

##### 强引用：

当一个对象被强引用时，垃圾回收器不会回收该对象，只要强引用存在，对象就会一直存在于内存中。

```js
const obj = {name: '示例对象'}
const ref = obj // ref 是对 obj 的强引用
```

##### 弱引用：

-   **不影响垃圾回收：** 弱引用不会妨碍垃圾回收器对被引用对象的回收。
-   **自动清理**： 当被引用对象没有其他强引用时，它可能会在某个时候被垃圾回收器回收，而弱引用会自动变为无效（null）。
-   **适用场景**： 常用于实现缓存、观察者模式等，以避免不必要的内存占用。

##### 常见弱引用类型

**WeakMap：** 用于存储键值对，其中键是弱引用的对象。

**WeakSet：** 用于存储对象的集合，其中元素是弱引用的对象。

```js
const weakMap = new WeakMap()
const obj = {name: '示例对象'}

weakMap.set(obj, '相关数据') // 在 WeakMap 中对 obj 进行弱引用
```

#### 实现

```js
function cloneDeep(source) {
    const weakmap = new WeakMap()

    function copy(source) {
        // ! 判断函数
        if (typeof source === 'function') {
            // TODO 对于在对象内的 func(){} 这种函数会有问题
            // TODO 这种函数和箭头函数一样没有prototype，不能作为构造函数使用。但是绑定this为对象，arguments也可以使用
            if (source.prototype) {
                return function (...args) {
                    // 如果只用这个会把箭头函数也变成普通函数
                    return source.apply(this, args)
                }
            } else {
                return (...args) => source.apply(undefined, args)
            }
        }
        if (typeof source !== 'object' || source === null) {
            return source
        }
        // ! 判断Date类型
        if (source instanceof Date) {
            return new Date(source - 0)
        }
        // ! 判断正则
        if (source instanceof RegExp) {
            return new RegExp(source.source, source.flags)
        }
        // ! 判断是否循环引用
        // 如果是对象的话就判断weakmap中是否有该对象，如果有则说明循环引用了，此时可以设置为其他值解除循环引用，或者直接返回本身
        if (weakmap.has(source)) {
            // 这边直接返回target，也就是自己
            return weakmap.get(obj)

            // 返回其他值解除引用
            // return null
        }
        const target = Array.isArray(source) ? [] : {}
        // 如果weakmap中没有该对象的话，就添加进去，值都指向targe，可以方便后续拿到
        weakmap.set(source, target)
        // 它返回一个数组，包含目标对象自身的所有属性键，包括string key和symbol key。
        Reflect.ownKeys(source).forEach(key => {
            target[key] = copy(source[key])
        })
        return target
    }

    return copy(source)
}

const heightKey = Symbol('height')
const obj = {
    name: 'parent'
}
const source = {
    name: 'hello',
    parent: obj,
    info: {
        age: 20,
        gender: 'male',
        birthday: new Date(),
        [Symbol('height')]: 175
    },
    setName: function (name) {
        console.log(name)
        this.name = name
    },
    getName() {
        console.log(this.name)
        return this.name
    },
    say: msg => {
        console.log('say:' + msg)
        console.log('this', this)
    }
}
obj.child = source

const deep = cloneDeep(source)

deep.setName('zhangs')
deep.getName()
```
