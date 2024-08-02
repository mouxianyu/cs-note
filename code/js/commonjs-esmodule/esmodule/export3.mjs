const name = 'ES Module'
const getName = function () {
    return this.name
}

// ! export default 后面导出的内容为整个对象，所以不能用 import {name,getName} from xxx 导入，得用 import data from xxx
export default {
    name,
    getName
}
