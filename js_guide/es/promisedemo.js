const p1 = new Promise(function(resolve, reject) {
    resolve(100)
})

p1.then(function(value) {
    console.log('p1 -> ' + value)
}).catch(function(error) {
    console.log('p1 -> ' + error)
})

const p2 = new Promise((resolve, reject) => {
    reject('error')
})

p2.then(function(value) {
    console.log('p2 -> ' + value)
}).catch(function(error) {
    console.log('p2 -> ' + error)
})

const p3 = new Promise((resolve, reject) => {
    throw new Error('uncaught error')
})

p3.catch(function(error) {
    console.log('p3 -> ' + error)
    console.log(typeof error)
})

///

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => { reject(new Error('failed')) }, 3000)
})

// p5 返回的是一个 Promise 对象，因此状态依赖于 p4
const p5 = new Promise((resolve, reject) => {
    setTimeout(() => { resolve(p4) }, 1000)
})

p5.then(function(value) {
    console.log('p5 -> ' + value)
}).catch(function(error) { 
    console.log('p5 -> ' + error)
})
