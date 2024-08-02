const arrowFunc = info => {
    // console.log('arrowFunc', this)
    return this
}

function func(info) {
    // console.log('func', this)
    arrowFunc()
    return this
}

let obj = {
    name: 'test',
    arrowFunc: arrowFunc,
    func: func
}

// true，this不跟随上下文改变而变化
console.log(obj.arrowFunc() === arrowFunc())

// false，this跟随上下文变化
console.log(obj.func() === func())
