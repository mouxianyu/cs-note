# 生成器

## 应用

### 1. 异步操作的同步化处理

`generator` 可以与 `Promise` 结合使用，实现异步操作的同步化处理，这在某些场景下可以简化代码逻辑。

```js
function* asyncTaskGenerator() {
    const result1 = yield Promise.resolve('First promise resolved')
    console.log(result1)

    const result2 = yield Promise.resolve('Second promise resolved')
    console.log(result2)
}

const task = asyncTaskGenerator()
task.next().value.then(res => {
    console.log('First step done:', res)
    task.next(res).value.then(res => {
        console.log('Second step done:', res)
        task.next()
    })
})
```

### 2. 数据流控制

`generator` 可以用来控制数据流，例如实现一个简单的数据分页加载。

```js
function* paginate(items, pageSize) {
    let index = 0
    while (index < items.length) {
        yield items.slice(index, index + pageSize)
        index += pageSize
    }
}

const items = new Array(100).fill('item')
const pageSize = 10
const pager = paginate(items, pageSize)

console.log(pager.next().value) // 第一页数据
console.log(pager.next().value) // 第二页数据
// 以此类推...
```

### 3. 懒加载

`generator` 可以用于实现懒加载，即按需加载数据，而不是一次性加载所有数据。

```js
function* loadResources() {
    yield import('./resource1.js')
    yield import('./resource2.js')
    // 可以根据需要继续添加更多资源
}

const resourceLoader = loadResources()
resourceLoader.next().value.then(resource1 => {
    // 使用 resource1
    resourceLoader.next().value.then(resource2 => {
        // 使用 resource2
    })
})
```

### 4. 装饰器模式

`generator` 可以用于实现装饰器模式，允许动态地添加或修改对象的行为。

**装饰器模式**允许我们通过创建包装类（装饰器）来扩展或修改其他对象的功能，而不需要改变原有对象的结构。这样，我们可以保持代码的灵活性和可扩展性。

```js
function delay(time) {
    return function* (gen) {
        let result
        while (!(result = gen.next()).done) {
            yield new Promise(resolve => setTimeout(resolve, time))
        }
        return result.value
    }
}

const delayedGreet = delay(1000)(function* () {
    yield 'Hello'
    yield 'World'
})

const iterator = delayedGreet()
console.log(iterator.next()) // 等待1秒后输出 { value: 'Hello', done: false }
console.log(iterator.next()) // 等待1秒后输出 { value: 'World', done: false }
console.log(iterator.next()) // 输出 { value: undefined, done: true }
```

### 5. 测试和模拟

`generator` 可以用于编写测试或模拟某些行为，例如模拟用户输入或 API 响应。

```js
function* simulateUserInput() {
    yield 'username'
    yield 'password'
}

const userInput = simulateUserInput()
console.log(userInput.next().value) // 'username'
console.log(userInput.next().value) // 'password'
```
