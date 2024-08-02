// ! 寄生式继承：在原型式继承的基础上，在函数内部进一步增强对象，为其添加额外的属性或方法
let parent = {
    name: 'Parent',
    friends: ['p1', 'p2', 'p3'],
    getName: function () {
        return this.name
    }
}

function clone(original) {
    // !原型式继承
    let clone = Object.create(original)
    // !增强
    clone.getFriends = function () {
        return this.friends
    }
    return clone
}

let person = clone(parent)
console.log(person.getName())
console.log(person.getFriends())
