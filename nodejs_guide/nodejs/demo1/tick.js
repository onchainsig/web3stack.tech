console.log('Hello => 1');

setImmediate(() => {
    console.log('Hello => 3, before timeout');
});

setTimeout(() => {
    console.log('Hello => 4, last');
}, 1);

process.nextTick(() => {
    console.log('Hello => 2, next tick');
});
