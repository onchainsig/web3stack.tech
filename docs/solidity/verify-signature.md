# 验证签名

消息可以在链下完成签名，并在链上使用智能合约进行验证。

基本流程

1. 创建一个消息 message
2. 对 message 进行 hash 运算
3. 链下签名消息，并使用签名结果
4. 合约中接收签名，原始消息等内容
5. 使用 ecrecover 恢复 r, s, v
6. 比较恢复的签名和传入的签名

实现
1. solidity 合约实现签名验证
2. Golang 实现签名验证

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

