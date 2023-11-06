# Sample data

## Curl RPC

- eth_blockNumber

```shell
curl --url https://mainnet.infura.io/v3/e9cb57d516ef46628b8fb5bc8eadfa1f \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```



## Transaction parsing

List some special transactions as below

### Internal Transaction

- 向合约发送一笔交易，payable, 然后把 ETH 再转给不同的地址

`txHash`: `0x6700d6f8a80e4d31e4c9690aec2873e2e2a2c09f3cbc559e19248951e97b335c`, [link to etherscan](https://etherscan.io/tx/0x6700d6f8a80e4d31e4c9690aec2873e2e2a2c09f3cbc559e19248951e97b335c), [link to contract](https://etherscan.io/address/0xf4c62b4f8b7b1b1c4ba88bfd3a8ea392641516e9)

eth_getTransactionReceipt 接口返回的 logs 是空的

debug_traceTransaction 返回了内部交易的 calls

请求

```shell
curl --request POST \
     --url https://ethereum.blockpi.network/v1/rpc/public \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "debug_traceTransaction",
  "params": [
    "0x6700d6f8a80e4d31e4c9690aec2873e2e2a2c09f3cbc559e19248951e97b335c",
    {
      "tracer": "callTracer"
    }
  ]
}
'
```

响应

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "from": "0xd205a958527f083f1b222061b4d60d147fec5044",
        "gas": "0xcdbb",
        "gasUsed": "0x123d5",
        "to": "0xf4c62b4f8b7b1b1c4ba88bfd3a8ea392641516e9",
        "input": "0xe3a54629000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000c6ac26a6b7bd4fec95b339ce8f216537848bd970000000000000000000000000000000000000000000000000004a15688764921000000000000000000000000cdec21946393b34944c58ced404f955e40b0a7950000000000000000000000000000000000000000000000000003370ea457dcaa000000000000000000000000a56426a291053f75fdfc358969d9447bdea1d60d00000000000000000000000000000000000000000000000000029eb438eace0d00000000000000000000000008194c2746903bca46af9e357181a8eeefb07d7600000000000000000000000000000000000000000000000000036cc40b080a71000000000000000000000000a5fe9af8322b60d6ff120d42281001945b54f8e40000000000000000000000000000000000000000000000000004a15688764921",
        "calls": [
            {
                "from": "0xf4c62b4f8b7b1b1c4ba88bfd3a8ea392641516e9",
                "gas": "0x8fc",
                "gasUsed": "0x0",
                "to": "0x0c6ac26a6b7bd4fec95b339ce8f216537848bd97",
                "input": "0x",
                "value": "0x4a15688764921",
                "type": "CALL"
            },
            {
                "from": "0xf4c62b4f8b7b1b1c4ba88bfd3a8ea392641516e9",
                "gas": "0x8fc",
                "gasUsed": "0x0",
                "to": "0xcdec21946393b34944c58ced404f955e40b0a795",
                "input": "0x",
                "value": "0x3370ea457dcaa",
                "type": "CALL"
            },
            {
                "from": "0xf4c62b4f8b7b1b1c4ba88bfd3a8ea392641516e9",
                "gas": "0x8fc",
                "gasUsed": "0x0",
                "to": "0xa56426a291053f75fdfc358969d9447bdea1d60d",
                "input": "0x",
                "value": "0x29eb438eace0d",
                "type": "CALL"
            },
            {
                "from": "0xf4c62b4f8b7b1b1c4ba88bfd3a8ea392641516e9",
                "gas": "0x8fc",
                "gasUsed": "0x0",
                "to": "0x08194c2746903bca46af9e357181a8eeefb07d76",
                "input": "0x",
                "value": "0x36cc40b080a71",
                "type": "CALL"
            },
            {
                "from": "0xf4c62b4f8b7b1b1c4ba88bfd3a8ea392641516e9",
                "gas": "0x8fc",
                "gasUsed": "0x0",
                "to": "0xa5fe9af8322b60d6ff120d42281001945b54f8e4",
                "input": "0x",
                "value": "0x4a15688764921",
                "type": "CALL"
            }
        ],
        "value": "0x128533f937476a",
        "type": "CALL"
    }
}
```

### Special transactions

#### Ethereum

- 0x0102ef3504c79b0055493a89a9bc05cb4ad6e295a1b64c9c4d3ed835e9f90f1e
- 0x0e52304a4d7ebac48f2679f5ce491af3d01a390879525fc1f4f3f9b453bc9fcc
- 0x1759eb641635295560c8fc5b091d10a29ecd21dcd87b23ff10e86b70b2856e1b
- 0x1c7697e346789ab5c26dcbc8bbdfabcd24cd0ca05c0fb781c738631fe31ba7ab
- 0x25b423a9c289e0c0a219320aac77fa85d61d00fdd6c26c6c7ad51f4fbd9ea37a
- 0x3e6a3a41a2b7f2595cb5419f243b5d54cc40021f68340f018e5f80d558708159
- 0x4389bed6e3d722d21b72306191d520fad6518f5c52874e6d65ecce86d9dd995b
- 0x5a1e5901334081b5791f8e23cd9242a061cee7d3235eda4595edaf1d7e6f8c4c
- 0x8b669d9d87777c58fabbdd2862418fc1e59ddaad49c99458bce9ade9a4dea135
- 0xa7e2479bd67f3b9d405d6f9a7e67cc65cdd2ae53dcfeeda420a37f4f38833a3b
- 0xbd5278fd5b5a3d8ce939a0612d63789547d5f7d47911ad5abd9508eb318073b8
- 0xc7623e9a10736adf4f367bd6e123056111c53f6ec617d4f7fef324c801fad322