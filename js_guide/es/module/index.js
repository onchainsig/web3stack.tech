import defaultlib, { now, PI } from './lib.js'

const main = async () => {
    console.log(now())

    defaultlib.hello()

    console.log(PI)
}

main()
