# proxy

**Proxy**（ES6 新增）  对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

## 语法

```js
const p = new Proxy(target, handler)
```

[`target`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#target_2)

要使用  `Proxy`  包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

[`handler`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#handler_2)

一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理的行为。

## 示例

### 基础示例

```js
const handler = {
    get: function (obj, prop) {
        return prop in obj ? obj[prop] : 37
    }
}

const p = new Proxy({}, handler)
p.a = 1
p.b = undefined

console.log(p.a, p.b) // 1, undefined
console.log('c' in p, p.c) // false, 37
```

### 验证

```js
let validator = {
    set: function (obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer')
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid')
            }
        }

        // The default behavior to store the value
        obj[prop] = value

        // 表示成功
        return true
    }
}

let person = new Proxy({}, validator)

person.age = 100

console.log(person.age)
// 100

person.age = 'young'
// 抛出异常：Uncaught TypeError: The age is not an integer

person.age = 300
// 抛出异常：Uncaught RangeError: The age seems invalid
```

### 拓展构造函数

```js
function extend(sup, base) {
    var descriptor = Object.getOwnPropertyDescriptor(base.prototype, 'constructor')
    base.prototype = Object.create(sup.prototype)
    var handler = {
        construct: function (target, args) {
            var obj = Object.create(base.prototype)
            this.apply(target, obj, args)
            return obj
        },
        apply: function (target, that, args) {
            sup.apply(that, args)
            base.apply(that, args)
        }
    }
    var proxy = new Proxy(base, handler)
    descriptor.value = proxy
    Object.defineProperty(base.prototype, 'constructor', descriptor)
    return proxy
}

var Person = function (name) {
    this.name = name
}

var Boy = extend(Person, function (name, age) {
    this.age = age
})

Boy.prototype.sex = 'M'

var Peter = new Boy('Peter', 13)
console.log(Peter.sex) // "M"
console.log(Peter.name) // "Peter"
console.log(Peter.age) // 13
```

### 操作 DOM 节点

```js
let view = new Proxy(
    {
        selected: null
    },
    {
        set: function (obj, prop, newval) {
            let oldval = obj[prop]

            if (prop === 'selected') {
                if (oldval) {
                    oldval.setAttribute('aria-selected', 'false')
                }
                if (newval) {
                    newval.setAttribute('aria-selected', 'true')
                }
            }

            // 默认行为是存储被传入 setter 函数的属性值
            obj[prop] = newval

            // 表示操作成功
            return true
        }
    }
)

let i1 = (view.selected = document.getElementById('item-1'))
console.log(i1.getAttribute('aria-selected')) // 'true'

let i2 = (view.selected = document.getElementById('item-2'))
console.log(i1.getAttribute('aria-selected')) // 'false'
console.log(i2.getAttribute('aria-selected')) // 'true'
```

## Proxy vs Object.defineProperty()

### 优点

-   **监听对象更全面**：`Proxy`可以直接监听整个对象，而不仅仅是对象的属性。这意味着可以拦截对象的各种操作，如属性访问、赋值、删除、函数调用等。而`Object.defineProperty`**只能劫持对象的属性**，因此需要对每个对象的每个属性进行遍历，如果属性值是对象，还需要深度遍历。
-   **支持数组**：`Proxy`不需要对数组的方法进行重载，省去了众多`hack`，减少代码量等于减少了维护成本，而且标准的就是最好的。`Object.defineProperty`对数组的监听存在一定的局限性，需要通过特定的方式来处理数组的变化。
-   **提供更多拦截方法**：`Proxy`提供了多达 13 种拦截方法，如`apply`、`ownKeys`、`deleteProperty`、`has`等，这些方法提供了更细粒度的控制和更多的灵活性。而`Object.defineProperty`的拦截方法相对较少。
-   **性能更好**：`Proxy`的性能通常比`Object.defineProperty`更好，特别是在处理大型对象或频繁的属性访问时。`Object.defineProperty`在初始化时需要遍历对象的所有属性，而`Proxy`可以在需要时才进行拦截和处理。
-   **可直接操作新对象**：`Proxy`返回的是一个新对象，可以只操作新的对象达到目的，而`Object.defineProperty`只能遍历对象属性直接修改。

### 缺点

-   **浏览器兼容性**：`Proxy`是 ES6 中新增的特性，存在浏览器兼容性问题，而且无法用`polyfill`磨平。而`Object.defineProperty`的兼容性更好，支持 IE9 及以上浏览器。

> babel 无法转化 Proxy 到 ES5，现在没有完全兼容的 Polyfill，即使用了 Polyfill 也不能保证在所有地方完全响应。
>
> 因此 Vue3 使用 Proxy，所以无法完全兼容旧浏览器
