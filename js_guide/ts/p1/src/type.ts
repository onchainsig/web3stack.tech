function tx() {
    return { txId: '', blockNumber: 100 }
}

type TxType = ReturnType<typeof tx>

enum Status {
    // Pending = 'pending',
    // Confirmed = 'confirmed',
    // Failed = 'failed'
    Pending,
    Confirmed,
    Failed,
}

const StatusValues = Object.values(Status)
type StatusTypes = (typeof StatusValues)[number]

const p1 = Status.Pending
const p2 = Status[0]
const p3 = Status['Pending']
// const p4 = Status[4]
console.log(p2)
console.log(typeof p2)

console.log(p1)
console.log(p3)

StatusValues.forEach((v) => {
    console.log(v)
})
