const data = require('./required3.js')
let {age, groupUp} = data

console.log(age)
groupUp()
// ! age没有发生变化
console.log(age)
// ! data.age也没有发生变化
console.log(data.age)

data.groupUp()
// ! age没有发生变化
console.log(age)
// ! data.age发生变化
console.log(data.age)
