// 自己版本
const getType2 = obj => {
    if (obj === undefined || obj === null) return typeof obj
    if (Number.isNaN(obj)) return 'nan'
    return Object.getPrototypeOf(obj).constructor.name.toLowerCase()
}

// 网络版本
const getType = obj => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

console.log(getType(false))
console.log(getType(Symbol('tt')))
console.log(getType(1n))
console.log(getType(NaN))
console.log(getType(null))
console.log(getType(undefined))
console.log(getType(11))
console.log(getType(/111/))
console.log(getType(new Date()))
console.log(getType(new Set()))
console.log(getType([]))
console.log(getType({}))
console.log(getType(() => {}))

class Parent {}
class Child extends Parent {}
console.log(getType(new Child()))
console.log(getType(new Parent()))
