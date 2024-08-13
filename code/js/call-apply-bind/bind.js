Function.prototype.bind = function (ctx, ...args) {
    // 存储原来的函数
    const fn = this
    return function () {
        return fn.apply(ctx, args)
    }
}

const source = {
    name: 'source',
    say(msg1, msg2) {
        console.log(`${this.name} say: ${msg1} ${msg2}`)
    }
}

const dis = {
    name: 'dis'
}

source.say.bind(dis, 'hello', 'world')()
