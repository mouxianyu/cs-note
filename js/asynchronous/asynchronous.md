# 异步实现

## 1. 回调（callback）

```js
function asyncFun(callback) {
    console.log('异步操作开始')
    setTimeout(() => {
        const result = '操作完成'
        callback(result)
    }, 3000)
}

asyncFun(function (result) {
    console.log('异步操作结果：' + result)
})
```

### 优点

-   实现简单，比较灵活

### 缺点

-   多个嵌套的回调函数可能导致代码难以阅读和维护，这种情况被称为“回调地狱”（Callback Hell）
-   错误处理：回调函数中的错误处理可能比较复杂，需要在每个回调中都进行错误检查。

## 2. Promise

Promise 是 JavaScript 中用于异步编程的一种对象。它代表了一个可能还不可用的值，或者一个在未来某个时间点才可用的最终结果。Promise 的设计旨在**解决回调函数的一些问题，如回调地狱**，并提供了一种更清晰、更易于管理的方式来处理异步操作。

### 三种状态

-   **Pending（等待）**：初始状态，既不是成功也不是失败。
-   **Fulfilled（已成功）**：操作成功完成，并且有结果值。
-   **Rejected（已失败）**：操作失败，并且有失败的原因。

### 构造函数

创建 Promise 对象时，需要提供一个执行器函数（executor function），它将在 Promise 构造时立即执行。

```js
const myPromise = new Promise((resolve, reject) => {
    // 异步操作
})
```

### 执行函数

执行器函数接受两个参数，`resolve` 和 `reject`：

-   `resolve(value)`：当异步操作成功时调用，将 Promise 状态变为 Fulfilled，并返回结果值。
-   `reject(reason)`：当异步操作失败时调用，将 Promise 状态变为 Rejected，并返回失败原因。

### 链式调用

Promise 支持链式调用，使用 `.then()` 和 `.catch()` 方法：

-   `.then()`：在 Promise 成功时调用，可以接收一个处理结果的函数。
-   `.catch()`：在 Promise 失败时调用，可以接收一个处理错误原因的函数。

![Promise](js/asynchronous/promise.md)

## 3. Generator

在 JavaScript 中，`generator` 是一种特殊的函数，它允许你控制函数的执行流程，使其在执行过程中可以暂停和恢复。使用 `generator` 可以创建一个迭代器，这个迭代器可以逐步地产生一系列的值。

`generator` 函数使用 `function*` 声明，并且在函数体中使用 `yield` 表达式来产生值。每次调用 `generator` 函数时，它会返回一个 `iterator` 对象，你可以使用 `next()` 方法来获取下一个值，并且 `generator` 函数会在 `yield` 表达式处暂停执行。

```js
function* generatorFun() {
    yield 1
    yield 2
    yield 3
}

// 返回一个iterator
const myIterator = generatorFun()

console.log(myIterator.next()) //{ value: 1, done: false }
console.log(myIterator.next()) //{ value: 2, done: false }
console.log(myIterator.next()) //{ value: 3, done: false }
console.log(myIterator.next()) //{ value: undefined, done: true }
console.log(myIterator.next()) //{ value: undefined, done: true }

let num = 0
for (const iterator of generatorFun()) {
    num += iterator
}
console.log(num) // 6
```

## 4. Async/Await

![](js/asynchronous/async-await.md)

## 5. 观察者模式（Observer pattern）

观察者模式通常需要手动实现或使用某些库来辅助。这里是一个简单的手动实现：

```js
class Subject {
    constructor() {
        this.observers = []
    }

    addObserver(observer) {
        this.observers.push(observer)
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data))
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }

    update(data) {
        console.log(`${this.name} received data: ${data}`)
    }
}

const subject = new Subject()
const observer1 = new Observer('Observer 1')
const observer2 = new Observer('Observer 2')

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.notify('Async event occurred')
```

## 6. 事件监听（Event Listeners）

在浏览器中，事件监听器用于响应用户操作等事件：

```js
document.addEventListener('click', function (event) {
    console.log('Document clicked!')
})

// 模拟点击事件
// 在真实环境中，这将由用户点击触发
document.dispatchEvent(new Event('click'))
```

## 7. RxJS 和其他响应式编程库

RxJS 是一个流行的响应式编程库，使用 Observables 处理异步事件：

```js
import {fromEvent} from 'rxjs'
import {debounceTime, map} from 'rxjs/operators'

const inputElement = document.querySelector('#myInput')
const observable = fromEvent(inputElement, 'keyup')

observable
    .pipe(
        debounceTime(300), // 300ms内连续按键只触发一次
        map(event => event.target.value) // 映射事件为输入框的值
    )
    .subscribe({
        next: value => console.log(`Typed: ${value}`),
        error: err => console.error('Error:', err),
        complete: () => console.log('Completed')
    })
```

## 8. Worker 线程

在浏览器中使用 Web Workers 进行异步操作：

```js
// 创建一个新的 Web Worker
const worker = new Worker('worker.js')

// 监听来自 Worker 的消息
worker.addEventListener('message', function (event) {
    console.log('Message from worker:', event.data)
})

// 发送消息给 Worker
worker.postMessage('Hello from main thread')

// worker.js 文件内容
self.addEventListener('message', function (event) {
    console.log('Message from main thread:', event.data)
    self.postMessage('Hello from worker')
})
```

## 9. Timers

使用 `setTimeout` 和 `setInterval` 实现定时任务：

```js
// 延迟执行
setTimeout(() => {
    console.log('This message is shown after 2 seconds.')
}, 2000)

// 定时执行
setInterval(() => {
    console.log('This message is shown every 3 seconds.')
}, 3000)

// 如果需要停止定时器
const intervalId = setInterval(() => {
    console.log('This is an interval timer.')
    // 停止定时器
    clearInterval(intervalId)
}, 1000)
```

Web Workers 在浏览器环境中可用，而事件监听和 RxJS 通常也用于浏览器，但在 Node.js 中可能需要不同的实现方式
