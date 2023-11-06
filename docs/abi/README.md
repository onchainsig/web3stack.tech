# ABI

在 Ethereum 中，ABI 是和合约交互的标准方式，不仅适用外部访问区块链，也不包括合约之间的访问。数据根据它的类型进行编码，但是编码不是自描述的，所以需要一个模式来解码数据。



**Function Selector**

The first four bytes of the call data for a function call specifies the function to be called. It is the first (left, high-order in big-endian) four bytes of the Keccak-256 hash of the signature of the function.

Argument, Return, Event encoding are the same

**Type in ABI**

- uint<M>, M 取值 8 的倍数，比如 uint8, uint16, uint32 ...
- int<M>, M 取值 8 的倍数，比如 int8, int16, int32 ...
- address, 相当于 uint160
- uint, int 表示 uint256, int256
- bool
- fixed, ufixed
- bytes<M>, 0 < M <= 32
- function: an address followed by a function selector , 等同于 bytes24
- Fixed-size array
  - <type>[M]
- Non fixed size
  - bytes
  - string
  - <type>[] 给定元素的变长数组
  - tuple，比如 (T1,T2...)



| Solidity        | ABI  |
| :-------------- | ---- |
| address payable | address     |
| contract             | address |
| enum | uint8 |
| user defined value types | its underlying value type |
| struct | tuple |
| | |

**编码规则**

1. 在编码时，动态类型和静态类型的处理方式是不同的
2. 以 32 bytes 为一个单位

f((uint256,uint256[],(uint256,uint256)),(uint256,uin256),uint256)



动态类型

1. bytes
2. string
3. T[] 
4. T[K], 这里 T 是动态类型
5. (T1, T2 .. ,Tk), Ti 是动态类型

除去上边的都是静态类型



