// 主题类（被观察的对象）
// 被观察的对象是数据，Vue中将主题和数据联系起来，整体可以看成一个被观察者
class Subject {
    observers = []

    // 添加观察者
    addObserver(observer) {
        this.observers.push(observer)
    }

    //  通知观察者
    notifyObservers() {
        this.observers.forEach(observer => observer.update())
    }
}

// 观察者，观察某个数据，在数据发生变化的时候进行更新
// 创建数据绑定的时候创建
class Observer {
    // 观察的对象
    obj
    // 观察的key
    key
    // 对象key的值
    val
    // 触发的更新
    callback

    constructor(obj, key, callback) {
        this.obj = obj
        this.key = key
        this.callback = callback
        Subject.target = this
        // 触发一个obj[key] 的get，将当前observer加入subject
        this.val = obj[key]
        Subject.target = null
    }

    update() {
        // 收到通知并更新,这边可以对DOM进行更新
        const newVal = this.obj[this.key]
        console.log(this.key + '数据更新为: ' + newVal)
        this.callback(newVal)
    }
}

// 将对象的某个key设置为响应式
function setKeyReactive(obj, key, callback) {
    // val和subject都一直存储在这边了
    let val = obj[key]
    const subject = new Subject()
    Object.defineProperty(obj, key, {
        get() {
            console.log('get')
            if (Subject.target) {
                subject.addObserver(Subject.target)
            }
            return val
        },
        set(newVal) {
            val = newVal
            console.log('set')
            subject.notifyObservers()
        }
    })
    // 创建观察者的时候会调用构造函数，里面有对obj[key]的使用，会触发一个get
    // 这边只放了一个观察者，当然，实际上会不止一个
    new Observer(obj, key, callback)
}

class Vue {
    data
    constructor(options) {
        this.data = options.data
        for (const key in this.data) {
            setKeyReactive(this.data, key, function (val) {
                // 这边放具体怎么更新
                console.log(key + '视图更新为：' + val)
            })
        }
    }
}

const vue = new Vue({
    data: {name: 'mouxianyu', age: 26}
})

vue.data.name = 'nihao'

console.log(vue.data)
