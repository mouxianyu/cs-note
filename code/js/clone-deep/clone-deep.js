function cloneDeep(source) {
    const weakmap = new WeakMap()

    function copy(source) {
        // ! 判断函数
        if (typeof source === 'function') {
            // TODO 对于在对象内的 func(){} 这种函数会有问题
            // TODO 这种函数和箭头函数一样没有prototype，不能作为构造函数使用。但是绑定this为对象，arguments也可以使用
            if (source.prototype) {
                return function (...args) {
                    // 如果只用这个会把箭头函数也变成普通函数
                    return source.apply(this, args)
                }
            } else {
                return (...args) => source.apply(undefined, args)
            }
        }
        if (typeof source !== 'object' || source === null) {
            return source
        }
        // ! 判断Date类型
        if (source instanceof Date) {
            return new Date(source - 0)
        }
        // ! 判断正则
        if (source instanceof RegExp) {
            return new RegExp(source.source, source.flags)
        }
        // ! 判断是否循环引用
        // 如果是对象的话就判断weakmap中是否有该对象，如果有则说明循环引用了，此时可以设置为其他值解除循环引用，或者直接返回本身
        if (weakmap.has(source)) {
            // 这边直接返回target，也就是自己
            return weakmap.get(obj)

            // 返回其他值解除引用
            // return null
        }
        const target = Array.isArray(source) ? [] : {}
        // 如果weakmap中没有该对象的话，就添加进去，值都指向targe，可以方便后续拿到
        weakmap.set(source, target)
        // 它返回一个数组，包含目标对象自身的所有属性键，包括string key和symbol key。
        Reflect.ownKeys(source).forEach(key => {
            target[key] = copy(source[key])
        })
        return target
    }

    return copy(source)
}

const heightKey = Symbol('height')
const obj = {
    name: 'parent'
}
const source = {
    name: 'hello',
    parent: obj,
    info: {
        age: 20,
        gender: 'male',
        birthday: new Date(),
        [Symbol('height')]: 175
    },
    setName: function (name) {
        console.log(name)
        this.name = name
    },
    getName() {
        console.log(this.name)
        return this.name
    },
    say: msg => {
        console.log('say:' + msg)
        console.log('this', this)
    }
}
obj.child = source

const deep = cloneDeep(source)

console.log(Object.getOwnPropertyNames(source.info))
