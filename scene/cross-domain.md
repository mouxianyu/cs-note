# 跨域

跨域是指浏览器的**同源策略**（Same-Origin Policy）限制了来自不同源的文档或脚本对当前文档的读取或设置某些属性。这里的“源”指的是**协议（如 HTTP 或 HTTPS）、域名和端口号**的组合。如果这三个元素中任何一个不同，浏览器就会认为它们是不同的源。

Postman 不受同源策略的限制

## 前后端跨域解决方法

### CORS（跨源资源共享）

#### 服务端设置响应头（根据需要设置）

-   **Access-Control-Allow-Origin：** 指定允许访问资源的源。可以指定具体域名，或者使用\*来允许所有域。
-   **Access-Control-Allow-Methods：** 指定允许的 HTTP 方法，如 GET、POST、PUT 等。
-   **Access-Control-Allow-Headers：** 指定允许的 HTTP 请求头。
-   **Access-Control-Allow-Credentials：** 一个布尔值，表示是否允许发送 cookies 和 HTTP 认证信息。当设置为 true 时，Access-Control-Allow-Origin 不能使用\*，必须指定明确的源。
-   **Access-Control-Max-Age：** 指定预检请求的结果可以被缓存多久。
-   **Access-Control-Expose-Headers：** 指定哪些响应头可以被 JavaScript 读取。
-   **Access-Control-Request-Method：** 在预检请求中使用，请求实际想要使用的 HTTP 方法。
-   **Access-Control-Request-Headers：** 在预检请求中使用，请求实际想要发送的自定义头信息。
-   **Vary：** 告知客户端或代理服务器，响应的表示可能根据请求的不同而变化，这可能影响 CORS 的处理。
-   **Set-Cookie**（虽然不是 CORS 头，但与 Access-Control-Allow-Credentials 有关）：当 Access-Control-Allow-Credentials 设置为 true 时，服务器可能会在响应中设置 cookies。

#### 预检请求（Preflight Request）

当发起一个可能对服务器数据产生副作用的请求（如使用 PUT、POST 或其他非简单请求方法，或者设置了自定义请求头）时，浏览器（自动发送）会先发送一个预检请求（OPTIONS 请求），询问服务器是否允许实际的请求。

一般后端框架会自动处理预检请求：

-   Express： cors 中间件
-   Koa： koa2-cors 中间件
-   Nest.js: cors

##### 过程

-   浏览器检查请求：
    -   当浏览器检测到一个跨域请求可能是非简单请求时（例如使用了非 GET、HEAD、POST 方法，或者请求中包含了自定义的 HTTP 头等），它会先发送一个预检请求。
-   发送 OPTIONS 请求：

    -   浏览器自动发送一个 HTTP OPTIONS 方法的请求到服务器。这个请求会包含如下两个重要的请求头：
        -   Access-Control-Request-Method：声明实际请求将要使用的方法。
        -   Access-Control-Request-Headers：如果实际请求中包含了自定义的 HTTP 请求头，则在这里列出。

-   服务器响应 OPTIONS 请求：
    -   服务器接收到 OPTIONS 请求后，需要判断是否允许实际的跨域请求。服务器根据请求头中的信息，决定是否接受这个预检请求。
-   返回 CORS 响应头：
    -   如果服务器决定允许跨域请求，它会在响应中包含一系列的 CORS 响应头，例如：
        -   Access-Control-Allow-Origin：指定允许访问资源的源。
        -   Access-Control-Allow-Methods：指定允许的 HTTP 方法。
        -   Access-Control-Allow-Headers：如果请求中包含了自定义头，这里列出允许的头。
        -   Access-Control-Max-Age：预检请求结果的缓存时间。
        -   Access-Control-Allow-Credentials：是否允许发送 cookies。
-   浏览器处理响应：
    -   浏览器接收到 OPTIONS 请求的响应后，会检查响应头。如果响应头表明服务器允许实际的请求，浏览器会发送实际的请求；如果不允许，浏览器会阻止实际的请求并可能报错。
-   发送实际请求：
    -   如果预检请求得到批准，浏览器会发送实际的请求。由于 CORS 响应头已经表明了允许，服务器将处理这个请求并返回响应。
-   错误处理：
    -   如果服务器在响应中没有正确设置 CORS 响应头，或者设置不允许跨域请求，浏览器将不会发送实际的请求，并可能在控制台中记录错误。

### 反向代理

前端搭建代理服务器，通过如 Nginx、Apache 等将请求转发给后端

通过 Node 反向代理，如 vite、webpack 中的反响代理。使用 http-proxy-middleware 中间件等

### JSONP（JSON with Padding）(只允许 Get 请求)

利用<script>标签没有跨域限制，通过<script>标签 src 属性，发送带有 callback 参数的 GET 请求，服务端将接口返回数据拼凑到 callback 函数中，返回给浏览器，浏览器解析执行，从而前端拿到 callback 函数返回的数据。

```js
let script = document.createElement('script')
script.type = 'text/javascript'

// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
// 这个得是个接口，返回text/javascript类型。不能是html页面
script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback'
document.head.appendChild(script)

// 回调执行函数
function handleCallback(res) {
    alert(JSON.stringify(res))
}
```

### WebSocket 协议跨域

## 前端跨域

> PS: iframe 同源可以进行 DOM 操作，非同源不能进行 DOM 操作

### location.hash + iframe 跨域

> PS: 在 chrome 和 safari 测试下好像不行了，在域名 c -> 域名 a 的这个过程会报跨域错误
> Uncaught DOMException: Failed to read a named property 'getRes' from 'Window': Blocked a frame with origin "http://localhost:5003" from accessing a cross-origin frame. at window.onhashchange (http://localhost:5003/hash.html:16:34)

这种方法主要利用了不同域的页面可以通过 iframe 相互嵌入，以及 location.hash 的变化可以被 JavaScript 监听到的特点。

**Hash 传递方式：** 域名 a -> 域名 b -> 域名 c -> 域名 a

通过域名 c 作为中间人，接收域名 b 的 hash，传递给域名 a

#### 缺点

-   它依赖于页面间的 hash 变化，这可能不是所有情况下都适用。
-   通信是单向的，如果需要双向通信，可能需要更复杂的设置。
-   它使用 iframe，这可能会增加页面的复杂性和性能开销。
-   现在对一些浏览器好像不兼容了，会报跨域错误。

**域名 1**

```html
<iframe id="iframe" src="http://localhost:5002/hash.html" frameborder="0" style="display: none;"></iframe>
<script>
    let iframe = document.getElementById('iframe')

    setTimeout(() => {
        iframe.src = iframe.src + '#user=admin'
    }, 2000)

    // Uncaught DOMException: Failed to read a named property 'getRes' from 'Window': Blocked a frame with origin "http://localhost:5003" from accessing a cross-origin frame.at window.onhashchange (http://localhost:5003/hash.html:16:34)
    // ! 这个方法现在好像也不行了，会报错
    function getRes(res) {
        console.log('get response form domain3', res)
    }
</script>
```

**域名 2**

```html
<iframe id="iframe" src="http://localhost:5003/hash.html" style="display: none;" frameborder="0"></iframe>
<script>
    let iframe = document.getElementById('iframe')
    window.onhashchange = function () {
        console.log('domain2 hash change', location.hash)
        iframe.src = iframe.src + location.hash
    }
</script>
```

**域名 3**

```html
<script>
    window.onhashchange = function () {
        console.log('domain3 hash change', location.hash)
        console.log(window.parent.parent)
        window.parent.parent.getRes('消息')
    }
</script>
```

### window.name + iframe 跨域

> 但在大多数情况下，如果没有显式设置，window.name 的初始值通常是空字符串 ""。这意味着，除非你通过 JavaScript 代码显式地为 window.name 设置一个值，否则它不会包含任何数据。

这种方法主要利用了 window.name 在不同的页面、不同的域名加载后依旧存在，并且支持很长的 name 值（2MB）

**传递过程**：

1. 域名 2 的页面 b 先设置 window.name 的值
2. 域名 1 的页面 a 先通过 iframe 请求页面 b，此时 iframe 已经保留了页面 b 的 window.name。但是此时如果直接访问会因为同源政策导致跨域，访问失败。
3. 将域名 1，页面 a 的 iframe 的 src 改为域名 1 的某个页面，页面中不需要有内容，假设页面为 proxy.html。proxy 页面没有设置 window.name，所以此时 window.name 还是保留页面 b 的内容。但是此时已经没有跨域问题，所以可以得到页面 b 的 window.name

#### 缺点

-   只适用于单向通信

**域名 1，页面 a**

```html
<script>
    var proxy = function (url, callback) {
        var state = 0
        var iframe = document.createElement('iframe')

        iframe.src = url

        iframe.onload = function () {
            if (state === 1) {
                //  iframe 已经加载了同域代理页面，并且之前已经将跨域页面（B域）的数据存储在了 window.name 中。
                callback(iframe.contentWindow.name)
                destoryFrame()
            } else if (state === 0) {
                try {
                    // 此时获取会跨域
                    console.log('重定向前的name', iframe.contentWindow.name)
                } catch (error) {
                    console.error(error)
                }
                // 重定向后会保留B页面的window.name，再换成同域的代理页面就可以获取window.name
                iframe.contentWindow.location = 'http://localhost:5001/window.name/proxy.html'
                state = 1
            }
        }

        document.body.appendChild(iframe)

        function destoryFrame() {
            iframe.contentWindow.document.write('')
            iframe.contentWindow.close()
            document.body.removeChild(iframe)
        }
    }

    setTimeout(() => {
        // 请求跨域b页面数据
        proxy('http://localhost:5002/window.name/b.html', function (data) {
            console.log('获取b页面window.name', data)
        })
    }, 2000)
</script>
```

**域名 1，页面 proxy**

不需要内容，之遥 window.name 没有发生更改

**域名 2，页面 b**

```html
<script>
    window.name = 'b页面数据'
</script>
```

### postMessage 跨域

postMessage 用于不同窗口（window）之间传递消息，可以用于：

-   不同源 iframe 的通信
-   同一个页面不同 iframe 的通信
-   打开的新窗口于原窗口通信：使用 window.open 方法打开的新窗口（popup）可以通过 postMessage 与原窗口（opener）进行通信
-   多个打开的标签之间的通信
-   嵌入的第三方插件或应用与宿主页面之间的通信：第三方插件或应用（如社交媒体分享按钮、评论系统等）可以通过 postMessage 与宿主页面交换消息。

#### 缺点

-   一些旧的浏览器（如 Internet Explorer 9 及以下版本）可能不支持或有有限的支持。如果需要在这些旧浏览器上实现跨源通信，可能需要使用其他技术或 polyfills。
-   postMessage 不保证消息的传递顺序，尤其是在高频率发送消息的情况下。如果消息的顺序很重要，开发者需要在应用层面实现额外的逻辑来处理消息排序

发送方

```html
<h1>发送方</h1>
<iframe id="my-iframe" src="http://localhost:5002/postmessage/b.html" frameborder="0"></iframe>
<script>
    // 用于在不同源的窗口（window）之间发送消息
    // 使用iframe
    const myIframe = document.getElementById('my-iframe')
    const otherWindow = myIframe.contentWindow
    // 使用新窗口
    // const otherWindow = window.open('http://localhost:5002/postmessage/b.html', '_blank');
    setTimeout(() => {
        // 发送消息
        otherWindow.postMessage('Hello from Domain1', 'http://localhost:5002')
    }, 2000)

    window.addEventListener('message', function (event) {
        // 接收回复
        console.log('receive from: ', event.origin)
        console.log('receive data: ', event.data)
    })
</script>
```

接收方

```html
<h1>接收方</h1>
<script>
    window.addEventListener('message', function (event) {
        console.log('receive from: ', event.origin)
        console.log('receive data: ', event.data)

        setTimeout(() => {
            // 回复消息
            window.parent.postMessage('Hello back', event.origin)
        }, 1000)
    })
</script>
```
