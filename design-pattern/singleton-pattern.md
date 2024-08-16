# 单例模式

单例模式是一种常用的软件设计模式，它确保一个类只有一个实例，并提供一个全局访问点。这种模式在需要全局状态或者需要避免创建多个实例以节省资源时非常有用。

## 特点

-   单例类：一个类只允许创建一个实例对象。
-   全局访问点：提供一个全局访问点，可以访问这个唯一的实例。
-   延迟实例化：只有在第一次需要时才创建实例。

## ES5

```js
function Dog(name) {
    this.name = name

    Dog.prototype.bark = function () {
        console.log(this)
        console.log(`${this.name} bark!`)
    }
}

Dog.getInstance = function () {
    // this指代Dog类
    if (!this.instance) {
        console.log('创建单例')
        this.instance = new Dog('小白')
    }
    return this.instance
}

var instance1 = Dog.getInstance()
var instance2 = Dog.getInstance()

// true
console.log(instance1 === instance2)

// Dog { name: '小白' }
console.log(Dog.instance)

// undefined
console.log(new Dog().instance)
```

## ES6

```js
class Dog {
    static getInstance() {
        // 这边的this指代的是Dog类本身
        if (!this.instance) {
            this.instance = new Dog()
        }
        return this.instance
    }
}

// undefined
console.log(Dog.instance)

const instance1 = Dog.getInstance()
const instance2 = Dog.getInstance()

// Dog {}
console.log(Dog.instance)

// true
console.log(instance1 === instance2)
```
