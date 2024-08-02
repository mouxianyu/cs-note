// ! 导出对象
module.exports = {
    name: 'CommonJS',
    getName() {
        // ! this指代当前文件
        return this.name
    },
    getAge() {
        return this.age
    }
}

// ! 导出值
module.exports.age = 11

// ! 如果重复，靠后的内容会覆盖前面的内容
module.exports.name = 'Override Name'

module.exports.weight = '71kg'
