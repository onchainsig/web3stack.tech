# 回退函数和发送 ETH

回退函数，有两种

1. fallback
2. receive

在以太坊合约中有 3 中方式可以发送 ETH 主币。

1. transfer
2. send
3. call

## fallback & receive

如果合约中定义了 fallback 和 receive 函数，在调用合约时没有对应的 method 的时候，就会自动调用 fallback 或 receive，他们的调用符合以下规则：

1. 是否发送了 ETH

```solidity
contract Fallback {
    fallback external payable { }
    
}
```
