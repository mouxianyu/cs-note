// 冒泡排序：对比相邻的元素，根据升序还是降序，看是否交换两者的位置
function bubbleSort(arr) {
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            // 如果后面元素比较小，交换它们
            if (arr[j + 1] < arr[j]) {
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

const arr = [64, 34, 25, 12, 22, 11, 90, 25, 0, 99, 12]

console.log(bubbleSort(arr))
