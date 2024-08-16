class Dog {
    static getInstance() {
        // 这边的this指代的是Dog类本身
        if (!this.instance) {
            this.instance = new Dog()
        }
        return this.instance
    }
}

// undefined
console.log(Dog.instance)

const instance1 = Dog.getInstance()
const instance2 = Dog.getInstance()

// Dog {}
console.log(Dog.instance)

// true
console.log(instance1 === instance2)
