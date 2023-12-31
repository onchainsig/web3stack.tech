# 验证签名

消息可以在链下完成签名，并在链上使用智能合约进行验证。

用途：比如在使用 Wallet 做 Login 时，我们需要验证这个地址的归属权，就可以让钱包的拥有者对一个 nonce 数据进行签名，然后后台服务通过对签名进行验证来确定 address 账户的归属；
然后接下来就可以颁发给这个用户一个 JWT，这样在后续的请求中就可以使用 JWT 了，而不需要频繁的校验签名。

基本流程

1. 创建一个消息 message
2. 对 message 进行 hash 运算
3. 链下签名消息，并使用签名结果
4. 合约中接收签名，原始消息等内容
5. 从传入的签名中恢复 r, s, v
6. 根据 r, s, v 和消息签名通过 ecrecover 恢复出地址，跟签名的账户地址进行比较，看是否一致

实现
1. solidity 合约实现签名验证
2. Golang 实现签名验证

## 认识 r, s, v

Ethereum 的生成公私钥的算法使用的是 `secp256k1`, ECDSA 算法的一种，这个和 Bitcoin 是同一种算法，但是不同的是 Ethereum 采用的签名输出格式不太一样，其中 r,s 是签名结果，v 主要用来准确定位公钥的位置

go-ethereum 实现的签名方法如下

```
signature, _ := crypto.Sign(datahash, privateKey)
- datahash 是 32 bytes 的数据 hash
- privateKey 是使用的私钥
- signature 是签名数据，由 r,s,v 组成：<32bytes R><32bytes S><1byte V>

// 入口
types.SignTx(NewTransaction(...))
```

更加详细的内容可以参考：[签名与校验](https://learnblockchain.cn/books/geth/part3/sign-and-valid.html)

## solidity

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract VerifySignature {

    function verify(address _signer, string memory _message, bytes memory _sig) 
      external pure returns (bool) 
    {
        bytes32 messageHash = getMessageHash(_message);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recover(ethSignedMessageHash, _sig) == _signer;
    }

    function getMessageHash(string memory _message) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_message));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function recover(bytes32 _ethSignedMessageHash, bytes memory _sig) 
      public pure returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = _split(_sig);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function _split(bytes memory _signature) private pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(_signature.length == 65, "invalid signature length");

        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
    }
}
```

1. 首先从 Metamask 获取到数据的签名
2. 然后把账户地址，数据原文和签名传入到合约中，来验证签名是否正确

## Golang

TODO ...

