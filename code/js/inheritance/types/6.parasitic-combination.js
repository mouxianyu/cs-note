// ! 寄生组合继承：结合寄生式继承和组合式继承
function Parent(name) {
    this.name = name
}

Parent.prototype.getName = function () {
    console.log(this.name)
    return this.name
}

function Child(name, age) {
    // ! 借用构造函数
    Parent.call(this, name)
    this.age = age
}

// ! 原型链继承+原型式继承
// ! 原型链继承这边使用的是new Parent() ，这边换成 Object.create(proto)，即原型式继承
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// ! 原型式继承增强成寄生式继承
Child.prototype.getAge = function () {
    console.log(this.age)
    return this.age
}

var child = new Child('child', 11)
child.getName()
child.getAge()
