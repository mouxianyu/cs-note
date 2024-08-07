# HTTP 响应状态码

1. 信息响应（100-199）
2. 成功响应（200-299）
3. 重定向消息（300-399）
4. 客户端错误响应（400-499）
5. 服务端错误响应（500-599）

https://datatracker.ietf.org/doc/html/rfc7231#section-6

## 2xx 成功

| 状态码 | 英文            | 中文                                                 |
| ------ | --------------- | ---------------------------------------------------- |
| 200    | OK              | 成功                                                 |
| 201    | Created         | 已创建                                               |
| 202    | Accepted        | 已接受                                               |
| 204    | No Content      | 请求成功但是没有返回结果                             |
| 206    | Partial Content | 客户端请求一部分资源，服务端成功响应，返回一范围资源 |

## 3xx 重定向

| 状态码 | 英文               | 中文                                                                                                                                                        |
| ------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 301    | Moved Permanently  | 永久重定向                                                                                                                                                  |
| 302    | Found              | 临时重定向                                                                                                                                                  |
| 303    | See Other          | 它告诉客户端（通常是浏览器）使用不同的 URI 来完成请求。这通常发生在使用 POST 方法提交表单后，服务器希望客户端使用 GET 方法来访问新的资源或页面              |
| 304    | Not Modified       | 它告诉客户端请求的资源自从上次请求后没有被修改过，因此客户端可以使用本地缓存的副本。                                                                        |
| 307    | Temporary Redirect | 临时重定向，与 302 Found 状态码类似，但 307 要求客户端保留原始请求的方法和请求体。302 状态码允许客户端在重定向时使用 GET 方法，即使原始请求使用了 POST 方法 |

## 4xx 客户端错误

| 状态码 | 英文                   | 中文                                                                                   |
| ------ | ---------------------- | -------------------------------------------------------------------------------------- |
| 400    | Bad Request            | 错误请求                                                                               |
| 401    | Unauthorized           | 未授权                                                                                 |
| 403    | Forbidden              | 禁止，服务器拒绝访问                                                                   |
| 404    | Not Found              | 未找到                                                                                 |
| 405    | Method Not Allowed     | 方法不被允许，如客户端尝试使用 POST 方法访问一个只接受 GET 方法的资源                  |
| 408    | Request Timeout        | 请求超时                                                                               |
| 409    | Conflict               | 冲突，如当两个客户端尝试同时修改同一资源，并且服务器无法确定哪个操作应该优先执行时     |
| 413    | Payload Too Large      | 负载过大，如当客户端尝试上传一个文件，但文件的大小超过了服务器配置的允许的最大大小限制 |
| 415    | Unsupported Media Type | 不支持的媒体类型，如当客户端尝试上传一个文件，但文件的 MIME 类型不在服务器接受的列表中 |
| 429    | Too Many Requests      | 请求过多，如当用户在短时间内对 API 进行了大量请求，超过了 API 的调用频率限制           |

## 5xx 服务端错误

| 状态码 | 英文                       | 中文                                                                                                                                           |
| ------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 500    | Internal Server Error      | 内部服务器错误                                                                                                                                 |
| 501    | Not Implemented            | 未实现，表示服务器理解了请求，但目前无法支持或实现请求所需的功能。这通常意味着服务器无法识别请求的 HTTP 方法，或者服务器不支持请求的某些特性。 |
| 502    | Bad Gateway                | 错误的网关，表示服务器作为网关或代理，从上游服务器收到了无效的响应。                                                                           |
| 503    | Service Unavailable        | 服务不可用，表示服务器目前无法处理请求，通常是由于服务器过载或正在进行维护                                                                     |
| 504    | Gateway Timeout            | 网关超时，表示服务器作为网关或代理，在等待来自另一个服务器（上游服务器）的响应时，未能在预定的时间内收到响应                                   |
| 505    | HTTP Version Not Supported | 不支持的 HTTP 版本，表示服务器不支持请求中使用的 HTTP 协议版本，服务器可能仅支持 HTTP/1.1，而客户端尝试使用 HTTP/2 或 HTTP/3 进行通信          |
