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
