// ! Object.create(xxx) 是以xxx为原型创造对象
// ! Object.create(obj) 以obj对象为原型创建对象
// ! Object.create(XXX.prototype) 以XXX的原型创建对象，但是不执行XXX的构造函数
// ! new XXX() 创建XXX的实例，执行构造函数

// ! 默认的prototype为Object
let parent = {
    name: 'parent',
    friends: ['a', 'b', 'c'],
    getName() {
        console.log(this.name)
        return this.name
    },
    getFriends() {
        console.log(this.friends.join(','))
        return this.friends.join(',')
    }
}

let c1 = Object.create(parent)
c1.name = c1

function Parent(name, friends) {
    if (this.name === undefined) {
        this.name = 'Parent'
    } else {
        this.name = name
    }
    if (this.friends === undefined) {
        this.friends = []
    } else {
        this.friends = friends
    }
}

Parent.prototype.getName = function () {
    console.log(this.name)
    return this.name
}

Parent.prototype.getFriends = function () {
    console.log(this.friends.join(','))
    return this.friends.join(',')
}

let c2 = Object.create(Parent.prototype)

let c3 = new Parent()

console.log('c1', c1)
console.log('c2', c2)
console.log('c3', c3)

// [[prototype]]
console.log('[[prototype]]')
console.log('c1', Object.getPrototypeOf(c1))
console.log('c2', Object.getPrototypeOf(c2))
console.log('c3', Object.getPrototypeOf(c3))
