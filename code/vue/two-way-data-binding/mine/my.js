// 订阅者
class Subscriber {
    // 监听的对象
    obj

    // 监听的key
    key

    // 在订阅内容更新的时候触发回调
    callback

    constructor(obj, key, callback) {
        this.obj = obj
        this.key = key
        this.callback = callback
        // 这边是为了触发reactive的get，来把subscriber加入publisher中
        Publisher.target = this
        // 触发一次obj[key]的get函数
        obj[key]
        Publisher.target = null
    }

    // 订阅者接收通知
    notified() {
        const value = this.obj[this.key]
        this.callback(value)
    }
}
// 发布者
class Publisher {
    subscribers
    constructor() {
        this.subscribers = []
    }
    addSubscriber(subscriber) {
        this.subscribers.push(subscriber)
    }

    notifyAllSubscribers() {
        this.subscribers.forEach(subscriber => subscriber.notified())
    }
}
function defineReactive(obj, key) {
    let value = obj[key]
    const publisher = new Publisher()
    Object.defineProperty(obj, key, {
        get() {
            console.log('get: ' + value)
            if (Publisher.target) {
                publisher.addSubscriber(Publisher.target)
            }
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                console.log('set: ' + newValue)
                value = newValue
                // 当值发生改变的时候，通知所有订阅者去更新视图
                publisher.notifyAllSubscribers()
            }
        }
    })
}
class TwoWayBind {
    data
    el
    constructor(data, el) {
        this.data = data
        this.el = el
        const _this = this
        for (const key in this.data) {
            defineReactive(data, key)
            // subscriber实例创建的时候要让他自动加入publisher
            const subscriber = new Subscriber(this.data, key, function (value) {
                _this.el.value = value
                document.getElementById('text').innerText = value
            })
            // 用初始化数据更新视图
            subscriber.notified()
        }
    }
    get() {
        return this.data
    }
}
const el = document.getElementById('input')
const appData = {message: 'hello world'}
const twoWayBind = new TwoWayBind(appData, el)

console.log(twoWayBind.message)
// 视图变化更新数据
el.addEventListener('input', function (event) {
    appData.message = event.target.value
})

setTimeout(() => {
    twoWayBind.data.message = '你好世界'
}, 2000)
