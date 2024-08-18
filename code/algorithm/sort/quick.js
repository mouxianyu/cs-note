// 快速排序，选择一个基准，将大于基准的放到一边，小于基准的放到另一边，再分别对两边递归做快速排序
function quickSort(arr, lowIndex = 0, highIndex = arr.length - 1) {
    if (lowIndex >= highIndex) return arr
    let leftIndex = lowIndex
    let rightIndex = highIndex
    const base = arr[leftIndex]
    let flag = true
    while (leftIndex < rightIndex) {
        if (flag) {
            if (arr[rightIndex] < base) {
                arr[leftIndex] = arr[rightIndex]
                leftIndex++
                flag = false
            } else {
                rightIndex--
            }
        } else {
            if (arr[leftIndex] > base) {
                arr[rightIndex] = arr[leftIndex]
                rightIndex--
                flag = true
            } else {
                leftIndex++
            }
        }
    }
    arr[leftIndex] = base
    quickSort(arr, lowIndex, leftIndex)
    quickSort(arr, leftIndex + 1, highIndex)
    return arr
}

const arr = [64, 34, 25, 12, 22, 11, 90, 25, 0, 99, 12]

console.log(quickSort(arr))
