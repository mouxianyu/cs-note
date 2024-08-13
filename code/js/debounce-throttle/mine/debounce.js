const debounce = (fun, wait) => {
    let timer
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fun.apply(this, arguments)
        }, wait)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const inputEl = document.getElementById('input')
    inputEl.addEventListener(
        'input',
        debounce(function (e) {
            console.log(e.target.value)
            console.log(this)
        }, 500)
    )
})
