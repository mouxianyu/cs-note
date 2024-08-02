// 手写一个Promise
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
