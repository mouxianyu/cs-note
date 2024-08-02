const name = 'ES Module'
const getName = function () {
    // ! this 为undefined
    return this.name
}

// ! export后面导出的为不同模块，不是当成一个对象，与export default不同
export {name, getName}
