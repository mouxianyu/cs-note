// ! ES6类继承：通过class定义类，extends关键字继承，子类中使用super()调用父类构造函数
class Parent {
    name = 'Parent'
    constructor(name) {
        this.name ??= name
    }
}

class Child extends Parent {
    age = 0
    constructor(name, age) {
        super(name)
        this.age ??= age
    }
}
const parent = new Parent()
console.log(parent)
const child = new Child()
console.log(child)
