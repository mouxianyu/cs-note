function Dog(name, breed, master) {
    // 公有属性
    this.name = name
    // 公有属性
    this.breed = breed
    // 私有属性
    var _master = master

    var _this = this

    // 私有方法
    function _sleep() {
        console.log(`${_master} call ${_this.name} to sleep`)
    }

    // 公有方法
    Dog.prototype.bark = function () {
        console.log(`${this.name} bark!`)
    }

    // 1. 公有方法需要定义在里面，因为需要调用到私有方法，外部调用不到私有方法
    // 2. 因为公有方法需要实例创建后才能使用，所以不用担心Dog还没定义
    Dog.prototype.eat = function () {
        console.log(`${this.name} eat!`)
        _sleep()
    }
}

// 如果放在Dog内部的话，如果定义后马上调用会打印undefined，因为此时Dog还没定义完成，需要new一个实例后才能正常使用，所以静态方法定义在外部
// 静态属性
Dog.ANCESTOR = 'wolf'

// 静态属性
Dog.RANDOM_DOG = function () {
    return new Dog('random', 'random', 'random')
}

// Dog { name: 'random', breed: 'random' }
console.log(Dog.RANDOM_DOG())
// wolf
console.log(Dog.ANCESTOR)

const corgi = new Dog('xiaobai', 'corgi', 'master')

console.log(corgi)

// xiaobai
console.log(corgi.name)
// corig
console.log(corgi.breed)
// undefined
console.log(corgi.master)
// undefined
console.log(corgi.ANCESTOR)

// xiaobai bark!
corgi.bark()
// xiaobai eat!
corgi.eat()

// corgi._sleep is not a function
// corgi._sleep()
