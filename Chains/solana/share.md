# Solana Blockchain Sharing

**Topic**

分享一些关于 Solana 区块链的知识，偏重于如何开发一个基于 Solana 的钱包，包括地址生成、私钥保存、交易签名、交易广播等。



本地钱包

- 私钥
- 地址
- 交易和签名
- HD 和助记词



与 Solana 网络交互

- SOL 转账和 Token 转账为例子
  - 理解 Account
  - 理解 Program
  - 理解 Transaction
    - 如何构造交易
    - Instructions
    - Instruction data 编解码
- 交易广播
  - 离线签名
  - 广播交易
  - 什么时候 Re-sign
- RPC API
  - Commitment level
  - 额外参数：encoding ...



深入

- Legacy transaction 和 Versioned transaction
  - 一笔交易的结构
- Solana 的多签
- 分析 getBlock 和 getTransaction 的 Response，都包括哪些内容
- 简单看 MPC 应该是什么样子的