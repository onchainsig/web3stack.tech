# Hardhat

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Hardhat 

- Hardhat 内置了一个 network，它是一个本地的以太坊网络，主要用于开发阶段；可以部署合约、运行测试和调试代码，所有的这些动作都在本机环境完成
- 工作方式有两种
  - 进程内的方式，这种方式在没有任何定制化的配置时是默认开启的，所有和区块链的交互都会连接这个进程内的节点
  - 独立进程的方式，这种方式可以接受 JSON-RPC 和 Websocket 请求
    - 运行：`npx hardhat node`，这样会启动一个独立的进程，它会监听 `8545` 端口
    - 如果要连接到本地的节点，可以使用 `--network localhost` 参数
    - 也可以使用 wallet 连接这个 node，比如 metamask 等
  - 默认情况下，每个接收到的交易会出块，并且没有延迟
  - 背后是使用了 `@ethereumjs/vm` 这个 EVM 实现，同样也是 `ganache`, `Remix` 和 `Ethereum Studio` 使用的
- Hardhat network
  - 为什么要使用它 ？
    - 支持 Solidity, 并且具备 stack traces 的能力
