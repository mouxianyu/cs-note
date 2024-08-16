const array = [1, 4, 32, 23, 3, 2]

// 跳出当次循环
array.forEach((item, index) => {
    if (index == 1) {
        // 这个return相当于continue
        return
    }
    console.log(item)
})

// 跳出整个循环
try {
    array.forEach((item, index) => {
        if (index == 1) {
            // 这个return相当于break
            throw new Error('跳出循环')
        }
        console.log(item)
    })
} catch (error) {
    console.log(error.message)
}
