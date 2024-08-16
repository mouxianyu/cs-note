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
