// ! 原型式继承：创建一个对象，并制定一个现有的对象作为原型
let parent = {
    name: 'Parent',
    sayName: function () {
        console.log(this.name)
    }
}
// ! 原型式继承：将父对象作为子对象的原型，没有用到构造函数
let child = Object.create(parent)
child.name = 'Child'
child.sayName()
