# 观察者模式

观察者模式（Observer Pattern） 是一种行为型设计模式，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。当主题对象的状态发生变化时，会自动通知所有的观察者。

以下是观察者模式的一些主要特点和组成部分：

**主题**（Subject）：被观察的对象，它维护了一系列观察者的列表，并提供方法来添加、删除和通知观察者。
**观察者**（Observer）：实现了特定接口的对象，当主题状态发生变化时，会接收到通知并进行相应的处理。

## 示例

```js
class Observer {
    constructor(name) {
        this.name = name
    }

    update() {
        console.log(`观察者${this.name}收到通知，执行相关操作...`)
    }
}

class Subject {
    observers = []

    addObserver(observer) {
        this.observers.push(observer)
    }

    notify() {
        for (const observer of this.observers) {
            observer.update()
        }
    }
}

const subject = new Subject()
const observer1 = new Observer('observer1')
const observer2 = new Observer('observer2')

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.notify()
```
