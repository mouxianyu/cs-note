function throttle(func, limit) {
    let inThrottle
    return function (...args) {
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// 使用
window.addEventListener(
    'scroll',
    throttle(function () {
        console.log('滚动事件')
    }, 1000)
)
