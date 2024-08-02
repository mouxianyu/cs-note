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
