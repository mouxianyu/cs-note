const obj = {
    say(msg) {
        // ! 可以使用arguments，指代该函数的参数
        console.log(arguments)
        // ! this指代对象
        return this
    }
}

// ! TypeError: obj.say is not a constructor
// new obj.say()

// ! undefined
// console.log(obj.say.prototype)

obj.say('msg')
