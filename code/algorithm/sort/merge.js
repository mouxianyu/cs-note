function mergeSort(arr) {
    // 如果数组只有一个元素，返回该数组
    if (arr.length <= 1) return arr

    // 计算中间索引
    const middle = Math.floor(arr.length / 2)
    // 递归地对左右两半进行排序
    const leftArr = mergeSort(arr.slice(0, middle))
    const rightArr = mergeSort(arr.slice(middle))
    // 合并两个数组
    return merge(leftArr, rightArr)
}

// 合并两个数组
function merge(leftArr, rightArr) {
    let result = []
    let leftIndex = 0
    let rightIndex = 0
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        if (leftArr[leftIndex] < rightArr[rightIndex]) {
            result.push(leftArr[leftIndex])
            leftIndex++
        } else {
            result.push(rightArr[rightIndex])
            rightIndex++
        }
    }
    // 当一个数组被完全合并后，将另一个数组的剩余元素添加到结果数组中
    return result.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex))
}

const arr = [64, 34, 25, 12, 22, 11, 90, 25, 0, 99, 12]

console.log(mergeSort(arr))
