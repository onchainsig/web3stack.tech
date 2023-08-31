# Abi Decode

某些场景下，我们需要对交易的 input data 进行反解析，这事情本身还是有些复杂的，我们可以借助一些工具做这些。

方式可能有很多，比如使用 solidity, 使用其他的编程语言如 Node.js, Java 等

## Solidity 的方式

Solidity 内置了 abi 方法，使用方式如下

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract EncodeAndDecode {

    struct Price {
        string symbol;
        uint[2] sidePrice; 
    }

    function encode(
        uint x, address addr, uint[] calldata arr, Price calldata p
    ) external pure returns (bytes memory) {
        return abi.encode(x, addr, arr, p);
    }

    function decode(bytes calldata data) external pure 
      returns (
          uint x, 
          address addr, 
          uint[] memory arr, 
          Price memory p
    ) {
        (x, addr, arr, p) = abi.decode(data, (uint, address, uint[], Price));
    }

}
```
可以先调用 encode 方法，然后把 encode 的输出给 decode，最终得到解码后的数据。

## 其他编程语言的方式

参考资源：

- [Java - evm abi decoder](https://github.com/osslabz/evm-abi-decoder)
- [Node - evm abi decoder](https://github.com/ConsenSys/abi-decoder)
- [Node - eth calldata decoder](https://github.com/apoorvlathey/eth-calldata-decoder)
- [https://apoorv.xyz/](https://apoorv.xyz/)
- [alchemy abi-tools](https://www.alchemy.com/best/abi-tools)

### Node - evm abi decoder

[evm-abi-decoder](https://github.com/ConsenSys/abi-decoder) 提供了一个 decodeMethod 的方法，用来解码 input data，大致实现逻辑如下：

```text
input data 是调用合约时需要传给合约的参数，比如 0xa9059cbb000000000000000000000000e7804c37c13166ff0b37f5ae0bb07a3aebb6e245000000000000000000000000000000000000000000000000000000000abd1c66

1. 从 input data 中获取 methodId, 取 2～10 位置的数据
2. 根据 methodId 从缓存的 abi 中获取 abi 的定义
3. 如果存在 abi 就继续，否则就返回
4. 使用 web3-eth-abi 库，利用 decodeParameters 方法，把 abi 和 参数传入方法中，得到解析后的对象
5. 构造出一个结构体返回：{name: xxx, params: [...]}
  1. 剩下的就简单了，遍历解析后的对象，构造 params
```

### Java - evm abi decoder

[Java - evm abi decoder](https://github.com/osslabz/evm-abi-decoder) 原理和上面的类似，都是要先有 abi 的定义，然后才能做 decode，具体细节不做过多解释了。

### Golang - abi decoder

[abi-decoder](github.com/mingjingc/abi-decoder)

## 总结

abi 的编码和解码是跟区块链交互的关键，需要掌握。
