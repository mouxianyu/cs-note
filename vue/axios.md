# Axios

Axios 是一个基于  *[promise](https://javascript.info/promise-basics)*  网络请求库，作用于[`node.js`](https://nodejs.org/)  和浏览器中。 它是  *[isomorphic](https://www.lullabot.com/articles/what-is-an-isomorphic-application)*  的(即同一套代码可以运行在浏览器和 node.js 中)。在服务端它使用原生 node.js `http`  模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

## 特性

-   从浏览器创建  [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
-   从 node.js 创建  [http](http://nodejs.org/api/http.html)  请求
-   支持  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
-   拦截请求和响应
-   转换请求和响应数据
-   取消请求
-   超时处理
-   查询参数序列化支持嵌套项处理
-   自动将请求体序列化为：
    -   JSON (`application/json`)
    -   Multipart / FormData (`multipart/form-data`)
    -   URL encoded form (`application/x-www-form-urlencoded`)
-   将 HTML Form 转换成 JSON 进行请求
-   自动转换 JSON 数据
-   获取浏览器和 node.js 的请求进度，并提供额外的信息（速度、剩余时间）
-   为 node.js 设置带宽限制
-   兼容符合规范的 FormData 和 Blob（包括 node.js）
-   客户端支持防御[XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

## 封装 Axios

-   **统一配置**：超时时间、BaseURL、请求头等，根据不同环境设置不同的 BaseURL
-   **简化 API 调用**：封装成统一的更简单的方法发送请求，简化方法调用
-   **错误处理**：可以封装一个统一的错误处理方式，消息弹窗之类的
-   **拦截器**：添加全局请求和响应拦截器，用于处理日志、认证处理等。如 JWT 携带 token、获取 token、刷新 token 等
