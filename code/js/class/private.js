class Parent {
    name
    #gender
    setGender(gender) {
        this.#gender = gender
    }
    getGender() {
        return this.#gender
    }
}

class Child extends Parent {}

let child = new Child()
child.name = 'Child'
child.setGender('female')

// 打印 female
console.log(child.getGender())
