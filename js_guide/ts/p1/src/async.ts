
// type MyExecutor<T, E extends Error> = (
//     resolve: (result: T) => void, 
//     reject: (error: E) => void,
// ) => void;

// class MyPromise<T, E extends Error> {
//     constructor(executor: MyExecutor<T, E>) {
//     }

//     then<U, F extends Error>(g: (result: T) => MyPromise<U, F>): MyPromise<U, F> {
//         // TODO
//         return new MyPromise<U, F>((resolve, reject) => { });
//     }

//     catch<U, F extends Error>(g: (error: E) => MyPromise<U, F>): MyPromise<U, F> {
//         // TODO
//         return new MyPromise<U, F>((resolve, reject) => { });
//     }
// }

type MyExecutor<T> = (
    resolve: (result: T) => void, 
    reject: (error: unknown) => void,
) => void;

class MyPromise<T> {
    constructor(executor: MyExecutor<T>) {
    }

    then<U>(g: (result: T) => MyPromise<U>): MyPromise<U> {
        // TODO
        return new MyPromise<U>((resolve, reject) => { });
    }

    catch<U>(g: (error: unknown) => MyPromise<U>): MyPromise<U> {
        // TODO
        return new MyPromise<U>((resolve, reject) => { });
    }
}