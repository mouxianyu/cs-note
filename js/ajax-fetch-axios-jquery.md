# Ajax:Fetch API、Axios、jQuery.ajax()

## Ajax (Asynchronous JavaScript and XML)

AJAX（Asynchronous JavaScript and XML） 是一种用于创建快速动态网页的技术。

AJAX 的基本流程是使用 `XMLHttpRequest` 对象向服务器发送请求，然后根据服务器的响应进行相应的处理。

### 特点

**异步通信**：可以在不重新加载整个页面的情况下与服务器进行交互。
**局部更新**：能够只更新页面的部分内容，提高用户体验。

### 示例

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://example.com/data')
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const response = xhr.responseText
        // 处理服务器返回的数据
    }
}
xhr.send()
```

### 常用的 Ajax 库或插件

-   **jQuery**：虽然 jQuery 是一个更为广泛的 JavaScript 库，但它提供了简单易用的 AJAX 方法，如`$.ajax`、`$.get`和`$.post`等，是进行异步调用的流行选择
-   **Axios**：这是一个基于 XMLHttpRequest 构建的现代 JavaScript 库，用于进行 AJAX 调用，支持 Promise API，并具备请求和响应拦截等功能
-   **Fetch API（ES6）**：Fetch 是现代 Web API 的替代品，用于从服务器检索资源，支持所有现代 Web 浏览器，并且使用 Promise 进行操作

## jQuery.ajax()

jQuery 的 $.ajax() 方法是一个非常强大的工具，用于执行 AJAX 请求。它提供了一种简单的方式来与服务器交换数据并更新网页的部分内容，而无需重新加载整个页面

### 基本用法

```js
$.ajax({
    url: 'your-endpoint-url', // 服务器地址
    type: 'GET', // 请求方式 (GET 或 POST)
    dataType: 'json', // 期望的数据类型
    success: function (data) {
        // 请求成功，处理数据
        console.log(data)
    },
    error: function (error) {
        // 请求失败，处理错误
        console.error(error)
    }
})
```

### 快捷方法

-   `$.get()`: 发送 GET 请求。
-   `$.post()`: 发送 POST 请求。
-   `$.getJSON()`: 发送 GET 请求并期望返回 JSON 格式的数据。
-

### 特点

-   **链式调用**: 由于 jQuery 的链式调用特性，$.ajax() 可以与其他 jQuery 方法一起使用。
-   **跨浏览器**: jQuery 处理了不同浏览器之间的兼容性问题。
-   **全局 Ajax 事件**: jQuery 允许你绑定全局 AJAX 事件处理器，可以监听所有的 AJAX 请求。
-   **JSONP**: 支持跨域请求，通过 JSONP 方式自动处理。

## Axios

-   Axios 是一个基于  *Promise*  网络请求库，作用于`node.js`  和浏览器中。
-   它是  *isomorphic*  的(即同一套代码可以运行在浏览器和 node.js 中)。
-   在服务端它使用原生 node.js `http`  模块, 而在客户端 (浏览端) 则使用 `XMLHttpRequests`。

### 特点

-   **基于 Promise**: Axios 使用 Promise 处理请求，这意味着你可以使用 .then() 和 .catch() 方法来处理成功的响应和捕获错误。
-   **浏览器和 Node.js 兼容**: Axios 可以在浏览器和 Node.js 中使用，不需要任何转换。
-   **拦截器**: Axios 允许你添加请求和响应拦截器，这使得你可以在请求发送之前或响应返回之后统一修改请求或响应。
-   **转换**: 你可以在请求或响应被返回之前，使用转换函数来修改数据。
-   **错误处理**: Axios 提供了一个统一的错误处理机制，使得捕获和处理错误更加方便。
-   **配置**: Axios 允许你配置全局或实例级别的默认设置，例如基础 URL、超时设置等。

### 封装 Axios

-   **统一配置**：超时时间、BaseURL、请求头等，根据不同环境设置不同的 BaseURL
-   **简化 API 调用**：封装成统一的更简单的方法发送请求，简化方法调用
-   **错误处理**：可以封装一个统一的错误处理方式，消息弹窗之类的
-   **拦截器**：添加全局请求和响应拦截器，用于处理日志、认证处理等。如 JWT 携带 token、获取 token、刷新 token 等

### Fetch API

Fetch API 是一个现代的、基于 Promise 的网络请求接口，它提供了一个全局的 fetch() 函数，用于发起网络请求。Fetch API 可以替代传统的 XMLHttpRequest（XHR）来处理网络请求。

-   ES6 新增内容
-   Node.js 在 17.5.0 开始作为实验性功能支持，18.0.0 正式支持

### 特点

-   **基于标准**：它是现代浏览器原生支持的，符合最新的网络通信标准。
-   **简洁语法**：使用相对简单的语法进行请求的发起和处理。
-   **Promise 支持**：返回一个 Promise 对象，方便进行异步处理。
-   **灵活配置**：可以灵活地设置请求的各种参数，如方法、头部、主体等。
-   **可处理多种响应类型**：不仅可以处理 JSON 数据，还能处理其他格式的数据。
-   **跨域请求**：支持跨域请求。
-   **安全性**：Fetch API 默认不允许发送第三方 Cookies，这有助于提高 Web 应用的安全性。
-   **无全局作用域污染**：Fetch API 不会污染全局作用域，因为它是一个全局函数，而不是全局对象。
-   **支持 Web Workers**：Fetch API 可以在 Web Workers 中使用，使得网络请求可以在后台线程中执行，从而不会阻塞主线程。

### Fetch API 的一些问题

fetch 是一个低层次的 API，你可以把它考虑成原生的 XHR，所以使用起来并不是那么舒服，需要进行封装

-   只有当网络故障的时候才会标记为`reject`,状态码是 4xx、5xx 会将`Promise`的状态标记的`resolve`（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 `resolve` 返回值的 `ok` 属性为 `false`）
-   `fetch` 不会发送跨域 `cookie`，除非你使用了 `credentials` 的初始化选项。（自 2018 年 8 月以后，默认的 `credentials` 政策变更为 `same-origin`）
-   fetch 不支持 `abort`，不支持超时控制
-   fetch 没有办法原生监测请求的进度，而 XHR 可以

### 示例

```js
const data = {key: 'value'}

fetch('https://api.example.com/submit', {
    method: 'POST', // 或者 'PUT'
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // 将 JavaScript 对象转换为 JSON 字符串
})
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error))
```

## Fetch、Axios、jQuery.ajax()对比

| 对比内容   | jQuery.ajax()                                          | axios                            | fetch                                                    |
| ---------- | ------------------------------------------------------ | -------------------------------- | -------------------------------------------------------- |
| 封装       | jquery 库提供                                          | 封装的独立库                     | 现代浏览器（Node） 内置的 API                            |
| 异步处理   | 回调函数                                               | Promise                          | Promise                                                  |
| Node.支持  | 不支持                                                 | 支持(基于 http 模块)             | 支持(Node 17.5.0+)                                       |
| 底层       | XHR                                                    | 浏览器：XHR，Node：http 模块     | 现代浏览器（Node） 内置 API                              |
| 兼容性     | 依赖 jQuery，支持老旧浏览器                            | 现代浏览器和 Node.js，不支持 IE  | 现代浏览器，Node.js 17.5.0+                              |
| 跨域       | 支持 CORS、 JSONP                                      | 支持 CORS，可通过配置处理        | 支持 CORS，遵循同源策略                                  |
| 拦截器     | 无拦截器概念，但可通过 beforeSend 等配置项实现类似功能 | 支持请求和响应拦截器             | 无拦截器，但可通过函数封装实现请求/响应前处理            |
| 配置性     | 高，丰富的配置选项                                     | 高，提供丰富的配置选项和拦截器   | 适中，API 简洁，但配置选项不如 jQuery.ajax 或 axios 丰富 |
| 易用性     | 高，链式调用和丰富的配置                               | 高，API 设计清晰，易于学习和使用 | 中等，API 简洁但功能强大，学习曲线较平缓                 |
| 社区和维护 | jQuery 社区广泛，但项目维护放缓                        | 活跃的社区和持续维护             | 作为 Web 标准，由浏览器厂商维护                          |

-   jQuery.ajax：适合需要兼容旧浏览器或使用 jQuery 的项目，配置丰富但语法较为复杂。
-   Fetch：适合现代浏览器和 Node.js，API 设计简洁，基于 Promise，但配置选项相对有限。
-   Axios：适合需要高度可配置性和易用性的项目，支持浏览器和 Node.js，提供拦截器等高级功能。
