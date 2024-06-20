> 跨站脚本攻击（Cross-Site Scripting，XSS）

## 定义
XSS是一种网络安全漏洞，允许攻击者在其他用户访问的网页上注入恶意脚本。当用户访问受感染的网页时，这些脚本会在用户的浏览器中执行，从而窃取用户信息、劫持会话、操纵页面内容等。

## XSS攻击类型
### 反射型号XSS
通常URL包含恶意脚本，用户点击访问后如果服务器不能正确处理，脚本可能会在浏览器中直接执行
```html
http://example.com/search?q=<script>alert('XSS Attack!');</script>
```
### 存储型XSS
将恶意脚本提交到目标网站（提交上传到服务器），当其他用户访问存储了恶意脚本的页面的时候，脚本会在浏览器中执行
> 如：博客系统允许用户评论，攻击者在评论中加入恶意脚本，如果不进行处理留言内内会被存储到数据库中。当其他用户访问的时候，如果没有对其进行转义处理，脚本就会在浏览器中执行
### 基于DOM的XSS
#### 恶意脚本注入到搜索结果
如使用 `<script>alert('XSS');</script>` 进行搜索，结果包含这个脚本，会直接执行
#### 利用URL
构造恶意脚本将参数传递给页面
```html
http://example.com/page?data=<script>alert('XSS');</script>
```
#### 利用表单数据
将脚本直接输入表单中提交，如果没有转义或编码，会执行该脚本
#### 利用AJAX响应
使用AJAX的响应内容，攻击者构造一个恶意响应，如果数据没有适当处理会直接执行
```javascript
// 假设这是AJAX请求的响应
var response = '<div><script>alert("XSS");</script></div>';
document.getElementById('content').innerHTML = response;
```
> **反射型**和**基于DOM型**在一些方面看起来有些相同，其**区别**主要在于：反射型型需要将攻击发送到服务器，基于DOM型只要客户端参与。反射型是服务器响应，基于DOM型是客户端响应。

## 如何防患
1. 输入验证
2. 自动转义
3. 使用安全框架（Vue、React等，通常提供自动的XSS防护机制）
4. 设置`X-XSS-Protection`响应头，以启用浏览器的XSS过滤和阻断机制
5. 为Cookie设置`HttpOnly`和`Secure`属性，防止JavaScript访问Cookie，减少XSS攻击的影响。
6. 避免使用`<iframe>`、`<object>`、`<script>`等可能执行脚本的HTML标签
7. 用支持自动转义的模板引擎，以减少手动编码的需求
8. 限制Web应用的数据库访问权限，避免存储恶意脚本
9. 实施CSP可以限制网页可以加载和执行的资源，减少XSS攻击的风险。比如网站可以设定要求只允许某个来源，以及信任的名单。等等，还有其他相关内容
    ```http
    Content-Security-Policy: default-src 'self' *.trusted.com
    ```