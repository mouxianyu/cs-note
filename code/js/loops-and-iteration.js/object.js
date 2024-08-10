const obj = {
    name: 'hh',
    age: 20,
    [Symbol('gender')]: 'male',
    // 属性方法是可枚举的
    say() {
        console.log('hello')
    }
}

// [ 'name', 'age', 'say' ]
console.log('Object.keys', Object.keys(obj))
// [ 'hh', 20, [Function: say] ]
console.log('Object.values', Object.values(obj))
// [ [ 'name', 'hh' ], [ 'age', 20 ], [ 'say', [Function: say] ] ]
console.log('Object.entries', Object.entries(obj))
// [ 'name', 'age', 'say', Symbol(gender) ]
console.log('Reflect.ownKeys', Reflect.ownKeys(obj))
// [ 'name', 'age', 'say' ]
console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))
// [ Symbol(gender) ]
console.log('Object.getOwnPropertySymbols', Object.getOwnPropertySymbols(obj))

const entries = []
for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key]
        entries.push([key, val])
    }
}

// [ [ 'name', 'hh' ], [ 'age', 20 ], [ 'say', [Function: say] ] ]
console.log(entries)
