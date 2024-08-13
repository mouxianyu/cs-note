const throttle = (fn, wait) => {
    let timer
    let isFirstTime = true
    return function () {
        if (isFirstTime) {
            isFirstTime = false
            return
        }
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, wait)
    }
}

window.addEventListener(
    'scroll',
    throttle(function (e) {
        console.log(e.target)
        console.log(this)
    }, 1000)
)
