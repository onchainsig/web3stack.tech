# Store smart contract

一个智能合约的例子。

## Build

- 编写 Store.sol
- 编译生成 abi 文件，得到 Store.abi

```shell
solc --abi Store.sol --overwrite -o .
```

- 编译 abi 文件生成 go 代码

```shell
abigen --abi=Store.abi --pkg=store --out=store.go
```

- 把合约编译成二进制，得到 Store.bin

```shell
solc --bin Store.sol --overwrite -o .
```

- 重新生成 go 代码，加入合约的 binary

```shell
abigen --bin=Store.bin --abi=Store.abi --pkg=store --out=store.go
```

得到 `store.go` 之后我们就可以使用 Golang 和区块链节点交互来部署合约，调用合约了。
