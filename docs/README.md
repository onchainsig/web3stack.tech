# Docs

Overview

> 智能合约需要一个全新的工程思维，不同于以往项目的开发；因为它犯错的代价是巨大的，并且很难像传统软件那样轻易的打上补丁。

## Common

- Gas limit & Gas used
  - Sending a native token normally costs `21000` gas
  - Sending an ERC20 token normally costs `45000` gas
- [Gas Tracker](gas-tracker.md)

## Contract library & framework

- [OpenZeppelin](https://docs.openzeppelin.com/)

  - [Cairo contracts](https://github.com/OpenZeppelin/cairo-contracts)

- [thirdweb contracts](https://github.com/thirdweb-dev/contracts)
  - https://thirdweb.com/explore
- [以太坊智能合约 —— 最佳安全开发指南](https://github.com/ConsenSys/smart-contract-best-practices/blob/master/README-zh.md)
- [solmate](https://github.com/transmissions11/solmate) - Modern, opinionated, and gas optimized building blocks for smart contract development.
- [ERC721A](https://github.com/chiru-labs/ERC721A) - The goal of ERC721A is to provide a fully compliant implementation of IERC721 with significant gas savings for minting multiple NFTs in a single transaction.
- [Zora v3](https://github.com/ourzora/v3)
- [Safe](https://docs.safe.global/getting-started/readme) - [safe contracts](https://github.com/safe-global/safe-contracts)
- 其他知名项目的合约
  - Compond, Uniswap, Aave, PancakeSwap, Lens ...
- **[useful-solidity-patterns](https://github.com/dragonfly-xyz/useful-solidity-patterns#useful-solidity-patterns) - This repo is an ongoing collection of useful, and occasionally clever, solidity/EVM patterns that actually get used in the wild.**
- [web3 链上工具](https://www.oklink.com/cn/tools) - by OKLink
- [vyper](vyper.md)

## Basic & Infrastructe

- [ethers](ethers.js.md)
- [wagmi](https://github.com/wagmi-dev/wagmi)
- [viem](https://viem.sh/) - Build reliable apps & libraries with lightweight, composable, and type-safe modules that interface with Ethereum

## Solidity & Smart Contract

- [发送 ETH, fallback 和 receive](solidity/sending-eth.md)
- [使用 Solidity 验证签名](solidity/verify-signature.md) & [以太坊签名方法](solidity/ethereum-signature.md)
- [Call, Delegatecall ect.](solidity/contract-call.md) - 合约调用的几种方式
- [Proxy & Upgradable contract](solidity/proxy-and-upgradable-contract.md) - 代理合约与可升级合约
- [Gas Optimizatioin](solidity/gas-optimization.md) - 学习如何做 Gas 优化

### ABI

- [abi encode and decode / input data decoding](abi/abi-decode-method-signature.md) - abi 的编码解码以及函数签名
- [cli: solc, abigen](abi/codegen/README.md) - generate abi, bin, go code ...

### Assembly

- [Inline Assembly](https://docs.soliditylang.org/en/v0.8.21/assembly.html)

## EVM

- [EVM](evm/Readme.md)

## Ethereum Data

- [Ethereum data — Transaction Receipt Trie and Logs Simplified](https://medium.com/coinmonks/ethereum-data-transaction-receipt-trie-and-logs-simplified-30e3ae8dc3cf)

## Chain Features

- [Chains](chains/README.md)

## Develop

- [develop preparement](develop/1-prepare.md)
- [Hardhat](hardhat/introduction.md)
- [ether.js](ethers.js.md)

## EIP

- [Abstract Account](eip/4337.md)

## Application

- [Smart Contract Whitelist](application/whitelist.md)
