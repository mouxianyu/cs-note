// !原型链继承：父类的实例作为子类的原型
function Parent(name) {
    if (name === undefined) {
        this.name = 'Parent'
    } else {
        this.name = name
    }
}
Parent.prototype.sayHello = function () {
    console.log('Hello from ' + this.name)
}

function Child() {
    // 没有特别的操作
}

var parent = new Parent()
// !原型链继承
Child.prototype = parent
Child.prototype.constructor = Child

var child = new Child()
// !输出: Hello from undefined , 因为没有执行父类的构造函数
child.sayHello()

// !父类属性发生变化
parent.name = 'new Parent'
// !子类实例都发生变化
// 输出:Hello from new Parent
child.sayHello()

console.log('Parent', Parent)
console.log('Child', Child)
