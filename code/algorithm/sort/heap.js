// i表示当前节点，n表示，只堆化n和前面的元素
function heapify(arr, n, i) {
    // 假设当前节点为最大值
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right
    }

    // 如果当前节点不是最大值，则将最大值交换到当前节点
    if (largest !== i) {
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
        // 堆化子节点，因为与子节点与当前节点换了，所以如果子节点也是根节点的话需要再次对其进行堆化
        heapify(arr, n, largest)
    }
}

function heapSort(arr) {
    const len = arr.length

    // 从最后一个根节点往上堆化，堆化完成后第一个根节点最大，但是不能确定左右两个子节点谁大谁小
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(arr, len, i)
    }

    // 从最后一个元素开始，将其与堆顶元素交换，然后重新堆化
    for (let i = len - 1; i > 0; i--) {
        // 交换堆顶与当前元素
        ;[arr[0], arr[i]] = [arr[i], arr[0]]
        // 从根节点堆化
        heapify(arr, i, 0)
    }
}
const arr = [64, 34, 25, 12, 22, 11, 90, 25, 0, 99, 12]

heapSort(arr)
console.log(arr)
