class MyObject {
    name

    // 私有属性打印不出来
    #age

    hobby;

    [Symbol('gender')]

    // class创建的实例中方法是不可枚举的
    say() {
        console.log('hello')
    }

    constructor(name, age, hobby, gender) {
        this.name = name
        this.#age = age
        this.hobby = hobby
        this[Symbol('gender')] = gender
    }
}

const obj = new MyObject('hh', 20, 'sing', 'male')

// Object.keys [ 'name', 'hobby' ]
console.log('Object.keys', Object.keys(obj))

// Object.values [ 'hh', 'sing' ]
console.log('Object.values', Object.values(obj))

// Object.entries [ [ 'name', 'hh' ], [ 'hobby', 'sing' ] ]
console.log('Object.entries', Object.entries(obj))

// Reflect.ownKeys [ 'name', 'hobby', Symbol(gender), Symbol(gender) ]
console.log('Reflect.ownKeys', Reflect.ownKeys(obj))

// Object.getOwnPropertyNames [ 'name', 'hobby' ]
console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))

// Object.getOwnPropertySymbols [ Symbol(gender), Symbol(gender) ]
console.log('Object.getOwnPropertySymbols', Object.getOwnPropertySymbols(obj))

const entries = []
for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key]
        entries.push([key, val])
    }
}
// [ [ 'name', 'hh' ], [ 'hobby', 'sing' ] ]
console.log(entries)
