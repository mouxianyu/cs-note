class Parent {
    name = 'Class'
    constructor(name) {
        this.name ??= name
    }
    getName() {
        return this.name
    }
}

const parent = {
    name: 'Object',
    getName() {
        return this.name
    }
}

const p1 = Object.create(Parent.prototype)

const p2 = Object.create(parent)

// Parent {}
console.log(p1)
// undefined
console.log(p1.getName())
// {}
console.log(p2)
// Object
console.log(p2.getName())
