# Gas Tracker

Gas Tracker 主要来探索 Ethereum 在 EIP1559 标准之下的 Gas Fee 如何更加精准的预测。

在 Web3 里，有一个精准的 `max fee` 对确保矿工能打包你的交易是非常重要的，如果设置的 `max fee` 低于 `base fee`，那么你的交易大概率会等待很长时间，或者最终被丢弃。

目前，大多数的 Gas Estimator 都是基于网络最大拥堵情况的启发式方法，没有考虑活动的 mempool，Blocknative 利用实时数据和预测模型来计算 gas fee，更加的精准。



## EIP1559

先来搞清楚 EIP1559 是什么。EIP-1559 改变了 Ethereum 的 gas 计算以及 gas 的去处。

- Base fee, 是由区块链本身决定的，最后会 burn 掉
- Priority fee, 可选的，由用户自己决定，会付给矿工
- Max fee, 打包一笔交易到区块中愿意支付的最大 gas fee

使用了 EIP1559 的交易，类型被设置为 2，而之前的 legacy 交易仍然支持，交易类型被设置为 0；EIP1559 没有对 gas limit 做更改，gas limit 仍然是限制一笔交易能花费的 gas 上限



### Base fee 的计算逻辑

base fee 由网络决定而非用户本身，基本逻辑是根据区块的填满程度来决定 base fee 较上一个区块是增加还是减少

比如

- 最新区块只到了区块上限的 50%，那么 base fee 就保持不变，下个区块还是一样的
- 最新区块填满了 100%，base fee 会增加 12.5%
- 最新区块填充程度在 50% ～ 100% 之间，base fee 的增加就小于 12.5%
- 最新区块填充度是 0，base fee 降低最大的 12.5%
- 最新区块填充程度在 0% ～ 50% 之间，base fee 的减少就小于 12.5%

这个机制的主要目的是帮助平稳交易费用并防止突然飙升，它是 100% 自动的，并且可以直接从网络读取。



### Priority fee

表示了用户希望给到矿工的小费，一般情况下 priority fee 越高，矿工更愿意打包交易；但是 base fee + priority fee 不能超过 max fee, 超过了会自动降低 priority fee



### Max fee 的计算







## Reference

- [Ethereum Gas Price Tracker](https://www.datawallet.com/ethereum-gas-price)
- OKLink Gas API
- Etherscan Gas Tracker
- [Blocknative Gas Estimator](https://www.blocknative.com/gas-estimator)
  - [Gas Prediction Introduction](https://docs.blocknative.com/gas-prediction)
  - [Introducing Base Fee Prediction and Intelligent Max Fee Estimates](https://www.blocknative.com/blog/base-fee-prediction-and-intelligent-max-fee)