# 智能合约实现白名单

如何使用在智能合约中实现白名单功能呢，比如有时候我们项目的初始阶段只想让一些天使用户的地址能够申领 NFT ...

至少有三种方式：

1. 在合约中使用 mapping 存储
2. 使用 Markel Tree
3. 结合后端服务

## mapping 存储

这种方式比较简单，合约的管理员可以设置和更新白名单地址，放在 storage 中存储，但是当白名单地址很多时非常的耗费 gas，从节约成本的角度考虑，这种方式不是很好。

## Merkle Tree 方式

这种方式基本原理是把白名单地址生成一棵 Merkle Tree，然后把根节点的 hash 值存储在合约中，这样就可以节约很多 gas。

1. 生成 Merkle Tree 的过程是 off-chain 的，可以使用任何语言实现，比如使用 Javascript 的 [merkletreejs](https://github.com/merkletreejs/merkletreejs)
2. 部署合约并将 Merkle Tree 的根节点 hash 值存储在合约中
3. 当有人想 Mint 的时候，需要提供自己的地址和 Merkle Proof，合约会验证 Merkle Proof 是否正确；而 Proof 的获取需要项目方来帮用户生成
4. 用户拿到 Merkle Proof 后，调用合约来做 Mint 操作
5. 合约会结合 Proof 验证发送者地址是否在 Merkle Tree 中，如果在则 Mint 成功；合约中一般使用 [MerkleProof](https://docs.openzeppelin.com/contracts/3.x/api/cryptography#MerkleProof) 验证

```javascript
// 生成 Merkle Tree

```
