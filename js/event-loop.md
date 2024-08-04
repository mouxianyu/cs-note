# 事件循环

JavaScript 是一种单线程语言，这意味着它一次只能执行一个任务。然而，JavaScript 能够处理异步操作，比如网络请求、定时事件等，而不会导致程序挂起。这得益于 JavaScript 的事件循环机制。

事件循环（Event Loop）是 JavaScript 运行时的一个核心概念，它允许 JavaScript 引擎在单线程环境中执行异步操作。

事件循环的机制使得 JavaScript 能够以**非阻塞的方式处理大量任务**，包括**同步和异步任务**。这种机制是 JavaScript 能够实现**高性能和高响应性**的关键因素之一。

## 基本概念

### 执行栈（Call Stack）

这是 JavaScript 执行代码的地方。当 JavaScript 执行代码时，所有同步任务都会添加到这个栈中。

### 事件队列（Event Queue）

当异步任务完成时，它们会被放入一个或多个事件队列中。每个队列可能代表不同类型的事件，比如网络请求、定时器、用户交互等。

**事件队列分为宏任务队列（Macro Task Queue）和微任务队列（Micro Task Queue）**
**微任务优先级比宏任务高，微任务先执行**

#### 宏任务队列（Macro Task Queue）

宏任务队列包含了一些**需要较长时间执行**的任务，它们通常不会立即执行，而是在当前执行栈清空后按顺序执行。
常见的**宏任务**包括：

-   `setTimeout`  和  `setInterval`  定时器
-   I/O 操作
    -   网络请求：如 XMLHttpRequest 发起的 HTTP 请求
    -   文件读取/写入：通过 FileReader API，可以读取本地文件系统中的文件内容
    -   与服务器的通信：包括数据的上传和下载等。
-   UI 渲染
-   `requestAnimationFrame`  用于动画和页面渲染（其回调函数会在浏览器下一次重绘前执行）

#### 微任务队列（Micro Task Queue）

微任务队列包含了一些**需要尽快执行**的任务，它们会在当前执行栈清空以及当前宏任务完成后立即执行。
常见的**微任务**包括：

-   Promise 回调的回调函数（then、catch、finally）
-   `MutationObserver`  回调，用于监听 DOM 变动
-   `queueMicrotask()` API，可以用来延迟执行一些小的、非阻塞的任务

## 事件循环过程

同一层级下优先级：同步任务>微任务>宏任务

-   首先执行整体代码（整体看成一个宏任务）,其中包含同步任务、微任务、宏任务（它们里面可能还嵌套着同步任务、微任务、宏任务，这里先看成一个整体）
    -   同步任务直接执行
    -   微任务加入微任务队列，宏任务加入宏任务队列
-   同步任务执行完后执行微任务
-   微任务执行完后执行宏任务
-   微任务、宏任务里面可能还嵌套其他的同步任务、微任务、宏任务。内部的执行顺序也是按照：同步任务>微任务>宏任务 这样的顺序来执行的

```js
console.log('Start of script')

setTimeout(() => {
    console.log('This is a macro task')
    // 假设在这个宏任务中，又触发了一个微任务
    Promise.resolve().then(() => {
        console.log('This inner micro task')
    })
}, 0)

// 这个微任务会在第一个宏任务执行完毕后执行
Promise.resolve().then(() => {
    console.log('This is a micro task')
})

console.log('End of script')

// 打印结果
// Start of script
// End of script
// This is a micro task
// This is a macro task
// This inner micro task
```

## 为什么微任务优先级高于宏任务

宏任务如 setTimeout、I/O、UI 渲染 等通常都需要更长的时间来完成，如果宏任务优先执行会造成阻塞。
