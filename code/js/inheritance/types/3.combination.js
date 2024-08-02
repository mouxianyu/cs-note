// !组合继承：原型链继承+借用构造函数继承
function Parent(name) {
    if (name === undefined) {
        // 默认值
        this.name = 'default'
    } else {
        this.name = name
    }
}

Parent.prototype.say = function () {
    console.log('say: ' + this.name)
}

function Child(name, age) {
    // !借用构造函数继承
    Parent.call(this, name)
    this.age = age
}

// !原型链继承
Child.prototype = new Parent()

var child = new Child('tom', 11)
// Parent { name: 'tom', age: 11 }
console.log(child)
// say: tom
child.say()
