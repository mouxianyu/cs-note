// 注意：Node打印的信息不完整，需要放在浏览器中查看到更完整的信息
const myInstanceof = (obj, constructor) => {
    // Object.prototype.__proto__是null，也就是原型链最根部了
    if (obj === null) return false
    // 如果不是对象也不是函数
    if (typeof obj !== 'function' && typeof obj !== 'object') return false
    let proto = Object.getPrototypeOf(obj)
    while (proto !== null) {
        if (proto === constructor.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

// true
console.log(myInstanceof(function () {}, Function))
// true
console.log(function () {} instanceof Function)
// true
console.log(myInstanceof([], Array))
// true
console.log(myInstanceof(() => 0, Function))
// true
console.log(myInstanceof(() => 0, Function))
// false
console.log(myInstanceof(() => 0, Number))

class Parent {}
class Child extends Parent {}

class Name {}
class FirstName extends Name {}

const myName = new Name()
const myChild = new Child()

// true
console.log(myInstanceof(myName, Name))
// true
console.log(myInstanceof(myName, FirstName))

// true
console.log(myInstanceof(myChild, Child))
// true
console.log(myInstanceof(myChild, Parent))
