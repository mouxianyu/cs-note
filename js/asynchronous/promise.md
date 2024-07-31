# Promise

## 手写 Promise

```js
const STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}
class MyPromise {
    #value
    #status = STATUS.PENDING
    #onFulFilledHandlers = []
    #onRejectedHandlers = []

    constructor(executor) {
        const resolve = value => {
            if (this.#status === STATUS.PENDING) {
                this.#value = value
                this.#status = STATUS.FULFILLED
                // 运行所有fulfilled的回调函数
                this.#onFulFilledHandlers.forEach(fn => fn())
            }
        }
        const reject = value => {
            if (this.#status === STATUS.PENDING) {
                this.#value = value
                this.#status = STATUS.REJECTED
                this.#onRejectedHandlers.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then = (onFulfilled, onRejected) => {
        // promise支持链式，所以返回一个新的Promise
        return new MyPromise((resolve, reject) => {
            // 当状态为fulfilled
            if (this.#status === STATUS.FULFILLED) {
                // 如果没有对应的回调函数，直接传递结果
                if (!onFulfilled) {
                    resolve(this.#value)
                } else if (typeof onFulfilled === 'function') {
                    try {
                        // 如果有对应的回调函数，回调函数计算的结果
                        resolve(onFulfilled(this.#value))
                    } catch (error) {
                        // 捕获onFulfilled中抛出的衣长
                        reject(error)
                    }
                }
            }
            // 当状态为rejected
            if (this.#status === STATUS.REJECTED) {
                // 如果没有对应的回调函数，直接传递结果
                if (!onRejected) {
                    reject(this.#value)
                } else if (typeof onRejected === 'function') {
                    try {
                        resolve(onRejected(this.#value))
                    } catch (error) {
                        reject(error)
                    }
                }
            }
            // 通常会走这个路线，因为通常是异步，需要一个等待时间
            // 当状态为pending，需要把回调放入数组等待执行
            if (this.#status === STATUS.PENDING) {
                if (!onFulfilled) {
                    this.#onFulFilledHandlers.push(() => {
                        resolve(this.#value)
                    })
                } else if (typeof onFulfilled === 'function') {
                    this.#onFulFilledHandlers.push(() => {
                        try {
                            resolve(onFulfilled(this.#value))
                        } catch (error) {
                            reject(error)
                        }
                    })
                }
                if (!onRejected) {
                    this.#onRejectedHandlers.push(() => {
                        reject(this.#value)
                    })
                } else if (typeof onRejected === 'function') {
                    this.#onRejectedHandlers.push(() => {
                        try {
                            resolve(onRejected(this.#value))
                        } catch (error) {
                            reject(error)
                        }
                    })
                }
            }
        })
    }

    catch = onRejected => {
        return this.then(null, onRejected)
    }
}

const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('结果')
    }, 1000)
})

myPromise
    .then(
        res => {
            console.log('then', res)
            return res
        },
        err => {
            console.error('then', err)
            return err
        }
    )
    .then(
        res => {
            console.log('then2', res)
            throw new Error('new error')
        },
        err => {
            console.error('then2', err)
            return err
        }
    )
    .catch(err => {
        console.error('catch', err.toString())
    })
```

## Promise 函数

### Promise.all

Promise.all 如果其中一个被拒绝就会立即停止

#### 手写 Promise.all

```js
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
```

### Promise.allSettled

Promise.allSettled 会返回所有的结果和状态，不管是否被拒绝

### Promise.race

Promise.race 只返回最快执行完成的 Promise 的结果

### Promise.resolve

`Promise.resolve` 是 JavaScript 中的一个静态方法，它用于将一个值、另一个 Promise 对象或者一个 Thenable（即具有`then`方法的对象）包装成一个 Promise 对象
