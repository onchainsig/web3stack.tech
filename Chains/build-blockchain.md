# Build a blockchain

Resources:

- [awesome-blockchain-rust](https://github.com/rust-in-blockchain/awesome-blockchain-rust) - Collect libraries and packages about blockchain/cryptography in Rust

## 私钥、签名和地址

使用 Rust 语言构建区块链，需要知道如何创建私钥、生成签名和衍生地址。相关的 crate 有：

- [secp256k1](https://docs.rs/secp256k1/latest/secp256k1/)
- [k256](https://crates.io/crates/k256)
  - https://iqlusion.blog/k256-crate-pure-rust-projective-secp256k1-library

## 以太坊的参考实现

- [Ethereum for Rust developers](https://ethereum.org/en/developers/docs/programming-languages/rust/) - Use Ethereum to create decentralized applications (or "dapps") that utilize the benefits of cryptocurrency and blockchain technology. These dapps can be trustworthy, meaning that once they are deployed to Ethereum, they will always run as programmed. They can control digital assets in order to create new kinds of financial applications. They can be decentralized, meaning that no single entity or person controls them and are nearly impossible to censor.
- [Build A Blockchain with Rust](https://github.com/jacob-chia/tinychain) - 用 Rust 写一个简单的区块链，有代码和文档，入门非常好。
- [How to build a blockchain in Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/) - 这是一篇博客，介绍用 rust 构建一个简单的区块链。

- [Erigon](https://erigon.gitbook.io/erigon) - Erigon is an efficiency frontier implementation of Ethereum, designed to provide a faster, more modular and optimised experience.
  - [Transaction Pool Design](https://github.com/erigontech/erigon/wiki/Transaction-Pool-Design)

### Merkle Tree

- [Merkle Patricia Trie in Ethereum](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
- [以太坊的状态存储](https://www.zlog.in/post/state-in-ethereum/) - 以太坊是由交易驱动的状态机，一笔正确有效的交易将以太坊的当前状态变更为下一个状态。区块是交易集合的基本单位，一个有效的区块包含多笔交易。当一个有效区块被加入到以太坊的区块链中，也就意味着该区块包含的所有交易完成了一次对以太坊的状态更新。

### RLP

- [Recursive-length prefix (RLP) serialization](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/)

### Database

- [rocksdb](https://github.com/facebook/rocksdb) - A library that provides an embeddable, persistent key-value store for fast storage. https://rocksdb.org/

### p2p

todo

### mempool or transaction pool

- [加速交易以及如何工作的](https://www.blocknative.com/blog/speed-up-transactions)
  - `Whereas a Cancel transaction is an attempt to overwrite a pending transaction with a *zero value* replacement, a Speed Up is an attempt to accelerate a pending transaction.`

```text
In other words, you still want the transaction to happen; you just want it to happen faster. Therefore, a typical Speed Up transaction will have:

- An identical nonce,
- From the same Wallet address,
- At least a 10% higher gas fee, and
- The identical value, plus
- Gets signed-and-successfully-submitted before the original transaction is confirmed.
```

- [取消交易以及如何工作的](https://www.blocknative.com/blog/canceled-transactions)

```text
On Ethereum, a Cancel transaction is an attempt to overwrite a currently pending transaction with a new transaction. It's important to note that Canceled transactions are a convention and not a standard. Typically, a Cancel transaction will have:

- An identical nonce,
- From the same Wallet address,
- At least a 10% higher ETH gas fee, but
- Zero value, and
- Gets signed-and-successfully-submitted before the original transaction is confirmed.
```

- [What is the Mempool ?](https://www.blocknative.com/blog/mempool-intro)
- [Your gateway to the Mempool](https://www.blocknative.com/blog/mempool-nodes) mempool 的基本原理，nonce 的说明

```text
When a node receives your transaction, the node performs a series checks to see if the transaction can enter the mempool, including:

- Is the signature valid (i.e., the transaction has not been tampered with)?
- Are all required elements – such as the To: and From: addresses – present and valid?
- Is the From: address an external account (and not a contract account)?
- If the transaction transfers value, does the From: address balance cover the value?
- Does the transaction have a gas limit that’s below the block limit?
- Does the transaction fit into the local mempool? [Note 1: we plan explore mempool configuration options, which in turn control
mempool capacity and minimum ETH gas requirements, in a future post in this series.]

Valid transactions that enter the mempool then go into one of two pools — pending or queued. The pending pool is for transactions
that are ready to be processed. These are eligible to be mined and may appear in the next block. The queued pool is for transactions
that are not yet ready to be processed because they are 'out of order.'
```

- [8 lessons master the mempool](https://www.blocknative.com/blog/8-lesson-master-the-mempool)

```text
There's no single source of truth.
Instead, there are thousands of independent mempools, each containing different data.
Transaction data is constantly in motion.
The raw data is sparse and sometimes inconsistent.
This makes definitive mempool data difficult to capture.
Increasing complexity in transaction architectures compounds these challenges.
```

- https://www.blocknative.com/blog/why-the-mempool-matters
- https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest
- https://samczsun.com/escaping-the-dark-forest/
- https://www.blocknative.com/blog/what-is-simulation
- https://www.blocknative.com/blog/blockchain-101
- https://www.blocknative.com/blog/tag/mempool/page/1
- https://chainstack.com/a-developers-guide-to-the-transactions-in-mempool-metamask-edition/

### EVM

- [Revm introduction](https://bluealloy.github.io/revm/introduction.html)
  - [Revm docs](https://docs.rs/revm/latest/revm/index.html)
