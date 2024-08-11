class Parent {
    static age
}

class Child extends Parent {
    // 新创建了一个静态属性，和父类不共享
    static age
}

Parent.age = 20
// 打印：undefined
console.log(Child.age)

class Fruit {
    static sweet = 10
    static growUp() {}
    eat() {}
}

class Apple extends Fruit {
    eat(val) {
        return val
    }
}

// 打印 10
console.log('Apple.sweet', Apple.sweet)
// 打印 true
console.log(Apple.growUp === Fruit.growUp)
