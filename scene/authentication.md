# 登录授权

## 使用 HTTPS

## 验证码校验

-   图形验证码
-   邮箱、手机验证码
-   第三方集成（如 reCAPTCHA）

## 密码二次加密

### 前端加密

#### 加密方式

##### 非对称加密（如 AES）

加密解密使用同一个密钥

> 可以使用 CryptoJS、Forge 等

##### 对称加密（如 RSA）

使用一对公钥和私钥，公钥加密私钥解密（前端获取密钥可以从 HTTP 响应头、获取公钥的 API、静态资源、环境变量等）

> 可以使用 jsencrypt

对称加密相对安全些，计算成本比较高，处理速度较慢，不适合大量数据。非对称加密速度比较快，适合大量加密

### 数据库加密

MD5 加密之类的

## 常见登录技术

### Cookie+Session 登录

最经典的方式，现在应该会比较少用
Cookie 存在 CSRF 攻击

### Token 登录（JWT）

JWT 加密算法默认使用`RS256`（RSA 的一种类型）非对称加密
JWT 一定程度上可以防止`CSRF`攻击，因为其 token 不是放在 cookie 里面

### OAuth 认证

利用比较权威的网站应用开放的 API 来实现用户登录（如微信登录、微博登录）
