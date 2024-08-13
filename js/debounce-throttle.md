# 防抖节流

-   防抖：等待一段时间没有操作后才开始执行
-   节流：一段时间内无论操作了多少次，只执行一次

## 防抖（Debouncing）

**定义**：事件触发后等待一段时间后开始执行，如果再次触发，则重新开始计时

### 应用场景

-   **搜索框输入**：紧在输入停止后一段时间发送请求，避免输入过程中频繁发送请求
-   **窗口调整**：窗口触发`resize` ，只在最后停止调整一段时间后执行相关操作
-   **提交按钮点击**：防止多次点击提交按钮，只执行最后一次点击的提交操作
-   **手机号邮箱输入验证**

### 实现

`lodash` 的 `debounce`

自己实现

```js
function debounce(func, wait) {
    let timeout
    return function (...args) {
        // 这里还是要把this，和args拿出来，因为如果直接使用setTimeout中使用this的话，
        // func可能是一个箭头函数，那么这样this指向就有误了
        const that = this
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(that, args)
        }, wait)
    }
}

// 使用
window.addEventListener(
    'resize',
    debounce(() => {
        console.log('窗口大小改变')
    }, 100)
)
```

## 节流（Throttling）

**定义**：在一段时间内只执行一次，不论事件触发了多少次

### 应用场景

-   **页面滚动**：限制滚动事件执行的频率，只在一段时间间隔内触发，避免频繁触发
-   **按钮点击**：对于可能被快速连续点击的按钮，确保在一定时间间隔内只执行一次相关操作。
-   **滚动加载，或者滚动到底部监听**

### 实现

`lodash` 的 `throttle`

自己实现

```js
function throttle(func, limit) {
    let timer = null
    return function (...args) {
        const that = this
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(that, args)
                timer = null
            }, limit)
        }
    }
}

window.addEventListener(
    'scroll',
    throttle(function () {
        console.log('滚动事件')
    }, 1000)
)
window.addEventListener('scroll', function () {
    // scroll 事件会立即出发一次
    console.log('scroll')
})
```
