// !借用构造函数继承：子类构造函数借用父类构造函数
function Parent(name) {
    this.name = name
}

Parent.prototype.say = function () {
    console.log('say: ' + this.name)
}

function Child(name, age) {
    // !借用父类构造函数
    Parent.call(this, name) // 调用Parent的构造函数
    this.age = age
}

var child = new Child('Alice', 10)
// * 输出：Alice
console.log(child.name)
// * 报错，因为不能继承方法
child.say()
