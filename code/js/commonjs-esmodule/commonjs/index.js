// ! 导入是整个文件导入，编译的时候也无法按照调用关系编译部分内容，而是整个文件都会编译
const data = require('./required.js')

// ! 不会重新加载，第一次调用的时候会缓存结果，再次调用直接返回缓存结果
const data2 = require('./required.js')

data.age = 99

// ! data2.age会变成99，data和data2是引用同一个缓存对象
console.log(data2.age)

console.log(data)

// ! true，exports 是 module.exports 的一个引用
console.log(exports === module.exports)

// ! commonjs可以动态导入
const paths = ['./required.js', './required2.js']
for (const path of paths) {
    require(path)
}

// ! 这边的{}是代表解构赋值，与import的{}含义不同
let {gender, name, friends} = require('./required2.js')
// ! 解构赋值相当于下面代码
// * const data= require('./required2.js')
// * let gender=data.gender
// * let name=data.name
// * let friends=data.friends

const data3 = require('./required2.js')

console.log('data3', data3)

console.log(gender)
console.log(name)

gender = '男'
friends.push('c')

// ! 因为friends还是引用的相同的地址，所以这边friends会发生变化。gender是值类型不会发生变化
console.log(data3)
