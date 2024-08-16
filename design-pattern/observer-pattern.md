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

## 发布订阅模式与观察者模式

**观察者**是经典软件**设计模式**中的一种，但**发布订阅**只是软件架构中的一种**消息范式**

-   **观察者模式**本身只需要**2 个**角色便可成型，即**观察者**和**被观察者**，其中被观察者是重点。
-   **发布订阅**需要至少**3 个**角色来组成，包括**发布者**、**订阅者**和**发布订阅中心**，其中发布订阅中心是重点
