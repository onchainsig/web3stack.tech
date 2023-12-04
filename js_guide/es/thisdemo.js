
function foo(b) {
    console.log(this.a, b)
    return this.a + b
}

const obj = { a: 10 }

const bar = foo.bind(obj)
console.log(bar.name)

const res = bar(10)
console.log(res)

function s1(a) {
    this.a = a
}

let ss = new s1(21)
console.log(ss.a)

