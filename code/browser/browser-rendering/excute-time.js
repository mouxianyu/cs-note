function getTitleEl() {
    return document.querySelector('.title')
}

// 没有结果
console.log('在同步任务中执行', getTitleEl())

// 没有结果
Promise.resolve().then(() => {
    console.log('在微任务中执行', getTitleEl())
})

// Safari有结果，chrome没结果
setTimeout(() => {
    console.log('在宏任务中执行', getTitleEl())
}, 0)
