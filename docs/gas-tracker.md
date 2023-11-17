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

Max fee 是用户期望打包交易付出的最大费用。

Max fee = (2 * base fee) + priority fee 

在计算最高费用时将基本费用加倍可确保您的交易在连续六个 100% 完整区块中仍然保持有效状态。



- 在绝大多数情况下，你支付的每个 gas 单元的 gas fee 是小于 max fee 的
- 但有时，尤其是在网络非常拥堵的情况下，你支付的 gas fee 是等于 max fee 的
- 但当你把 max fee 设置的接近 base fee，会导致交易定价过低的风险，从而有可能长时间 pending，或者被 drop
- 所以在计算 max fee 时最好引入健康的安全系数，及时在发生突发情况时也不至于太过容易导致交易被 drop 或长时间 pending

![image-20231113145452606](/Users/user/workspace/topics/onchainsig/contracts/docs/img/eip-1559-max-fee.png)



## Reference

- [Blocknative - EIP1559 fees](https://www.blocknative.com/blog/eip-1559-fees)
- [The Importance of Gas](https://app.hubspot.com/documents/5118396/view/443710469?accessId=785b1d)
- [Ethereum Gas Price Tracker](https://www.datawallet.com/ethereum-gas-price)
- OKLink Gas API
- Etherscan Gas Tracker
- [Blocknative Gas Estimator](https://www.blocknative.com/gas-estimator)
  - [Gas Prediction Introduction](https://docs.blocknative.com/gas-prediction)
  - [Introducing Base Fee Prediction and Intelligent Max Fee Estimates](https://www.blocknative.com/blog/base-fee-prediction-and-intelligent-max-fee)