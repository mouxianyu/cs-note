function* generatorFun() {
    yield 1
    yield 2
    yield 3
}

// 返回一个iterator
const myIterator = generatorFun()

console.log(myIterator.next()) //{ value: 1, done: false }
console.log(myIterator.next()) //{ value: 2, done: false }
console.log(myIterator.next()) //{ value: 3, done: false }
console.log(myIterator.next()) //{ value: undefined, done: true }
console.log(myIterator.next()) //{ value: undefined, done: true }

let num = 0
for (const iterator of generatorFun()) {
    num += iterator
}
console.log(num) // 6
