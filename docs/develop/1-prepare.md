# Prepare

## 环境和工具

- Node - 安装 NodeJs 和 npm 等，版本 Node Stable Version
- Web3.js - Web3.js 是以太坊广泛使用的开发包
- ethers.js - ethers.js 是比 web3.js 更安全的基础库
- Ganache - Ganache 是一个独立的本地以太坊测试环境，可以用来测试 Contracts 等

```shell
npm install -g ganache-cli
```

- Truffle - Truffle 是一个优秀的开发环境、测试框架、以太坊的资源管理通道；但是逐渐被 Hardhat 取代
- Hardhat - 当前比较流行的开发工具，推荐使用
- Remix - 一个智能合约编程语言 Solidity 的集成开发环境
- MetaMask
- Mist
- solc & solc-cli & abigen - 合约编译器和 abi 生成工具
- 区块浏览器 - eth scan, bsc scan, polygon scan ...
- 测试网络和主网 - 目前可用的测试网络：Goerli, Sepolia, 推荐使用 Goerli
- 基础设施提供商 - Infura, Alchemy, Tatum, Noderel, Quicknode, Lamanode, Getblock, Pokt Network, Ankr, Chainstack, Blockdaemon, Coinbase Cloud, Nownodes, Infstones, Watchdata ...