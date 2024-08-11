# Cookie

-   HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。
-   浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。
-   通常，它用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。
-   Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 曾一度用于客户端数据的存储，因当时并没有其他合适的存储办法而作为唯一的存储手段，但现在推荐使用现代存储 API。由于服务器指定 Cookie 后，浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器 API 已经允许开发者直接将数据存储到本地，如使用 Web storage API（localStorage 和 sessionStorage）或 IndexedDB 。

## Cookie 主要用于以下三个方面

-   **会话状态管理**：如用户登录状态、购物车、游戏分数或其他需要记录的信息
-   **个性化设置**：如用户自定义设置、主题和其他设置
-   **浏览器行为跟踪**：如跟踪分析用户行为等

## 创建 Cookie

-   响应头`Set-Cookie`：服务端使用 `Set-Cookie` 响应头向客户端发送 Cookie 信息
-   请求头`Cookie`：客户段对服务端发送新请求，浏览器将之前保存的 Cookie 信息通过`Cookie`请求头发送给服务器

**响应头**：

```http
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[页面内容]
```

**请求头**：

```http
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

## Set-Cookie 响应头

格式通常为:

```http
Set-Cookie: name=value; expires=Wed, 09 Jun 2021 10:18:14 GMT; path=/; domain=example.com; Secure; SameSite=None
```

### 名称和值： `name=value`

代表 cookie 的名字和值

### 生命周期： `expires` 和 `max-age`

#### 会话 Cookie

-   当用户关闭浏览器窗口或标签页时，会话 Cookie 就会被删除。
-   `expires` 和 `max-age` 都不设置的时候默认就是会话 Cookie

#### 持久 Cookie

需要 `expires` 或 `max-age` 来定义生命周期

-   `expires`属性指定了一个具体的日期和时间
-   `max-age`属性指定了自创建 Cookie 以来的秒数
-   `max-age` 优先级大于 `expires`
-

### 作用域： `domain` 和 `path`

#### domain

> 域名级别没有固定限制，一般常见的都是三级（www.example.com）、四级（sub.www.example.com）域名

domain 属性定义了 Cookie 的有效域，即 Cookie 可以被哪些子域所接受

-   **不设置**：没有 Domain 属性的 Cookie 不会自动被子域继承
    -   例如：例如，如果你在www.example.com接收到一个没有Domain属性的Cookie，它不会自动发送到subdomain.example.com。
-   **设置**： 设置后所有子域都可以访问 cookie
    -   例如：domain=example.com，则所有子域 xxx.example.com 都可以访问 cookie
    -   例如：domain=www.example.com，则所有子域 xxx.www.example.com 都可以访问 cookie
-   **无效**：如果 domain 设置成其他域名，则无效。
    -   如站点是 www.xxx.com ，domain 设置成 yyy.com，这样就无效

> domain 通常不设置成顶级域名，如.com，.net，.cn 等

#### path

Path 属性指定了 Cookie 在服务器上的有效路径。只有当请求的 URL 路径与这个属性匹配时，Cookie 才会被发送到服务器

例如，设置 Path=/docs，则以下地址都会匹配：

-   /docs
-   /docs/
-   /docs/Web/
-   /docs/Web/HTTP

-   但是这些请求路径不会匹配以下地址：

-   /
-   /docsets
-   /fr/docs

### 安全： secure、httpOnly、sameSite

#### httpOnly

表示 Cookie 不能被 JavaScript 读取，用于防范跨站脚本（`XSS`）攻击。

#### secure

只允许通过被 HTTPS 协议加密过的请求发送给服务端

#### sameSite

用来控制 Cookie 的跨站点请求属性。没有设置 `sameSite` ，则默认为 `Lax`。可以防止 `csrf` 攻击

-   `Strict`：Cookie 不会跟随任何跨域请求。
-   `None`：Cookie 将随跨域请求发送，但必须设置 Secure 属性。
-   `Lax`(默认)：在用户导航到 cookie 的源站点时发送 cookie。

**导航到目标网址的 GET 请求**，只包括三种情况：链接，预加载请求，GET 表单

| 请求类型  | 示例                                 | Lax         |
| --------- | ------------------------------------ | ----------- |
| 链接      | `<a href="..."></a>`                 | 发送 Cookie |
| 预加载    | `<link rel="prerender" href="..."/>` | 发送 Cookie |
| GET 表单  | `<form method="GET" action="...">`   | 发送 Cookie |
| POST 表单 | `<form method="POST" action="...">`  | 不发送      |
| iframe    | `<iframe src="..."></iframe>`        | 不发送      |
| AJAX      | `$.get("...")`                       | 不发送      |
| Image     | `<img src="...">`                    | 不发送      |

例如：在 www.xxx.com 有一个页面，页面上有一个链接`<a href="www.yyy.com"></a>`，sameSite 为 lax 的话，cookie 就会从 www.xxx.com 发送到 www.yyy.com
