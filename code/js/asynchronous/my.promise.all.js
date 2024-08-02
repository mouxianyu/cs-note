const promiseAll = iterable => {
    return new Promise((resolve, reject) => {
        const promises = Array.from(iterable)

        const result = []

        let count = 0

        for (let i = 0; i < promises.length; i++) {
            // Promise.resolve 将promises[i] 包装成promise对象，因为promise[i] 可能是一个值或其他对象
            Promise.resolve(promises[i])
                .then(res => {
                    // 这里不用push的原因是Promise得到结果不一定是按照顺序的，这边用索引来赋值可以维持原本的顺序
                    result[i] = res
                    count++
                    if (count === promises.length) {
                        resolve(result)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        }
    })
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1')
    }, 100)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2')
    }, 100)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3')
    }, 2000)
})

const p4 = 'p4'
const promises = [p1, p2, p3, p4]

const start = new Date().getTime()
promiseAll(promises)
    .then(values => {
        console.log(values)
        console.warn('then time:' + (new Date().getTime() - start))
    })
    .catch(err => {
        console.error(err)
        console.warn('catch time:' + (new Date().getTime() - start))
    })
    .finally(() => {
        console.warn('finally time:' + (new Date().getTime() - start))
    })
