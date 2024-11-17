# Build a blockchain

## 私钥、签名和地址

使用 Rust 语言构建区块链，需要知道如何创建私钥、生成签名和衍生地址。相关的 crate 有：

- [secp256k1](https://docs.rs/secp256k1/latest/secp256k1/)
- [k256](https://crates.io/crates/k256)
  - https://iqlusion.blog/k256-crate-pure-rust-projective-secp256k1-library

## 以太坊的参考实现

- [Ethereum for Rust developers](https://ethereum.org/en/developers/docs/programming-languages/rust/) - Use Ethereum to create decentralized applications (or "dapps") that utilize the benefits of cryptocurrency and blockchain technology. These dapps can be trustworthy, meaning that once they are deployed to Ethereum, they will always run as programmed. They can control digital assets in order to create new kinds of financial applications. They can be decentralized, meaning that no single entity or person controls them and are nearly impossible to censor.
- [Build A Blockchain with Rust](https://github.com/jacob-chia/tinychain) - 用 Rust 写一个简单的区块链，有代码和文档，入门非常好。
- [How to build a blockchain in Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/) - 这是一篇博客，介绍用 rust 构建一个简单的区块链。

### Merkle Tree

- [Merkle Patricia Trie in Ethereum](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
- [以太坊的状态存储](https://www.zlog.in/post/state-in-ethereum/) - 以太坊是由交易驱动的状态机，一笔正确有效的交易将以太坊的当前状态变更为下一个状态。区块是交易集合的基本单位，一个有效的区块包含多笔交易。当一个有效区块被加入到以太坊的区块链中，也就意味着该区块包含的所有交易完成了一次对以太坊的状态更新。

### RLP

- [Recursive-length prefix (RLP) serialization](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/)

### Database

- [rocksdb](https://github.com/facebook/rocksdb) - A library that provides an embeddable, persistent key-value store for fast storage. https://rocksdb.org/

### p2p

todo
