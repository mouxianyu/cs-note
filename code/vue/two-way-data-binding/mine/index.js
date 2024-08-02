// Dep 类，用于管理订阅者
class Dep {
    constructor() {
        console.log('dep 构造函数')
        this.subscribers = []
    }

    addSub(watcher) {
        this.subscribers.push(watcher)
    }

    notify() {
        this.subscribers.forEach(watcher => watcher.update())
    }
}

// Watcher 类，当数据变动时，执行特定的更新函数
class Watcher {
    constructor(obj, key, callback) {
        console.log('watcher 构造函数')
        this.obj = obj
        this.key = key
        this.callback = callback
        this.value = this.get()
    }

    get() {
        Dep.target = this
        // 这边触发一个message的get方法，上行代码的赋值就能把watcher加入dep中
        console.log('触发message 的get方法前')
        let value = this.obj[this.key]
        console.log('触发message 的get方法后')
        Dep.target = null
        return value
    }

    update() {
        let newValue = this.obj[this.key]
        if (newValue !== this.value) {
            this.value = newValue
            this.callback(newValue)
        }
    }
}

// 劫持数据并实现双向绑定
function defineReactive(obj, key) {
    let value = obj[key]
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            console.log('触发message 的get方法')
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                value = newValue
                dep.notify()
            }
        }
    })
}

// 绑定函数
function bindData(obj, key, inputElement, textElement) {
    defineReactive(obj, key)

    const watcher = new Watcher(obj, key, function (value) {
        inputElement.value = value
        textElement.innerText = value
    })

    inputElement.addEventListener('input', function (event) {
        obj[key] = event.target.value
    })

    textElement.innerText = obj[key]
}

// 初始化
let appData = {message: 'Hello, world!'}
let inputElement = document.getElementById('input')
let textElement = document.getElementById('text')

bindData(appData, 'message', inputElement, textElement)
