const arr = [1, 3, undefined, undefined, null, 'hhh', '21', null, false, true, 3, 3, true]

function bySet(arr) {
    return Array.from(new Set(arr))
}

function byFilter(arr) {
    return arr.filter((val, index) => arr.indexOf(val) === index)
}

function byIncludes(arr) {
    let unique = []
    for (const val of arr) {
        if (!unique.includes(val)) {
            unique.push(val)
        }
    }
    return unique
}

function byObject(arr) {
    const obj = arr.reduce((acc, val) => {
        // 会有问题，如果数组中有undefined，就会报错
        // Cannot set properties of undefined (setting '3')
        acc[val] = true
    }, {})
    return Object.keys(obj)
}

function byMap(arr) {
    const map = new Map(arr.map(val => [val, true]))
    return Array.from(map.keys())
}

function byIndexOf(arr) {
    return arr.reduce((acc, val) => {
        if (acc.indexOf(val) === -1) {
            acc.push(val)
        }
        return acc
    }, [])
}

function byNear(array) {
    let uniqueArray = []
    array.sort()
    uniqueArray.push(array[0])
    for (let i = 1; i < array.length; i++) {
        if (array[i] !== array[i - 1]) {
            uniqueArray.push(array[i])
        }
    }
    return uniqueArray
}

console.log(bySet(arr), 'Set')
console.log(byFilter(arr), 'filter')
console.log(byIncludes(arr), 'includes')
console.log(byMap(arr), 'map')
console.log(byIndexOf(arr), 'indexOf')
console.log(byNear(arr), 'byNear')
