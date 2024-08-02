// 参考
function debounce(func, wait) {
    let timeout
    return function () {
        const context = this,
            args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}

// 使用
window.addEventListener(
    'resize',
    debounce(function () {
        console.log('窗口大小改变')
    }, 250)
)
