// 插入排序：选择有序元素后面的第一个无序元素，将其插入有序元素的具体位置，依此类推
function insertSort(arr) {
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
        let j = i + 1
        const selectValue = arr[j]
        // 大于选择元素的往后顺移一位
        while (j > 0 && selectValue < arr[j - 1]) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = selectValue
    }
    return arr
}

const arr = [64, 34, 25, 12, 22, 11, 90, 25, 0, 99, 12]

console.log(insertSort(arr))
