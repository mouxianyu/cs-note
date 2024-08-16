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
