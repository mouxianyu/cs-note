## 作用

`call`、`apply`、`bind`作用是改变函数执行时的上下文，简而言之就是改变函数运行时的`this`指向

## 例子

### 数组方法的跨用

JavaScript 数组的方法如 `slice`、`forEach` 等，可以通过 `call` 或 `apply` 用在类数组对象上。

```js
const arrayLike = {
    0: 'Hello',
    1: 'World',
    length: 2
}

// 使用 call 将数组的 forEach 方法应用于类数组对象
Array.prototype.forEach.call(arrayLike, function (value, index) {
    console.log(index + ': ' + value)
})
```

## 区别

### call

`func.call(thisArg, arg1, arg2, ...)`
传递参数、立即执行

### apply

`func.apply(thisArg, [argsArray])`
传递数组参数、立即执行

### bind

`let boundFunc = func.bind(thisArg[, arg1[, arg2[, ...]]])`
传递参数、不立即执行而是返回一个函数

## 手写 bind

```js
Function.prototype.bind = function (ctx, ...args) {
    // 存储原来的函数
    const fn = this
    return function () {
        return fn.apply(ctx, args)
    }
}

const source = {
    name: 'source',
    say(msg1, msg2) {
        console.log(`${this.name} say: ${msg1} ${msg2}`)
    }
}

const dis = {
    name: 'dis'
}

source.say.bind(dis, 'hello', 'world')()
```
