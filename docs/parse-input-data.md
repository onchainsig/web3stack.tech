# Transaction Input Data Parser

某些场景下，我们需要对交易的 input data 进行反解析，这事情本身还是有些复杂的，我们可以借助一些工具做这些。

- [Java - evm abi decoder](https://github.com/osslabz/evm-abi-decoder)
- [Node - evm abi decoder](https://github.com/ConsenSys/abi-decoder)
- [Node - eth calldata decoder](https://github.com/apoorvlathey/eth-calldata-decoder)
- [https://apoorv.xyz/](https://apoorv.xyz/)
- https://www.alchemy.com/best/abi-tools

## Node - evm abi decoder

evm-abi-decoder 提供了一个 decodeMethod 的方法，用来解码 input data，大致实现逻辑如下：

```text
input data 是调用合约时需要传给合约的参数，比如 0xa9059cbb000000000000000000000000e7804c37c13166ff0b37f5ae0bb07a3aebb6e245000000000000000000000000000000000000000000000000000000000abd1c66

1. 从 input data 中获取 methodId, 取 2～10 位置的数据
2. 根据 methodId 从缓存的 abi 中获取 abi 的定义
3. 如果存在 abi 就继续，否则就返回
4. 使用 web3-eth-abi 库，利用 decodeParameters 方法，把 abi 和 参数传入方法中，得到解析后的对象
5. 构造出一个结构体返回：{name: xxx, params: [...]}
  1. 剩下的就简单了，遍历解析后的对象，构造 params
```
