const arrowFuncArgs = info => {
    return arguments
}
function funcArgs(info) {
    const arrowArgs = arrowFuncArgs(info)
    // 打印结果不同
    console.log('arguments', arguments)
    console.log('arrowArgs', arrowArgs)
    return arguments
}

funcArgs('test')
