- **SYN（Synchronize Sequence Numbers）**：**同步序列号**。SYN是一个TCP控制位，用于建立连接时同步双方的初始序列号。
- **ACK（Acknowledgment Number）**：**确认编号**。ACK是一个TCP控制位，用来确认收到的数据。ACK编号表示接收方期望收到的下一个字节的序列号。
- **ISN（Initial Sequence Number）**：**初始序列号**。ISN是TCP连接建立时发送方选择的起始序列号，用于标识连接中的第一个数据字节。
- **FIN（Finish）**：**结束**。FIN是一个TCP控制位，用于关闭连接时指示发送方已经完成发送数据，希望终止连接。
- **SEQ（Sequence Number）**：**序列号**。
- **标志位设为1**：特定的控制位被激活或启用

## ### TCP三次握手（建立连接）

![TCP 三次握手图解#pic_center | 400](https://oss.javaguide.cn/github/javaguide/cs-basics/network/tcp-shakes-hands-three-times.png)

1. **SYN (SEQ=x)（同步）**：客户端选择一个初始序列号（ISN），发送一个TCP段给服务器，其中SYN标志位设为1，表示希望建立连接。
2. **SYN-ACK (SEQ=y,ACK=x+1)（同步确认）**：服务器收到客户端的SYN段后，如果同意建立连接，会发送一个TCP段作为响应。这个段的SYN标志位和ACK（确认）标志位都设为1，并且ACK编号是客户端的ISN加1，同时服务器也选择自己的初始序列号。
3. **ACK (ACK=y+1)（确认）**：客户端收到服务器的SYN-ACK段后，发送一个TCP段作为最后的确认，其中ACK标志位设为1，序列号是服务端发送的ISN加1，ACK编号是服务器的ISN加1。

## TCP四次挥手（关闭连接）

1. **FIN (SEQ=x)（结束）**：假设客户端希望关闭连接，它会发送一个TCP段，其中FIN标志位设为1，用来关闭主动打开的连接方向。这时客户端进入FIN-WAIT-1状态。
2. **ACK (ACK=x+1)（确认）**：服务器收到FIN后，发送一个确认ACK，进入CLOSE-WAIT状态。客户端收到ACK后进入FIN-WAIT-2状态。
3. **FIN (SEQ=y)（结束）**：服务器发送一个TCP段，其中FIN标志位设为1，请求关闭它的那端连接。
4. **ACK (ACK=y+1)（确认）**：客户端收到服务器的FIN后，发送一个确认ACK，并进入TIME-WAIT状态。服务器收到ACK后关闭连接，进入CLOSED状态。客户端在TIME-WAIT状态等待一段时间后，确保服务器接收到了最终的ACK，然后也进入CLOSED状态。

## 为什么需要四次挥手？

TCP连接是双向的，所以每个方向都可以独立地开始关闭过程。三次握手建立连接时，双方确认了接收和发送的能力。同样，在关闭连接时，每个方向也需要独立地关闭，因此需要四次交互来确保双方都能独立地关闭它们的发送和接收能力。

## 为什么有TIME-WAIT状态？

TIME-WAIT状态是一个安全措施，用于确保服务器接收到了客户端最终的ACK。如果在关闭连接的过程中网络延迟或丢失了ACK，服务器可能会重发FIN请求。TIME-WAIT状态确保客户端有足够的时间来响应任何可能的重传FIN，从而避免连接被意外地重新打开。
