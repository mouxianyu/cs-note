# 文件上传

## 文件上传过程

1. **客户端**通过 `formData`（`multipart/form-data`），或将 `formData` 转化成 `ReadableStream`上传
    - `formData`：使用 `formData` 的话，客户端会将文件先放到 `Buffer`（将文件缓冲到客户端内存），然后放在 HTTP 请求（通常是 POST）的 Body 中一次性上传，如果 Body 太大，就会返回 413（Payload Too Large）。这个限制可以通过修改服务端的 `client_max_body_size`（通常可以设置 10m、20m 左右） 来调整请求体大小.
    - 如果用 `ReadableStream` 的话，会强制使用 `Stream`，此时就不再受到 HTTP Body 的大小限制。Stream 相当于开启一个客户端和服务器的通道，客户端可以通过这个开启的 HTTP 通道批量持续上传（但会受 timeout 限制），Stream 回自动关闭，但是有些情况下要手动关闭
2. **服务端接收**：
    - 接收 Buffer：服务端接收到的 Buffer 可以表示为文件的全部或部分内容。对于大型文件，可能需要使用 Stream 来处理数据。
    - 接收 Stream：服务端可以逐步接收 Stream 中的数据，这通常涉及到监听 Stream 的事件，如 data、end 和 error。
3. **写入服务端文件系统**：
    - 写入 Buffer：服务端可以使用 fs.writeFile 直接将 Buffer 写入磁盘，这适用于小文件或文件的小块。
    - 写入 Stream：对于 Stream，服务端可以使用 pipe 方法将数据流传输到 fs.createWriteStream，这允许服务端以流式方式写入文件，适合大文件上传。
4. **确认上传**：服务器完成写入后，应向客户端发送相应的 HTTP 响应状态码和消息，例如 200 OK 或 201 Created 表示上传成功，400 Bad Request 或 500 Internal Server Error 等表示上传失败或出现错误。
5. **Stream 关闭**：在使用 Stream 时，通常需要在数据传输完成后或出现错误时关闭 Stream。对于 ReadableStream，可以通过 stream.destroy() 方法来关闭 Stream，并释放相关资源。

## 前端上传

### 通过 `<input type="file">`

```html
<input type="file" id="fileInput" multiple />
<script>
    const fileInput = document.getElementById('fileInput')
    const files = fileInput.files
    // 创建FormData对象
    const formData = new FormData()
    // 遍历所有选中的文件并添加到FormData中
    for (var i = 0; i < files.length; i++) {
        formData.append('file' + i, files[i])
    }
    // 处理文件上传
</script>
```

### 拖拽上传 `event.dataTransfer.files`

```html
<div id="dropZone"></div>
<script>
    const dropZone = document.getElementById('dropZone')

    dropZone.addEventListener('dragover', function (event) {
        event.preventDefault() // 阻止默认行为
        event.dataTransfer.dropEffect = 'copy' // 显示为复制状态
    })

    dropZone.addEventListener('drop', function (event) {
        event.preventDefault()
        handleFiles(event.dataTransfer.files) // 处理拖放的文件
    })

    function handleFiles(files) {
        // 处理文件上传
    }
</script>
```

## 大文件上传

1. **分块上传**：将大文件分成多个小块，分别上传，这样可以降低单次上传的数据量，提高上传成功率。
2. **断点续传**：在上传过程中，如果出现网络问题或中断，可以从上次上传的位置继续上传，而不必重新开始。
3. 优化传输协议：选择合适的传输协议，如 HTTP 分块传输编码等。
4. 设置上传进度反馈：让用户能够实时了解上传进度。
5. 服务器端优化：服务器端需要对接收和处理大文件进行相应的优化。

### 分片上传

-   使用 `file.slice(start, end, contentType)` 来分片
-   `slice` 是 `Blob` `对象的一个方法，File` 继承自 `Blob`

```js
function chunkedUpload(file, url) {
    const chunkSize = 2 * 1024 * 1024 // 2MB per chunk
    const totalChunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0

    function uploadNextChunk() {
        if (currentChunk >= totalChunks) {
            console.log('All chunks uploaded.')
            return
        }

        const chunk = file.slice(currentChunk * chunkSize, (currentChunk + 1) * chunkSize)
        const formData = new FormData()
        formData.append('file', chunk, file.name)

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-File-Name': encodeURIComponent(file.name),
                'X-File-Size': file.size,
                'X-Chunk-Index': currentChunk,
                'X-Total-Chunks': totalChunks
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                currentChunk++
                uploadNextChunk()
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            })
    }

    uploadNextChunk()
}

// 使用示例
const fileInput = document.querySelector('input[type="file"]')
fileInput.addEventListener('change', event => {
    const file = event.target.files[0]
    if (file) {
        chunkedUpload(file, '/upload-url')
    }
})
```

### 断点续传

#### 客户端实现

1. 分片上传：将文件分割成多个小块，每块单独上传。
2. ❗️ 记录上传状态：使用本地存储（如 localStorage、IndexedDB 等）记录每个分片的上传状态。
3. 检查已上传分片：在上传前，从本地存储中读取已上传分片的状态，并跳过这些分片。
4. 上传分片：上传未完成的分片，同时记录上传进度。
5. 更新上传状态：每上传成功一个分片，更新本地存储中的上传状态。
6. 处理中断：如果上传中断，下次上传时检查本地存储中的上传状态，并从最后一个成功上传的分片继续。

#### 服务器端实现

1. 接收分片：服务器端需要能够接收分片，并根据分片的索引存储。
2. 验证分片：服务器端需要验证每个分片的完整性和顺序。
3. 合并文件：当所有分片都上传完毕后，服务器端需要按照正确的顺序合并这些分片。
4. 返回分片状态：服务器端可以返回每个分片的上传状态，客户端可以根据这些信息跳过已上传的分片。
5. 支持断点续传：服务器端需要能够处理不按顺序上传的分片。

#### 简单示例

```js
function chunkedUpload(file) {
    const chunkSize = 1 * 1024 * 1024 // 1MB per chunk
    const chunks = Math.ceil(file.size / chunkSize)
    let uploadedChunks = JSON.parse(localStorage.getItem('uploadedChunks_' + file.name)) || []

    for (let i = 0; i < chunks; i++) {
        if (uploadedChunks.includes(i)) continue // Skip already uploaded chunks

        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize)
        const formData = new FormData()
        formData.append('file', chunk)
        formData.append('index', i)
        formData.append('chunks', chunks)
        formData.append('filename', file.name)

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    uploadedChunks.push(i) // Mark this chunk as uploaded
                    localStorage.setItem('uploadedChunks_' + file.name, JSON.stringify(uploadedChunks))
                    if (uploadedChunks.length === chunks) {
                        alert('File uploaded successfully!')
                    }
                }
            })
            .catch(error => console.error('Upload error:', error))
    }
}

document.getElementById('fileInput').addEventListener('change', event => {
    const file = event.target.files[0]
    if (file) {
        chunkedUpload(file)
    }
})
```

### Stream 上传和分片上传

分片上传的核心思想确实是将大文件分割成多个小的片段（分片），每个分片可以独立上传，以避免因文件体积过大而超出 HTTP 请求体（HTTP Body）的大小限制。以下是分片上传和使用 Stream 上传的一些区别和特点：

#### 分片上传

-   分片上传通常涉及将文件分割成多个小块，每个小块的大小通常根据服务器配置的 HTTP 请求体大小限制来确定。
-   每个分片使用独立的 HTTP 请求上传，这意味着可以并行上传多个分片，提高上传效率。
-   分片上传支持断点续传，如果上传过程中某个分片上传失败，只需重新上传该分片，而不是整个文件。
-   分片上传在客户端使用 Buffer 来处理文件数据，每个分片作为一个 Buffer 对象通过 HTTP 请求发送。

##### 优点

-   **断点续传**：如果上传失败，只需重新上传未完成的分片。
-   **并行上传**：多个分片可以同时上传，提高效率。
-   **适应性**：适合大文件上传，即使在网络条件不佳的情况下。

##### 缺点

-   **复杂性**：客户端和服务器端都需要处理分片的逻辑。
-   **资源消耗**：保持多个 HTTP 连接可能会增加服务器的资源消耗。
-   **状态管理**：服务端需要维护上传状态，确保分片的正确组装。

#### Stream 上传

-   Stream 上传使用单个 HTTP 请求，通过持续发送数据流来上传文件，而不是一次性发送整个文件内容。
-   Stream 上传适用于实时数据传输，如视频直播、实时日志传输等场景。
-   由于 Stream 上传是连续的，它通常不受单个 HTTP 请求体大小的限制，但可能受到底层网络和服务器配置的限制。
-   Stream 上传可以实现实时交互，如上传进度反馈，但不支持断点续传。

##### 优点

-   **简单性**：使用单个 HTTP 请求，简化了上传逻辑。
-   **实时性**：适合需要实时处理的场景，如直播。
-   **连续性**：数据可以连续流动，不需要预先分割。

##### 缺点

-   **断点续传**：不支持断点续传，上传失败可能需要重传整个文件。
-   **串行上传**：数据按顺序发送，无法实现并行上传。
-   **超时限制**：可能受到服务器超时设置的限制，需要合理配置超时时间。

在实际应用中，选择分片上传还是 Stream 上传取决于具体需求和场景：

-   对于大文件上传，特别是需要高可靠性和支持断点续传的场景，分片上传通常是更好的选择。
-   对于实时数据传输，或者当文件内容在上传时仍在生成或变化时，Stream 上传可能更合适。

#### Stream 结合分片上传

分片上传的每个分片也使用 stream 上传
