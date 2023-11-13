# Chainlists

Reference Data

- [chainlist.org](https://chainlist.org/)
  - [chainlist.org github](https://github.com/ethereum-lists/chains)
- [chainlist.wtf](https://chainlist.wtf/)



## Optimism

- [Networks, Public RPC Endpoints, & APIs](https://community.optimism.io/docs/useful-tools/networks/#) : OP Mainnet, OP Goerli, Contract Address
- Faucet
  - https://app.optimism.io/faucet  Github 账号，每天可以领取 0.05 ETH
  - https://community.optimism.io/docs/useful-tools/faucets/#
- Bridge
  - https://app.optimism.io/bridge/deposit 可以选择 Goerli 网络，把 Goerli ETH 夸链到 OP Goerli
  - 把 ERC20 Token 做 Bridge ： [Bridging ERC-20 tokens with the Optimism SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-erc20#bridging-erc-20-tokens-with-the-optimism-sdk)
- OP Goerli & Ethereum Goerli
  - [Testing on Optimistic Test Networks](https://community.optimism.io/docs/guides/testing/#) 提供了一些测试用的 ERC20 tokens，也有 ERC721 Tokens
  - OP 在 Goerli 的合约地址：0x636af16bf2f682dd3109e60102b8e1a089fedaa8 (L1StandardBridge)
    - 其他合约 https://community.optimism.io/docs/useful-tools/networks/#op-goerli
  - Transactions
    - 0x0cd7b9c67a4647713fc986260bd47b4df0cc72ff62360c47a915c2be64a35cf4 Deposit ETH to OP Goerli
- Deposit Flow
  - [Optimism Deposit Flow](https://community.optimism.io/docs/protocol/deposit-flow/#)
- [Build your first app on Optimism!](https://github.com/ethereum-optimism/optimism-tutorial)

## Arbitrum

- Nodes: [RPC endpoints and providers](https://docs.arbitrum.io/node-running/node-providers)
- Bridge : [Arbitrum Goerli Bridge](https://bridge.arbitrum.io/?l2ChainId=421613)
  - Ethereum Goerli 网络的以太坊可以通过 Bridge 转移到 Arbitrum Goerli 网络
  - 到账时间大概 10 分钟
- Transactions
  - 0x8348897fc99fa12422298c4287ea15b4a6c0a30570f3e76722e526dcc32768c5 (Ethereum Goerli -> Arbitrum Goerli)
    - L1 合约地址：0x6BEbC4925716945D46F0Ec336D5C2564F419682C
  - USDC 测试合约：0x74a87D5632a5781C02C12424d1bA05e08CE52184
  - 做交易的两个地址：0xC15f02ddbcD8ECe0E6Aee452370b15516D658D0c, 0x9e8ad8877c190ec99CFa11365d947b604c6c4e83
- [What differences there are between the available Arbitrum chains](https://docs.arbitrum.io/for-devs/concepts/public-chains#what-differences-there-are-between-the-available-arbitrum-chains)
  - Arbitrum One 和 Arbitrum Nova 是两个平行的链，运行环境和用途目的不太一样，实现的协议有所不同 (Rollup, AnyTrust)
  - Arbitrum One 更多为普通用户提供可扩展和节约 gas 的兼容 Ethereum 合约的平台
  - Arbitrum Nova 提供更加高吞吐的交易
  - Arbitrum Goelri / Sepolia / Stylus 都是 testnet
- How it works
  - Bridge 
    - 将 ERC20 Token 从 Goerli 跨链到 Arbitrum Goerli 后，如果在 Goerli 的合约，但在 Arbitrum Goerli 不存在时，会在 Arbitrum Goerli 网络自动创建合约
    - 然后将打进来的 Token 
- SDK
  - https://www.npmjs.com/package/@arbitrum/sdk
- https://portal.arbitrum.io/



