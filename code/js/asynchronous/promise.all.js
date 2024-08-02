const p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve('p1')
    }, 2000)
})
const p2 = new Promise(resolve => {
    setTimeout(() => {
        resolve('p2')
    }, 500)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p3')
    }, 100)
})

const promises = [p1, p2, p3]

Promise.all(promises)
    .then(values => {
        console.log(values)
    })
    .catch(errs => {
        console.error(errs)
    })
    .finally(() => {
        console.warn('------Promise.all')
    })

Promise.allSettled(promises).then(values => {
    console.log(values)
    console.warn('------Promise.allSettled')
})

Promise.race(promises)
    .then(value => {
        console.log(value)
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
        console.warn('-----Promise.race')
    })
