type ClassConstructor<T> = new(...args: any[]) => T

type DebugValuable = {
    getDebugValue(): object
}

function withEZDebug<C extends ClassConstructor<DebugValuable>>(Class: C) {
    return class extends Class {
        constructor(...args: any[]) {
            super(...args)
        }

        debug() {
            let name = Class.constructor.name
            let value = this.getDebugValue()
            return name + '(' + JSON.stringify(value) + ')'
        }
    }
}

class HardToDebugUser {
    constructor(
        private id: number,
        private firstName: string,
        private lastName: string
    ) { }

    getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + ' ' + this.lastName
        }
    }
}

let User = withEZDebug(HardToDebugUser)
let user = new User(12, 'Jim', 'Tang')
console.log(user.debug())