# 单点登录

**单点登录**（Single Sign On, SSO）是指在同一帐号平台下的多个应用系统中，用户只需登录一次，即可访问所有相互信任的应用系统。举例来说，百度贴吧和百度地图是百度公司旗下的两个不同的应用系统，如果用户在百度贴吧登录过之后，当他访问百度地图时无需再次登录，那么就说明百度贴吧和百度地图之间实现了单点登录。

## 实现方式

### 认证中心

我们可以部署一个认证中心，认证中心就是一个专门负责处理登录请求的独立的 Web 服务。

用户统一在认证中心进行登录，登录成功后，认证中心记录用户的登录状态，并将 Token 写入 Cookie。（注意这个 Cookie 是认证中心的，应用系统是访问不到的。）

应用系统检查当前请求有没有 Token，如果没有，说明用户在当前系统中尚未登录，那么就将页面跳转至认证中心。由于这个操作会将认证中心的 Cookie 自动带过去，因此，认证中心能够根据 Cookie 知道用户是否已经登录过了。如果认证中心发现用户尚未登录，则返回登录页面，等待用户登录，如果发现用户已经登录过了，就不会让用户再次登录了，而是会跳转回目标 URL ，并在跳转前生成一个 Token，拼接在目标 URL 的后面，回传给目标应用系统。

总结：此种实现方式相对复杂，支持跨域，扩展性好，是**单点登录的标准做法**。

### LocalStorage 跨域

```js
// 获取 token
var token = result.data.token

// 动态创建一个不可见的iframe，在iframe中加载一个跨域HTML
var iframe = document.createElement('iframe')
iframe.src = 'http://app1.com/localstorage.html'
document.body.append(iframe)
// 使用postMessage()方法将token传递给iframe
setTimeout(function () {
    iframe.contentWindow.postMessage(token, 'http://app1.com')
}, 4000)
setTimeout(function () {
    iframe.remove()
}, 6000)

// 在这个iframe所加载的HTML中绑定一个事件监听器，当事件被触发时，把接收到的token数据写入localStorage
window.addEventListener(
    'message',
    function (event) {
        localStorage.setItem('token', event.data)
    },
    false
)
```

前端通过 iframe+postMessage() 方式，将**同一份 Token 写入到了多个域下的 LocalStorage 中**，前端每次在向后端发送请求之前，都会主动从 LocalStorage 中读取 Token 并在请求中携带，这样就实现了同一份 Token 被多个域所共享。

## 自己总结

1. 认证中心：认证中心登录后后端生成 Cookie，将该 Cookie 通过后端分发给其他系统
2. 不同子域：让子域名 Cookie 共享，登录一个子域，其他域名也就都登录了
3. iframe + postMessage 跨域，token 可以存储在 localStorage 中，一个域名登录后，利用 iframe+postMessage，将其发送给其他域名
