# Upgradable Contract

在了解这个话题之前，需要了解一些前导知识，比如 [call / delegatecall](contract-call.md) .

可升级合约与代理合约。

- 好处

代理合约带来的好处是可升级，节省 gas 等。

- 原理

核心原理：

1. 利用 deletecall 的能力，使得状态和逻辑分离，Proxy 合约维护状态数据，被代理合约维护业务逻辑，当需要升级业务逻辑时，可更换逻辑合约而不会影响合约的状态数据。
2. 在实现代理合约时使用了 fallback 和内联汇编，让没有返回值的回调函数可以返回数据
3. 同时要注意合约变量的插槽冲突

- 可能的问题

一般，在同一个合约中，有相同的选择器会编译报错，但代理合约和逻辑合约是两个不同的合约，所以代理合约的升级函数可能会和逻辑合约的函数发生选择器冲突，这样会引入一些不安全的因素，进而导致非常严重的安全事故。
目前有一些方法可以避免这些问题：

1. 透明代理
2. 通用可升级代理

## 透明代理 (Transparent Proxy)

主要原理是限制升级函数和 fallback 函数的调用权限，让 admin 只能调用升级函数，普通用户只能调用 fallback 函数。
这种方式不好的地方是会多耗费一些 gas，因为每次用户调用的时候都会检查一下是否为管理员，但也不是大问题。

## 通用可升级代理 (UUPS)

UUPS 的核心逻辑是把升级函数从代理合约转移到逻辑合约，这样就可以在编译器发现是否会有函数选择器冲突了。
这种方式比透明代理要节省一些 gas，但逻辑合约会变得稍微复杂一点；并且逻辑合约中一定要包含可升级函数，不然这个合约就不具备可升级的能力了。

## 规范和实现

使用代理模式构建一个可升级的合约是行业标准了：代理合约转发调用到实现合约。

- [OpenZeppelin proxy](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies)
- [Proxy Patterns](https://blog.openzeppelin.com/proxy-patterns)
  - A proxy architecture pattern is such that all message calls go through a Proxy contract that will redirect them to the latest deployed contract logic.

- [OpenZeppelin proxy](https://docs.openzeppelin.com/contracts/5.x/api/proxy)
  - This is a low-level set of contracts implementing different proxy patterns with and without upgradeability

- eips
  - 1167 [Minimal Proxy Contract](https://eips.ethereum.org/EIPS/eip-1167)
  - 1967 [Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
  - 897 [DelegateProxy](https://eips.ethereum.org/EIPS/eip-897)
  - 1822 [Universal Upgradeable Proxy Standard (UUPS)](https://eips.ethereum.org/EIPS/eip-1822)
  - 3561 [Trust Minimized Upgradeability Proxy](https://eips.ethereum.org/EIPS/eip-3561)
  - 4886 [Proxy Ownership Register](https://eips.ethereum.org/EIPS/eip-4886)
  - 7511 [Minimal Proxy Contract with PUSH0](https://eips.ethereum.org/EIPS/eip-7511)
  - 3448 [MetaProxy Standard](https://eips.ethereum.org/EIPS/eip-3448)
  - 2535 [ Diamonds, Multi-Facet Proxy](https://eips.ethereum.org/EIPS/eip-2535)
  - 7504 [Dynamic Smart Contracts](https://blog.thirdweb.com/erc-7504-dynamic-smart-contracts/)







