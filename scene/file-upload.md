# 文件上传

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
