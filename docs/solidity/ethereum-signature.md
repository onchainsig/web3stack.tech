# Ethereum Signature

以太坊的签名算法：eth_sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))

ECDSA 的签名结果是 r, s, v 组合在一起的结果

1. v indicates two things: the chain ID and the recovery ID to help the ECDSArecover function check the signature.
2. r and s are inputs of ECDSA to generate a signature.
3. r is 20 bytes, s is 20 bytes,

## How to create a signature

- Solidity

```solidity

```
  
- ethers.js
- Golang
- Java

## Reference

- [Understanding How ECDSA Protects Your Data](https://www.instructables.com/Understanding-how-ECDSA-protects-your-data/)
- [Ethereum Transaction Structure Explained](https://medium.com/@eiki1212/ethereum-transaction-structure-explained-aa5a94182ad6)
