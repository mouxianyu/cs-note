const eat = () => {
    console.log(this.name, ' eat')
}

function sleep() {
    console.log(this.name, ' sleep')
}

const get = () => {
    return this
}

class Dog {
    static classSelf() {
        return this
    }
    name
    color
    age
    constructor(name) {
        this.name = name
    }
    bark() {
        console.log(this.name + ': 汪汪～')
    }
    dogEat = eat
    dogSleep = sleep
    self = get
}

const husky = new Dog('husky')
const corgi = new Dog('corgi')

// husky: 汪汪～
corgi.bark.call(husky)

// undefined eat
husky.dogEat()

// husky sleep
husky.dogSleep()

// true
console.log(husky.self() === corgi.self())

// true
console.log(husky.self() === this)

// [class Dog]
console.log(Dog.classSelf())

const cat = {
    name: 'cat',
    self: () => {
        console.log(this)
    },
    self2: function () {
        console.log(this)
    },
    self3() {
        console.log(this)
    },
    self4() {
        return () => {
            console.log('self4')
            console.log(this)
        }
    }
}
const outsideSelf = cat.self2
// window
cat.self()
// cat对象
cat.self2()
// cat对象
cat.self3()
// window
outsideSelf()
// cat对象
cat.self4()()

const outsideSelf2 = cat.self4()

// cat对象
outsideSelf2()
