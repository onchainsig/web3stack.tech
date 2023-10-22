import Koa, { HttpError } from "koa"

console.log(HttpError);

const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}`);
})

app.listen(3000);
