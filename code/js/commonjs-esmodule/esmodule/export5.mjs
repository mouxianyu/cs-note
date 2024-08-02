// ! export 和 export default可以混合使用
// ! import {name} form xxx 导出 export 即name
// ! import data from xxx 导出 export default 即0
export const name = 'ES Module'
const age = 0
export default age

// ! 下面两种方式可以一起使用，上下顺序不影响
// * import {name} from './export5.mjs'
// * import data from './export5.mjs'

// ! 或者这样导入
// * import {default as age, name} from './export5.mjs'
