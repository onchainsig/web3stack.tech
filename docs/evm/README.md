# EVM

在使用和学习 Solidity 以及 Ethereum 的时候，不可避免的会碰到 EVM，所以对 EVM 也做些深入的了解。

这里有篇深入介绍 EVM 的文章 (Diving Into The Ethereum Virtual Machine)

1. [中文翻译](https://github.com/AmazingAng/WTF-Solidity/blob/main/Topics/Translation/DiveEVM2017/readme.md)
2. [英文原文](https://blog.qtum.org/diving-into-the-ethereum-vm-6e8d5d2f3c30)

其他资源还有

- [The Ethereum Virtual Machine — How does it work?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [What is Smart Contract Storage Layout?](https://docs.alchemy.com/docs/smart-contract-storage-layout)
- [WTF EVM Opcodes](https://github.com/WTFAcademy/WTF-EVM-Opcodes)
- [Ethereum EVM illustrated by Takenobu T.](https://github.com/takenobu-hs/ethereum-evm-illustrated)
- [Demystifying Ethereum Assembly by Joshua Riley](https://www.youtube.com/watch?v=btDOvn8pLkA)
- [evm-opcodes](https://github.com/wolflo/evm-opcodes)
- [evm-from-scratch](https://github.com/w1nt3r-eth/evm-from-scratch)
- [evm.codes](https://evm.codes/)
- Deep in EVM: [1](https://mirror.xyz/xyyme.eth/GNVcUgKAOEiLyClKeqkmD35ctLu6_XomT3ZDIfV3tz8), [2](https://mirror.xyz/xyyme.eth/6vqE2DRsMzlPNmh3kYiwTdMBj-9hanmxyDuTHM7tZDU), [3](https://mirror.xyz/xyyme.eth/dsU7KoQLyqiHrY0bQX2ETq1zkDYiW-3PtzxfzGwRdss)

## EVM 基础

EVM 的基本架构主要包括堆栈，内存，存储，EVM字节码，和燃料费。

![EVM Arch](../img/evm-1.png)

EVM 基本的执行流程：

![EVM Flow](../img/evm-2.png)
