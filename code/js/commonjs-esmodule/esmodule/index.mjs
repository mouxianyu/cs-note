// ! import只能在模块顶层声明使用，不能动态导入
import * as data from './export5.mjs'
console.log(data.default)
console.log(data.name)
