## MVVM
Vue的双向绑定由三个部分组成，也就是MVVM
- 模型（Model）
- 视图（View）
- 视图模型（ViewModel）
双向绑定就在ViewModel，当`Model`数据被更新了，`View`也跟着更新；当用户操作界面，如填写表单之类的，`View`发生更新，`Model`也跟着更新，这就是双向绑定。

ViewModel有两个重要组成部分
- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描和解析，根据指令模版替换数据，以及绑定相应的更新函数
## 双向绑定原理
Vue中的双向绑定是通过数据劫持（Object.defineProperty）和发布-订阅模式实现的。
1. **数据劫持（Object.defineProperty）：** Vue会对数据对象进行递归遍历，通过 Object.defineProperty() 方法为每个属性添加 getter 和 setter。当访问或修改属性时，会触发对应的 getter 和 setter 方法，从而实现对属性的拦截和监控。
2. **发布-订阅模式：** Vue利用观察者模式实现了一个简单的发布-订阅系统。当数据发生变化时，会触发对应属性的 setter 方法，setter 方法会**通知订阅该属性的所有观察者对象进行更新**，从而实现视图的自动更新。


简单实现如下：
```html
  <div id="app">
    <input id="input"
           type="text">
    <p id="text"></p>
  </div>
```

```javascript
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

```


--- 
## 参考
https://juejin.cn/post/6844903479044112391#heading-6
