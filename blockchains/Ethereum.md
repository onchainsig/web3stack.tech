# Ethereum

## Basic Knowledge

- [What are Ethereum commitment levels? Latest, Safe, Finalized](https://www.alchemy.com/overviews/ethereum-commitment-levels)
  - [How The Merge Impacts Ethereum’s Application Layer](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer)
  - Conclusion
    - PoS 共识以后，出块时间是 12s；32 个 slots 组成一个 epoch，可能原因是需要选举 32 validator 进行出块
    - 在每个 epoch 中，理论上可以出 32 个块，12s一个，大概 6.4 min 一个 epoch；但是有小于 1% 的概率会出现无法在当前的 slot 出块的情况，比如被选择的 validator 故障下线了，或者由于网络等诸多因素导致提交不及时
    - PoS 生效后，对于 reorg block 的情况做了一些优化，提出了不同的 commitment level
      - latest：表示区块链最新的区块，不能保证这个块不被 reorg，使用的时候需要特别注意
      - safe: 表示已经收到 2/3 验证者的证明，相对安全，不太可能再发生重组，除非出现一些大规模的协调攻击，这个对攻击者本身带来的成本也是相当大的
      - finalized：表示最终确认的区块，极不可能发生重组，超过 2/3 的验证者已经接受这个区块，攻击者需要 burn 超过 1/3 的验证者抵押的 ether，几乎需要数百万的 ether，攻击成本巨大
- [Blocks in Ethereum](https://ethereum.org/en/developers/docs/blocks/)
  - Block size: 区块大小是受限制的，每个区块的目标是 1500 万 gas ，当然也会随着网络需求增加或者减少，但是最大不能超过 3000 万 gas；size 的大小是动态变化的，但有上限；容量上，上限是 12M，大部分块是 1 ～2 M
  - 出块时间 [Ethereum Average Block Time Chart](https://etherscan.io/chart/blocktime)

