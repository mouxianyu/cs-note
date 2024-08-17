// 选择排序：选择最大（最小的元素），依次放到前面，后面未排序的依次进行该操作
function selectSort(arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            // 选择后面最小的元素
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        // 交换当前元素与最小的元素
        const temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}

const arr = [64, 34, 25, 12, 22, 11, 90, 25, 0, 99, 12]

console.log(selectSort(arr))
