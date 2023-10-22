# Javascript 

最近在重温 **Javascript** (下文简称 JS) 的生态，由于在 Web3 领域下，JS 是不可或缺的主力开发语言，掌握 JS 变得重要了很多。

关于 JS 的历史、发展、演变过程，不做过多赘述，可以在网上找到大量的相关资料。

在正式开始之前，需要澄清一些概念：

- ECMAScript
  - [ECMA262](https://tc39.es/ecma262/)
- CommonJS
- Javascript
- Node.js
- Typescript
- [V8 Engine](https://v8.dev/)
- npm & pnpm & npx
- React & Vue & Next.js



大纲

1. 认识 Javascript & ES6
2. 学习一下 Typescript
3. 伸向服务端的 Node.js
4. 探一探 Node.js, V8 引擎等的核心原理
5. 重要功能详解
   1. ES 引以为傲的异步事件处理 Promise, async/await
   2. JS 精简的语言表达
   3. ...
6. 常用类库介绍



## 认识 Javascript & ES6

### 对 JS 的基本认识

JS 是 ECMAScript 标准的一个实现，由 TC39 委员会指导，ECMA 主持。它在浏览器和其他 JS 环境中运行，如 Node.js。

JS 是一种多范式语言，这意味着其语法和功能允许开发者混合和匹配来自各种主要范式的概念，如面向过程、面向对象 (OO/classes) 和函数式 (FP)。

JS 是一种编译语言，意味着工具（包括 JS 引擎）在程序执行前会对其进行处理和验证（抛出存在的错误！）。

### JS 核心

#### 每个文件都是一个程序

在 JS 中每个文件都可以被视为是一个程序，多个文件组合在一起的程序，他们通过全局范围共享状态；从 ES6 开始，JS 支持模块导入，模块也是基于文件的。

#### 值

值是最基本的单位。JS 中有两类值：原始的和对象的。

原始的值原始字面量值，比如 false/true(bool 值), "hello"(字符串值), 123(整数值)：**布尔**，**数字**，**字符串**，**null**，**undefined**，**Symbol**(不经常使用)

```javascript
let name = "Kly";
console.log("My name is ${name}.");  // My name is ${name}.
console.log('My name is ${name}.');  // My name is ${name}.
console.log(`My name is ${name}.`);  // My name is Kly.

const PI = 3.1415926;
const MALE = true;
let person = null;
```

另外一类值是对象，数组是一种特殊的对象，它由一个有序的、有数字索引的数据列表组成。

```javascript
let names = ["Frank", "Kkk", "Smith"];
names.length;
names[0];
names[1];
```

对象是更像是：一个无序的、有键的任何各种值的集合。

```javascript
let me = {
    first: "Kyle",
    last: "Simpson",
    age: 39,
    specialties: ["JS", "Table Tennis"],
};

console.log(`My name is ${me.first}.`);
me["first"];
```

类型判断

```javascript
typeof 42; // "number"
typeof "abc"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" -- 哎呀，bug!
typeof { a: 1 }; // "object"
typeof [1, 2, 3]; // "object"
typeof function hello() {}; // "function"
```



作用域/闭包

原型/对象

类型/强制转换

### es module



## 学习一下 Typescript

> TypeScript is **JavaScript with syntax for types.**
>
> -- https://www.typescriptlang.org/

简言之，TypeScript 是构建在 JavaScript 之上的强类型编程语言，安全、可靠、放心使用。

TypeScript 也和 Node.js 建立起了非常紧密的联系，比如

- [NestJS](https://nestjs.com/) - robust and fully-featured framework that makes creating scalable and well-architected systems easy and pleasant
- [TypeORM](https://typeorm.io/#/) - great ORM influenced by other well-known tools from other languages like Hibernate, Doctrine or Entity Framework
- [Prisma](https://prisma.io/) - next-generation ORM featuring a declarative data model, generated migrations and fully type-safe database queries
- [RxJS](https://rxjs.dev/) - widely used library for reactive programming
- [AdonisJS](https://adonisjs.com/) - A fully featured web framework with Node.js
- [FoalTs](https://foalts.org/) - The Elegant Nodejs Framework

## 探一探 Node.js, V8 引擎等的核心原理

Node.js 是异步的事件驱动的服务端的 JS 运行时环境，目标是构建可扩展的网络应用。

- [Node 每个版本支持了 ES 规范的哪些特性](https://node.green/)
- 可以在这里发现 Node.js 的 [examples](https://github.com/nodejs/examples)

### npm

npm 是 Node.js 的标准包管理器。

1. npm install 做了什么
2. npm run 做了什么

### Node.js

Node.js 是一个开源的、跨平台的 Javascript 运行时环境，它运行 V8 引擎，使得 Node.js 具备非常高的性能。此外，Node.js 应用程序在单个进程中运行，不需要为每个请求都创建新线程，Node.js 在标准库中提供了一组异步 IO 原语，防止 JS 代码阻塞。

Node.js 在执行 IO 操作时，比如从网络读取数据、访问数据库或者文件系统，不会阻塞线程耗费 CPU 事件等待，取而代之采取的做法是当响应到达时再唤醒线程处理数据；使得 Node.js 能够通过单个服务器处理数千个并发连接而不需要引入管理线程并发的负担。

如果做过前端开发的话，会了解到 JS 也会运行在浏览器中，那浏览器和 Node.js 运行环境有什么区别呢？感兴趣可以了解 [Differences between Node.js and the Browser](https://nodejs.dev/en/learn/differences-between-nodejs-and-the-browser/) 。

- Debugging supported
- Profiler

**Node.js Architecture**

![node.js-architecture](assets/node.js-architecture.png)



#### Event Loop

尽管 JS 是单线程的，Event Loop 使得 Node.js 以非阻塞 IO 的方式来运行，换句话说，Node.js 将 IO 这类繁重的工作负载交给内核去完成；一般操作系统的内核线程是有多个的，也就是以多线程的方式运行内核任务，一旦内核完成 IO 操作，就会通知 Node.js 的线程去处理数据，这种通知是以一种队列的形式；这种设计思想跟 **Redis** 非常像；这也从一定程度上能更好的理解 JS 中的 callback pattern.

更加详细的解释可以看这里 [The Node.js Event Loop, Timers, and `process.nextTick()`](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)

接下来，直观的理解一下 Node.js 中的阻塞和非阻塞

```javascript
const fs = require('fs');

// Blocking
const data = fs.readFileSync('a.json');
console.log(data);
moreWorkToDo();

// Non-blocking
fs.readFile('a.json', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWorkToDo();
```

`fs.readFile('', callback)` 以一种非阻塞的方式运行，读取文件是 IO 操作，内核会在 IO 操作完成后通知 Node.js 的线程来处理，处理逻辑就在 callback function 里，moreWorkToDo() 函数大概率是早于 console.log 被调用的；而 `fs.readFileSync('')` 以阻塞的方式运行，IO 完成后才会继续运行后面的代码。

我们从 Node.js 的 API 设计可见，它推荐在开发过程中尽量使用非阻塞 API，混用阻塞 API 和非阻塞 API 有时会出现莫名其妙的 Bug。

**异步和 callback**

写过前端代码的话，都知道 JS 是运行在浏览器中，JS 在运行过程中是单线程同步运行的，但是在浏览器中仍然需要处理 onClick(), onMouseOver(), onSubmit() 等事件，这些肯定是需要异步通知来触发 JS 代码的执行，这个异步回调的能力恰巧就是浏览器赋予的。

```javascript
// 浏览器中
document.getElementById('button').addEventListener('click', () => {
  // 这里就是 callback function
  console.log('trigger when the button clicked.');
});
```

JS 中的函数是一等公民，可以赋值给变量，而且可以作为参数传递给其他函数。

JS 中如何处理 error 呢？在 Node.js 中，是把 error 参数放在回调函数的第一个位置，比如

```javascript
const fs = require('fs');
fs.readFile('a.json', (err, data) => {
  // ...
});
```

我们可以看到 Node.js 的异步处理需要借助 callback function，因为在 IO 处理完成后需要触发一段 JS 代码，这段代码需要以 callback function 的方式来触发；那如果 callback function 里还是需要异步处理呢？就只能 callback function 里再包含 callback function, 依次类推 ... 这种现象被称为回调地狱，给我们编写 JS 代码带来了非常大的影响，代码可读性差。

**Promise & async/await**

针对上面的问题，ES6 和 ES2017 增加了异步的终极解决方案 Promise & async/await .

**process.netxTick()**

```javascript
process.nextTick(() => {
  // do something...
});
```

nextTick() 的主要作用是在当次 Event Loop 结束后，下个 Loop 开始之前执行所有注册到 nextTick 里的 function，尽可能块的去执行这些代码。



### Node.js Module

包管理和模块管理是每个编程语言的必备特性，模块管理能帮助我们更好的组织代码，更好的写出模块化的代码；Node.js 支持两种类型的 Module 管理方式：CommonJS 和 ES Module.

#### CommonJS Module

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。CommonJS规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。

```javascript
// Module 的基本原理
// Node 内部提供一个 Module 的构建函数，所有的模块都有 module 实例，代表当前模块
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.path = '';
  this.children = [];
  // ...
}
// module.id 模块的识别符，通常是带有绝对路径的模块文件名。
// module.filename 模块的文件名，带有绝对路径。
// module.loaded 返回一个布尔值，表示模块是否已经完成加载。
// module.parent 返回一个对象，表示调用该模块的模块。
// module.children 返回一个数组，表示该模块要用到的其他模块。
// module.exports 表示模块对外输出的值。

// ------ Usage ------
module.exports = (x, y) => { return x+y; }

// Option 2
module.exports.add = (x, y) => { return x + y; }

// Option 3
const addFunc = (x, y) => { return x + y; }
module.exports = {add: addFunc}

// 无效的 exports
exports = { ... }
           
// Option 4
exports.div = (x, y) => { return x / y; }
```

- module.exports 是指向 module 对象本身的 exports，如果 module.exports = ... 会覆盖掉之前导出的所有配置
- 也可以使用 exports, 其实就是 exports = module.exports。用 exports = ... 没有意义，不会改变 module.exports 的导出结果
- 可以 module.exports.[member] 导出任何想导出的东西
- 也可以 module.exports = { ... } 在对象中放入想导出的内容

编程建议：**尽量使用 module.exports ，因为这样可以处理所有需要导出的场景。**

此外，Node.js 内置的`require`命令用于加载模块文件。 `require`命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。

require 加载规则

- 如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。比如，`require('/home/marco/foo.js')`将加载`/home/marco/foo.js`
- 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，`require('./circle')`将加载当前脚本同一目录的`circle.js`。
- 如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）。举例来说，脚本`/home/user/projects/foo.js`执行了`require('bar.js')`命令，Node会依次搜索以下文件。
  - /usr/local/lib/node/bar.js
  - /home/user/projects/node_modules/bar.js
  - /home/user/node_modules/bar.js
  - /home/node_modules/bar.js
  - /node_modules/bar.js
- 如果参数字符串不以“./“或”/“开头，而且是一个路径，比如`require('example-module/path/to/file')`，则将先找到`example-module`的位置，然后再以它为参数，找到后续路径。
- 如果指定的模块文件没有发现，Node会尝试为文件名添加`.js`、`.json`、`.node`后，再去搜索。`.js`件会以文本格式的JavaScript脚本文件解析，`.json`文件会以JSON格式的文本文件解析，`.node`文件会以编译后的二进制文件解析。

Reference: [CommonJS规范](https://javascript.ruanyifeng.com/nodejs/module.html)

### [V8 Engine](https://v8.dev/)

V8 是有 Google Chrome 开发的 JS 引擎，它可以解析并执行 JS 代码。当然还有很多其他团队开发的 JS 引擎，比如：

1. Firefox 的 [**SpiderMonkey**](https://spidermonkey.dev/)
2. Safari 的 [**JavaScriptCore**](https://developer.apple.com/documentation/javascriptcore)

JS 目前是一种编译的方式去执行，V8 会将 JS 代码先进行 JIT 编译，优化等，这个思想源自于 Firefox，这样可以提升 JS 的性能。

### libuv

...

## 常用类库

### [cross-env](https://www.npmjs.com/package/cross-env)

> Run scripts that set and use environment variables across platforms.

简而言之就是解决跨操作系统环境变量设置差异的问题。

- Install

```shell
npm install --save-dev cross-env
```

- Usage

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=dev node ./src/index.js"
  }
}
```

### Koa

> Next generation web framework for node.js
>
> https://koajs.com/

Koa 是一个 Web 框架，aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.

## Reference

**Javascript & ES**

- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [MDN Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)

**Node.js Architecture**

- [通过源码分析 Node.js 原理](https://github.com/theanarkh/understand-nodejs)
- [How Node.js Works Under the Hood: A Deep Dive](https://medium.com/@AbbasPlusPlus/how-node-js-works-under-the-hood-a-deep-dive-77da13adfa52)
- [What is Node.js: A Comprehensive Guide](https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-nodejs)
- [Node JS Architecture - Single Threaded Event Loop](https://www.digitalocean.com/community/tutorials/node-js-architecture-single-threaded-event-loop)
- [Event Loops in Node.js: A Deep Dive into LibUV, Thread Pool, and Event Instances](https://medium.com/@thiru_73177/event-loops-in-node-js-a-deep-dive-into-libuv-thread-pool-and-event-instances-4054d9c6fde8)
