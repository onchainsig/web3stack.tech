# Bitcoin

Bitcoin



WiP

- https://learnmeabitcoin.com/technical/txid
- https://developer.bitcoin.org/examples/transactions.html



## Tools

- Bitcoin Wallet
  - [Coinomi Wallet](https://www.coinomi.com/en/downloads/) 支持 testnet
- Bitcoin Explorer
  - https://explorer.btc.com/zh-CN
  - https://www.blockchain.com/explorer
  - https://blockstream.info/
  - https://btcscan.org/
  - https://mempool.space/zh/
- 一些快捷查询
  - https://api.blockcypher.com/v1/btc/main/txs/1e547ce484af5066b8e6939130eeae48842749d5efc83429d285efc7e69f9033?limit=50&includeHex=true  -- 查询交易信息
  
- SDK
  - [bitcoinj](https://bitcoinj.org/)
  - [bitcoin](https://github.com/bitcoin/bitcoin)
  - [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
  - [bitcoin in go](https://github.com/btcsuite)
  - [OKX Javascript SDK](https://www.okx.com/cn/web3/build/docs/build-dapp/private-key-wallet-javascript-sdk)
  - [OKX Go SDK](https://www.okx.com/cn/web3/build/docs/build-dapp/private-key-wallet-go-sdk)
  
- Bitcoin QA
  - [Bitcoin Reddit](https://www.reddit.com/r/Bitcoin/)
  



## Bitcoin Guide

- [比特币私钥公钥地址生成算法](https://github.com/youngqqcn/QBlockChainNotes/blob/master/%E6%AF%94%E7%89%B9%E5%B8%81/4-%E6%AF%94%E7%89%B9%E5%B8%81%E7%A7%81%E9%92%A5%E5%85%AC%E9%92%A5%E5%9C%B0%E5%9D%80%E7%94%9F%E6%88%90.md)
- [bitcoinj](https://github.com/bitcoinj/bitcoinj)

## Bitcoin Testnet

**testnet faucet**

https://medium.com/@CroutonDigital/crypto-testnet-faucet-list-d5d0bacec341

1. https://bitcoinfaucet.uo1.net/
2. https://beyondfaucet.com/btc-testnet
3. https://tbtc.bitaps.com/tools
4. https://kuttler.eu/en/bitcoin/btc/faucet/

**explorer**

1. https://live.blockcypher.com/btc-testnet/
1. https://blockstream.info/testnet/

## Resources

- [bitcoin-cli](https://chainquery.com/bitcoin-cli)
- [bitcoin rpc](https://developer.bitcoin.org/reference/rpc/)
- [bitaddress](https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html?testnet=true)
- [Bitcoin bips](https://github.com/bitcoin/bips)

## Bitcoin Core

- [Transaction](transaction.md)

- 转账费用

隔离见证兼容地址（**部分3开头**）比传统地址（**1开头**）**节省 24%** 转账手续费；
原生隔离见证地址（**bc1开头**）比传统地址（**1开头**）**节省 35%** 转账手续费；
隔离见证地址（**bc1开头**和**部分3开头**） 比 **多签地址**（**部分3开头**），最多可以节省 70% 转账手续费；

总结：**bc1 开头的原生隔离见证地址，最省转账费用**。

https://bitcoinops.org/en/newsletters/2019/04/16/

