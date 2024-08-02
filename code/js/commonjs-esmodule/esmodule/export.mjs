export const name = 'ES Module'

export const getName = function () {
    // ! 不支持，this为undefined
    return this.name
}

// ! 整个导入那么this就有指代真个导入的对象
// * import * as data from './export.mjs'
// * console.log(data.name)
// * console.log(data.getName())
