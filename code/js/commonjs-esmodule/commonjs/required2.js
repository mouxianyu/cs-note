// ! 可以省略module关键字
// ? exports 是 module.exports 的一个引用。你可以使用 exports 来添加属性或方法到模块的导出对象中。
// ? 但是，一旦你给 module.exports 赋值，exports 就不再指向原来的对象，而是指向了你新赋值的对象

// ! 以下不是赋值整个对象的话不会有问题
exports.gender = '沃尔玛塑料袋'
exports.name = 'CommonJS'
exports.friends = ['a', 'b']
module.exports.age = 10

// ! 如下赋值整个对象的话会有问题
// exports.gender = '沃尔玛塑料袋'
// exports.name = 'CommonJS'
// exports.friends = ['a', 'b']
// ? 只会保留下面部分
// module.exports = {
//     age: 10
// }

// ! 或者如下都会有问题
// exports = {
//     age: 0
// }
// ? 只会保留下面部分
// module.exports.name = 'CommonJS'
// ! 因为exports和module.exports是引用不同的对象

// ! 直接将 exports 赋值为一个对象（如你的例子所示）实际上会覆盖 module.exports 的引用，导致 exports 和 module.exports 指向不同的对象
// ! 不能使用下面这种方式
// * exports = {
// *     name: 'CommonJS',
// *     gender: '沃尔玛塑料袋',
// *     age: 2,
// *     friends: ['a']
// * }
