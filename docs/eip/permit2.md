# Approve & Permit

授权转账在 DeFi 中有比较广泛的应用场景，比如 Dex Swap；授权模式的发展也经历了不同的过程

1. 传统的 Approve 模式
2. EIP-2612 的 Permit
3. Uniswap 开发的 Permit2



## ERC20 中典型的 Approval 模型

![Image](/Users/user/workspace/topics/onchainsig/contracts/docs/img/approval-pattern.png)

1. Alice 授权合约或者 EOA 账户可以转移自己的 ERC20 资产，并且可以设置转移的最大金额
2. Alice 和合约交互(比如 Uniswap) 实际转移资产，使用 transferFrom，当然如果授权的是一个 EOA 账户 Bob，那么 Bob 同样可以使用 transferFrom 和 ERC20 合约交互转走资产

缺点

1. 用户体验不好：每次做转账时都需要做用户授权，并且非常浪费 gas
2. 安全性：通常 DAPP 会让用户授权最大的限额，为的是提高用户体验；但是一旦合约本身出了问题或者协议被利用，就非常容易损失资金

## EIP2612 授权签名



![Image](/Users/user/workspace/topics/onchainsig/contracts/docs/eip/assets/640-20231108141943853.png)

1. Alice 签署一个链下的 `permit(签名授权)` 信息，表示她希望授予一个合约一个（EIP-2612）代币的使用权
2. Alice 提交签署的消息，作为她与所述合约交互的一部分
3. 合约调用代币上的 "permit()" 方法，它会使用签名授权信息和签名，同时授予合约一个授权
4. 合约现在有了授权，所以它可以在代币上调用`transferFrom()`，转账由 Alice 持有的代币

好处：用户永远不需要提交一个单独的 `approve()` 交易；即使授权，并且可以设置过期时间

缺点：虽然 EIP-2612 使代币授权更加安全，但在 EIP-2612 之前推出的代币并不支持签名授权功能，而且并非所有较新的代币都采用该功能。



## Permit2

![Image](/Users/user/workspace/topics/onchainsig/contracts/docs/eip/assets/640-20231108142426313.png)

1. Alice 在一个 ERC20 上调用 `approve()`，典型的方式为的 Permit2 合约授予一个无限的授权
2. Alice 签署一个链下  `permit2` 消息，该消息表明协议合约被允许代表她转账代币
3. Alice 在协议合约上调用一个交互函数，将签署的 permit2 消息作为参数传入
4. 协议合约在 Permit2 合约上调用 `permitTransferFrom()`，而 Permit2 合约又使用其授权（在 1 中授予）在 ERC20 合约上调用 "transferFrom()"，转账 Alice 持有的代币



### EIP2612 Off-Chain Signed Message & EIP712 Signed Messages



TODO



## Reference

- [Permit2](https://github.com/dragonfly-xyz/useful-solidity-patterns/tree/main/patterns/permit2)
- [Uniswap permit2](https://github.com/Uniswap/permit2) - next generation token approvals mechanism
- [What is Permit2 - TokenPocket](https://help.tpwallet.io/en/wallet-faq-en/eth-wallet/permit2)
- [erc20 permit](https://github.com/dragonfly-xyz/useful-solidity-patterns/blob/main/patterns/erc20-permit/README.md)

