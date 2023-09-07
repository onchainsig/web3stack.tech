# TODO

## How to generate address from public key

- Bitcoin address
- Ethereum address (EVM Chains)
- Solana address
- and so on ...

private key(32 bytes)  ->  public key(64 bytes)  -> Address(20 bytes) 

详细流程：

- 私钥生成公钥，会得到 65 bytes 的公钥
  - 组成：前缀04 + X公钥 + Y公钥
- 移除公钥的前缀4后的 16 进制重新转为字节数组
- 对字节数组进行 Keccak-256 运算，得到一个长度 64 的哈希值
- 取上面结果的后 40 位，得到地址
