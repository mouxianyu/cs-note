# 代理模式

代理模式（Proxy Pattern）是一种结构型设计模式，它为另一个对象提供一个代替或占位符，以控制对它的访问。代理模式在不直接访问实际对象的情况下，**提供了对目标对象的间接访问**。**通过引入一个代理对象来间接操作实际对象**，可以在不改变实际对象代码的前提下，增加额外的功能操作，如访问控制、延迟初始化、日志记录等。

> 通过代理对象操作实际对象，在不改变实际对象代码的前提下，增加额外的功能操作

代理模式通常包含以下几个角色：

-   **主题**（Subject）：定义了真实主题和代理主题的共同接口，这样代理对象和真实对象可以互换。
-   **真实主题**（Real Subject）：定义了代理所代表的真实对象，实现了具体的业务逻辑。
-   **代理**（Proxy）：包含对真实主题的引用，实现了与真实主题相同的接口，并在访问真实主题之前或之后进行额外操作。

代理模式有几种不同的形式，包括：

-   **远程代理**（Remote Proxy）：为远程对象提供局部代表，隐藏对象位于不同地址空间的事实。
-   **虚拟代理**（Virtual Proxy）：根据需要创建开销很大的对象，节省资源。
-   **保护代理**（Protection Proxy）：控制对原始对象的访问，根据不同的访问权限提供不同的访问策略。
-   **智能引用**（Smart Reference）：在访问对象时执行额外的动作，如引用计数、访问日志。

## 业务中的应用

### 通过 Nginx 代理实现不同接口的转换

有一个 PHP 写的旧接口，和 Koa 写的新接口，两个接口在域名、参数名、参数数量上不一样，通过 Nginx 的规则匹配转化，将旧接口的请求转化成新接口的请求。Nginx 在这边起到了代理的作用

## JS 中的 Proxy

`Proxy` 对象可以拦截并自定义对目标对象的各种操作，如属性访问、方法调用等，从而实现对目标对象的代理和控制。

> 通过操作 Proxy 对象，间接操作真实对象

```js
// 目标对象
const target = {
    name: 'xiaobai',
    greet() {
        console.log(`Hello, my name is ${this.name}!`)
    }
}

// 处理器对象
const handler = {
    get: function (obj, prop) {
        if (prop === 'name') {
            console.log(`Getting the name.`)
            return obj[prop]
        }
    },
    apply: function (target, thisArg, argumentsList) {
        console.log(`Function is being called.`)
        return Reflect.apply(...arguments)
    }
}

// 创建代理
const proxy = new Proxy(target, handler)

// 使用代理
console.log(proxy.name) // "Getting the name."
proxy.greet() // "Function is being called." 然后 "Hello, my name is xiaobai!"
```

在这个例子中，我们创建了一个代理 proxy，它代理了 target 对象。通过在 handler 对象中定义 get 和 apply 陷阱，我们能够自定义当访问 name 属性和调用 greet 方法时的行为
