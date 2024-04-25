# Solana

## 前言

最近在了解 Solana 区块链，相比于 Ethereum，它们之间的差异性还是很明显的，所以很有必要做个梳理和备忘。

> https://solana.com/
> 
> Solana is a decentralized blockchain built to enable scalable, user-friendly apps for the world.

Solana 理论上每秒可处理的交易 (TPS) 高达 50000 笔，区块达到最终确认的时间仅需约 400 毫秒。 Solana 的终极目标，是证明可以让区块链的交易吞吐量随网络频宽按比例扩张，实现可快速扩充、安全、去中心化的三大特质。

Solana is a blockchain built for mass adoption. It's a high performance network that is utilized for a range of use cases, including finance, NFTs, payments, and gaming. Solana operates as a single global state machine, and is open, interoperable and decentralized. (Solana 是一个专为大规模采用而构建的区块链。 它是一个高性能网络，可用于一系列用例，包括金融、NFT、支付和游戏。 Solana 作为单一的全球状态机运行，并且是开放的、可互操作的和去中心化的。)

Furthermore, **lamports** is the smallest unit in the Solana network, 1 **SOL** is equal to 1,000,000,000 **lamports**. The name of **lamports** is in honour of Solana's biggest technical influence, [Leslie Lamport](https://en.wikipedia.org/wiki/Leslie_Lamport).  (1 SOL = 10^9 lamports)

简言之，Solana 是一个类似于 Ethereum 的功能强大、支持智能合约、去中心化、开放的区块链网络，目前被广泛使用。

### 基本信息

通过下面的表格可以了解一些 Solana 的基本信息。

| Official Site              | [https://solana.com/](https://solana.com/zh)                                                                                                                                                                                                                                                                                                                                                                                                                |
|:-------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| White Paper                | 如果想对 Solana 的设计初衷、共识机制等有所了解，先看白皮书<br/> https://solana.com/solana-whitepaper.pdf                                                                                                                                                                                                                                                                                                                                                                             |
| Consensus                  | DPoS & PoH                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Features                   | High Performance                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Block Time                 | 400 ms                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Confirmation No.           | 1                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Coin                       | SOL                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Unit                       | lamports                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Precision                  | 10^9  (1 SOL = 10^9 lamports)                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Address case-sensitive     | Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Address regular expression | ^[1-9A-HJ-NP-Za-km-z]{32,44}$                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Token Support              | Yes (SPL Token)                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Program or Smart Contract  | Yes, written by Rust                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| RPC Endpoints              | 1. Custom  net  solana-test-validator <br />2. Devnet [https://api.devnet.solana.com](https://api.devnet.solana.com/) <br />3. Testnet [https://api.testnet.solana.com](https://api.testnet.solana.com/)<br />4. Mainnet (Beta)<br /> [https://api.mainnet-beta.solana.com](https://api.mainnet-beta.solana.com/)<br /> [https://solana-api.projectserum.com](https://solana-api.projectserum.com/)<br />@see https://docs.solana.com/cluster/rpc-endpoints |
| Explorer                   | [http://explorer.solana.com/](https://explorer.solana.com/)<br />[http://solana.fm/](https://solana.fm/)<br />[http://solscan.io/](https://solscan.io/)<br />http://solanabeach.io/<br />http://validators.app/                                                                                                                                                                                                                                             |
| Testnet Explorer           | https://explorer.solana.com/?cluster=testnet                                                                                                                                                                                                                                                                                                                                                                                                                |
| 加密算法                       | ed25519                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 公钥 / 地址                    | public key in base58                                                                                                                                                                                                                                                                                                                                                                                                                                        |

## Core Concepts

### Basic architecture

<img title="" src="./assets/1660833153057-81ba1f4e-272a-497e-9111-69597cfdab59.png" alt="image.png" width="840" data-align="center">

Solana 区块链的基本组成如上，分为 Solana Netowrk, Solana Client, Solana Program (Native Program & On-Chain Program)：

- 合约的开发者使用 Rust / C / C++ 等语言开发智能合约，并部署在 Solana Network 上；一旦部署到区块链上，任何想与之交互的人都可以使用 Solana 的 Client SDK or JSON RPC API 进行通信
- Client 端的开发者或用户可以使用 JSON RPC API 与 Solana Network 交互，基于 SDK 进一步可以封装出 dApp 应用、Wallet 等，提供给大多数的用户使用
- Solana network 是由分布在各个地理位置的节点组成的区块链网络

### Solana Network

Solana 提供了三套运行中的环境，分别是 `devnet`, `testnet`, `mainnet beta`，其中 `devnet`, `testnet` 可以用作开发测试，`mainnet beta` 是生产网络；当然也可以运行一个本地环境，用做开发环境等。具体的集群信息可以看这里 [Clusters and Public RPC Endpoints](https://solana.com/docs/core/clusters)

如果你想运行一个本地环境，可以看 [Setup local development and install the Solana CLI](https://solana.com/developers/guides/getstarted/setup-local-development)

做完上面的教程，在本地就会有 `solana` 相关的命令，我们可以使用 cli 很方便的跟 `devnet`, `testnet`, `mainnet beta` 进行交互了。

比如

```shell
# Default configuration.
$ solana config get
Config File: /Users/user/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /Users/user/.config/solana/id.json
Commitment: confirmed

# Get the default address.
$ solana address
B3HSvqGvWVCppZh6A7g7ga94eZS4DRFQNFTPi65f8snc

# Query the balance of the default address.
$ solana balance
10.61167344 SOL

# Aridrop the test token.
$ solana airdrop 1
Requesting airdrop of 1 SOL

Signature: 49LLAvowZSPybPacZ9g664h2CPX2B45pxXBknhkKnDccpNxo9gMoweqecEfiTuFi81BvVXYKFuSxQv3dBrUeGWhV

11.61167344 SOL

...
```

### 本地启动 Solana test validator

[Install the Solana Cli](https://docs.solanalabs.com/cli/install) 可以安装本地的 Solana 相关命令。

```shell
# 启动一个本地的 Solana 测试节点
$ solana-test-validator

# 把 solana 命令连接到本地的 RPC 节点
$ solana config set --url http://127.0.0.1:8899

# 也可以重新连接到其他节点，比如 devnet / testnet / mainnet
$ solana config set --url https://api.devnet.solana.com
$ solana config set --url https://api.testnet.solana.com
$ solana config set --url https://api.mainnet-beta.solana.com

# Verify the CLI Tool Suite configuration
$ solana genesis-hash

# Airdrop some test tokens
$ solana airdrop 100

# Query the balance
$ solana balance 

# Next
$ solana transfer ...
```

详细的可以参考这里 [Local Development](https://solanacookbook.com/references/local-development.html#starting-a-local-validator) or [Solana Test Validator](https://docs.solanalabs.com/cli/examples/test-validator)

### Quick overview

在更加深入了解 Solana 之前，可以通过教程快速的学习一些 Solana 的基础知识，可以看看下面的资源：

- [There are no bad questions about... blockchain basics | Solana](https://solana.com/learn/blockchain-basics) - Solana 101, 从宏观层面介绍 Blockchain, 以及为什么开发了 Solana，简单了解即可

- [Solana Documentation | Solana](https://solana.com/docs) - 这个是 Solana 的 Documentation，包含了 Solana 中非常核心的一些知识，推荐看一下
  
  - 可以先从它的 **Getting started** 入手，有个基本的了解
  
  - 然后看 **Start learning**, 理解 Solana 中几个非常核心的东西：**transactions**, **accounts**, **programs** 等
  
  - 如果对 Ethereum 有一点了解的话，可以配合着 [Documentation | Solana Wiki](https://solana.wiki/docs/) 一起看看
  
  - [Solana Fundamentals Reference Guide](https://www.quicknode.com/guides/solana-development/getting-started/solana-fundamentals-reference-guide) - QuickNode 上关于 Solana 的一些开发教程

- 进阶资料
  
  - [Solana中文开发教程](https://www.solanazh.com/) 的 Week1, Week2, Week3 三个部分。
  
  - [SolDev - Solana Development Course](https://www.soldev.app/course)
  
  - [solana-course/README.md at main · Unboxed-Software/solana-course · GitHub](https://github.com/Unboxed-Software/solana-course/blob/main/README.md)

看完上面的一些资料，应该有很多疑问，接下来深入分析 Solana 里的一些核心的知识，方便我们开发基于 Solana 的 Wallet。

### Keypair

首先来了解 Wallet，它的核心是对私钥的安全管理、地址生成和交易签名等；在 Solana 中的 Wallet 使用 ed25519 算法来生成私钥和交易签名。其中 Public Key 作为地址的来源，准确来说是 Public Key 的 base58 编码，总结如下：

- Public Key 长度 32 bytes，256 bit

- Private Key 长度 64 bytes

- ed25519 signature 长度 64 bytes

- 签名算法 `ed25519`

- Private key 的存储形式
  
  - 本质是一个大数，并且可以用 byte 序列的形式表示，512 bits
  - bytes - 字节序列，一般存储在一个文件中
  - base58 - base58 编码后的形式
  - hex - 16 进制的表示形式
  - 助记词推导 (核心思想是 seed): bip39, bip44

- Address 是 Public Key 的 base58 编码形式
  
  - HD Address

```go
// PK 是 private key bytes
_, PK, _ := ed25519.GenerateKey(nil)
if len(PK) != ed25519.PrivateKeySize {
  painc(errors.New("key length mismatch"))
}

// ed25519 的 公钥和私钥
priKey := ed25519.PrivateKey(PK)
pubKey := priKey.Public().(ed25519.PublicKey)

address := base58.Encode(pubKey)
fmt.Println(address)

// Sign
var messageBytes []byte
ed25519.Sign(priKey, messageBytes)
```

一些示例代码可以看 [wallet sample code](sol_wallet_code.md), 更多的详细内容可以参考 [keyparis and wallets](https://solanacookbook.com/references/keypairs-and-wallets.html#how-to-generate-a-new-keypair)

```shell
# 生成一个新的 keypair / wallet
$ solana-keygen new --outfile a.json
# 查看 pubkey
$ solana-keygen pubkey a.json
# 确认这个地址和私钥文件是对应的
$ solana-keygen verify 8vqMJYm8AvagWwT9FT9NXtropqGXRjfbS8koKxn2mFEm a.json
```

### Account Model

现实世界是复杂的，试图解决现实问题的区块链亦是如此，对问题和数据的建模方式也各有不同。

<img src="../../assets/2024-04-25-09-19-52-image.png" title="" alt="" data-align="center">

在 Solana Network 中 `Everything is an Account` ，这是 Solana 组织数据的一种方式，有别于 Ethereum，举个例子，在 Ethereum 中，发行一个 ERC20 Token 时，会有一个智能合约地址，Token 相关的数据状态是跟这个合约绑定在一起的；而 Solana 则截然不同。

Solana 中的 Account 不仅仅存储普通地址(指那些由 ed25519 算法生成的公钥)对应的账户数据，程序(也就是类似于 Ethereum 中的 Smart Contract)也存储在 Account 中，当然还包括由程序根据某种规则衍生出来的 PDA，PDA 账户存储的也是数据。

<img title="" src="../../assets/2024-04-17-14-07-46-image.png" alt="" width="444" data-align="center">

上图是 [Accounts | Solana Cookbook](https://solanacookbook.com/core-concepts/accounts.html) 是 Solana 中介绍的 Account Model。

**存在三种类型的账户**

- 数据账户存储数据
  - 由用户创建的可被私钥操控的账户，一般以地址形式表达，比如用来存储用户的 SOL 余额
  - PDA (Program Derived Address) 账户
- 程序账户存储可执行程序
  - 由用户部署的 program，一般用 programId 来指向这个 program，类似于数据账户的 address，都是来定位 Account 的；这类 program 一般称作 On-chain program
- 原生账户是 Solana 上的原生程序，包括 System, Stake, Vote
  - 由 Solana 官方开发的 program，并且由他们来部署，这些程序作为 Solana 网络功能的一部分，比如 System program 具备创建数据账户的能力
  - 这类账户一般称作 Native program
  - 在这里可以找到 [Native Program](https://docs.solanalabs.com/runtime/programs) 相关的 programId 和支持的 instruction

总结一下，账户分为数据账户和程序账户，程序账户无状态，并存储一些可执行的字节码，用来运行一些逻辑并对数据账户的状态做修改；数据账户只存储数据，不可自己改变自己的状态，必须通过从客户端发送交易，并由程序执行指令来改变自身状态；此外，数据账户又有两类：

1. 普通的地址账户

2. PDA 账户

**每个账户都包含如下字段**

- lamports - 当前账户的 sol 余额

- owner - 当前账户归属的程序账户
  
  - This field stores the address of an on-chain program and represents *which* on-chain program is allowed to *write* to the account’s data and subtract from its lamport balance. (该字段存储链上程序的地址，表示允许哪个链上程序写入账户数据并从其 lamports 余额中减去)
  - 通俗点说就是只有 owner 才可以减掉该账户的 lamports 余额，或者修改 data 数据；其他任何程序都可以增加一个账户的 lamports

- executable - 当前账户是否是可执行的，只有程序账户才是 true，数据账户是 false

- data - 当前账户存储的原始数据，对于数据账户存储的是数据状态，而对于程序账户存储的是 executable code 或者一个指向存储了 executable code 的账户代理地址

- rent_epoch - 这个字段存储的是当前账户在那个 epoch 会欠租金，意味着在那个 epoch 账户会被释放，数据会被 remove
  
  - 在账户上存储数据是需要花费 SOL 的，所谓的租金；但是可以通过保持账户的最小余额相当于 2 年租金，账户可以免租金
  
  - If the account does not have enough to pay rent, the account will be deallocated and the data removed.
  
  - 关于 rent [What is rent? | Solana](https://solana.com/docs/core/rent)

<img title="" src="../../assets/2024-04-19-21-10-28-image.png" alt="" width="1048" data-align="center">

上图是普通的地址账户跟 System Program 之间的关系，我们也可以叫这类账户为 System Account，看下链上数据

```shell
curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "DsqkS4YYodw1PPeUZTgaaYrpZ5wythns9QmFBV3VnjiC",
      {
        "encoding": "jsonParsed"
      }
    ]
  }
'
# Response
{"jsonrpc":"2.0","result":{"context":{"apiVersion":"1.18.11","slot":293327967},"value":{"data":["","base64"],"executable":false,"lamports":1347425800,"owner":"11111111111111111111111111111111","rentEpoch":18446744073709551615,"space":0}},"id":1}
```

**System program**

这是 Solana 的 Native Program, 是内置在 Solana 节点实例中的专门处理创建账户和转移 lamports 的程序(智能合约)，既然是内置的，它的 programId 就应该是固定的，可以看 [solana/sdk/program/src/system_program.rs at v1.18.9 · solana-labs/solana · GitHub](https://github.com/solana-labs/solana/blob/v1.18.9/sdk/program/src/system_program.rs), 此外 System Program 支持的 instructions 在这里 [solana/sdk/program/src/system_instruction.rs at v1.18.9 · solana-labs/solana · GitHub](https://github.com/solana-labs/solana/blob/v1.18.9/sdk/program/src/system_instruction.rs) 也可以看到。

其他类型的内置 Program

- Sysvar - owner is Sysvar，用于加载区块状态，比如最近区块、当前的租金费用等
- Native Program - owner is Native Loader, 用于表明原生程序，比如System、Stake、Vote 程序等
- BPF Program - owner is BPF Loader, 用于处理 BPF 字节码 (也就是用户部署的链上合约或者叫 program)
  - BPF Loader Program 会把被部署的 program 标记 `executable=true`

```shell
curl http://api.mainnet-beta.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "11111111111111111111111111111111",
      {
        "encoding": "jsonParsed"
      }
    ]
  }
'
# Response
{"jsonrpc":"2.0","result":{"context":{"apiVersion":"1.17.28","slot":261162985},"value":{"data":["c29sYW5hX3N5c3RlbV9wcm9ncmFt","base64"],"executable":true,"lamports":1,"owner":"NativeLoader1111111111111111111111111111111","rentEpoch":18446744073709551615,"space":21}},"id":1}
# c29sYW5hX3N5c3RlbV9wcm9ncmFt -> solana_system_program
```

**总结一些规则**

1. 只有数据账户的 owner 可以修改自己的数据和 lamports
2. 程序账户不存储状态
3. 为了确保一个合约不能修改其他合约的账户数据，每个账户都被指定一个 owner，这个 owner 执行特定的程序，这样当程序账户在执行时就可以来确定它是否可以修改指定数据账户的数据部分和 lamports；
4. 由于可执行的程序账户是不可修改的，所以他们的数据状态需要存储在一些独特的可修改的数据账户中; Developers can create new accounts with an assigned owner equal to the address of their executable account to store data，意思就是开发 Program 的人员可以通过创建新的账户来存储 program 运行时需要用到的数据，这些账户的 owner 指向这个程序的 programId 即可，这样 program 就可以操作这些数据账户
5. 每个账户都有一个指定的 owner，由于账户可以被创建并接收 sol，所以账户必须在创建时指定一个默认的 owner；在 Solana 中有个一称作 System Program 的默认 owner，它主要作用就是创建账户和转移 lamports

#### Reference

- [Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)

- [Accounts | Solana Cookbook](https://solanacookbook.com/core-concepts/accounts.html)

- Program
  
  - [Native Programs in the Solana Runtime](https://docs.solanalabs.com/runtime/programs)
  
  - [Programs | Solana Cookbook](https://solanacookbook.com/core-concepts/programs.html)
  
  - [What are Solana Programs? | Solana](https://solana.com/docs/core/programs)
    
    - [Solana Token Program](https://spl.solana.com/)
  
  - [Developing on-chain programs | Solana](https://solana.com/docs/programs)

### Transactions

在 Solana 区块链上，transaction 是最小的执行单元，program 的执行开始于提交到 Solana Cluster 的交易；每个交易由若干个 instructions 构成，这些 instructions 按序自动的被执行，如果某个 instruction 执行失败，整个交易都会失败。

**任何对链上数据的修改都需要借助 Transaction，它是指令的集合，用于执行链上程序，交易是原子性的。**

<img title="" src="../../assets/2024-04-20-11-10-35-image.png" alt="" data-align="center" width="583">

上图是一个 transction 的大致执行流程，可以分两个阶段看：

- 阶段 1，program 的部署，这里分两种情况
  
  - Solana 预先部署进去的，跟着 Solana Validator 和 Runtime 绑定在一起
  
  - 由 DAPP 的开发人员自行编写 program 并部署到 Solana Network

- 阶段 2，client 根据 program 的 instruction 规则构建一个交易，签名后发送给 Solana 区块链节点；然后 Solana Runtime 会根据内置的规则加载对应的可执行程序去执行指令，程序执行的过程中会修改相关的 Account lamports or data.

**Transaction 的结构**

<img title="" src="../../assets/2024-04-22-12-36-22-image.png" alt="" data-align="center">

- Signatures
  
  - ed25519 算法
  
  - 对于签名，每个签名的长度是 64 bytes

- Message
  
  - Header
  
  - Accounts
  
  - Recent block hash: 32 bytes sha-256 hash
    
    - The blockhash is used to prevent duplications and eliminate stale transactions. The max age of a transaction's blockhash is 150 blocks, or about ~1 minute 19 seconds as of the time of this writing.
  
  - Instructions

**Instruction**

每个指令包含：

1. 读取和/或写入的账户数组，每笔交易都声明了会涉及到哪些账户，如果多个交易影响的账户是不同的，那么这些交易就可以并行处理，以提升处理速度
2. 要调用的程序的 public key, 也就是 programId
3. 程序执行需要的数据，一般以字节数组组织，称作 instruction data, 它是特定于 program 的，也就是说不同的 program 对于 data 部分的解读也是不一样的

Instruction 的结构 [solana/sdk/program/src/instruction.rs at master · solana-labs/solana · GitHub](https://github.com/solana-labs/solana/blob/master/sdk/program/src/instruction.rs#L329)

```rust
pub struct Instruction {
    /// Pubkey of the program that executes this instruction.
    #[wasm_bindgen(skip)]
    pub program_id: Pubkey,
    /// Metadata describing accounts that should be passed to the program.
    #[wasm_bindgen(skip)]
    pub accounts: Vec<AccountMeta>,
    /// Opaque data passed to the program for its own interpretation.
    #[wasm_bindgen(skip)]
    pub data: Vec<u8>,
}
```

如何处理 instruction data，可以看这个 [Serialize instruction data](https://www.soldev.app/course/serialize-instruction-data) & [Serializing Data | Solana Cookbook](https://solanacookbook.com/guides/serialization.html#setting-up-for-borsh-serialization)

>  Exactly *how* this data would be structured would depend on how the program was written, **but it’s common to have the first field in instruction data be a number that the program can map to a function, after which additional fields act as function arguments**.

instruction data 序列化的通用做法是使用一个数字放在最前边，用来映射链上程序的功能函数，后续的数据作为函数参数。Solana 中针对 On-chain program 常用的序列化方式是 [borsh](https://borsh.io/).

<img title="" src="../../assets/2024-04-22-09-41-03-image.png" alt="" data-align="center" width="907">

#### Deep into transaction

Solana 的 transaction 有两类：Legacy transaction 和 [Versioned transaction](https://www.soldev.app/course/versioned-transaction)。

- Legacy transaction 的缺陷是，由于每个交易的最大字节数是 1232 bytes，会导致地址一个原子交易中能包含的最大地址数是 35 个，从这个来看，对交易指令的大小以及涉及到的地址数是有限制的

```go
// transaction struct
type Transaction struct {
  signatures [][]byte
  message Message
}
```

##### transaction fee & rent fee

在 Solana 中，transaction fee 是确定性的，不存在一个 fee market 让用户支付更高的 fee 来得到更高的打包优先级；目前，transaction fee 只跟验证签名的数量有关系；所有的交易都至少需要一个签名，此外，账户还需要支付租金费用。

- [Transaction Prioritization Fees | Solana](https://solana.com/docs/intro/transaction_fees#prioritization-fee)

- [Transaction Fees | Solana](https://solana.com/docs/core/transactions/fees) 

- [Overview of the Solana Runtime | Solana](https://solana.com/docs/core/runtime?ref=blog.quicknode.com#compute-budget) 

- [How to get your transactions finalized on Solana](https://blog.quicknode.com/solana-transaction-efficiency-priority-fees/)

- https://www.quicknode.com/guides/solana-development/transactions/how-to-optimize-solana-transactions 

##### Nonce Account

用来解决 RecentBlockHash 很快过期的问题，一般 150 个 block 以内，大概是 1m20s 以内

- [Sending Offline Transactions - Durable Nonce | Solana Cookbook](https://solanacookbook.com/references/offline-transactions.html#durable-nonce)
- [Durable Nonce | Solana Development With Go](https://blocto.github.io/solana-go-sdk/advanced/durable-nonce/) 

#### Transfer SOL

对于一个钱包，最基础的功能之一就是 transfer，将资产发送给其他人，看下用 Go 如何实现 SOL 的转账。

```go
c := client.NewClient(rpc.DevnetRPCEndpoint)
response, err := c.GetLatestBlockhash(context.TODO())
if err != nil {
  panic(err)
}

tx, err := types.NewTransaction(types.NewTransactionParam{
  Signers: []types.Account{wallet, wallet},
  Message: types.NewMessage(types.NewMessageParam{
    FeePayer:        wallet.PublicKey,
    // Recent block hash: 标记交易发起的时间，太老的交易会被 Solana Validator 拒绝
    RecentBlockhash: response.Blockhash,
    Instructions: []types.Instruction{
      // 重点是对 System Transfer Instruction 的构造
      system.Transfer(system.TransferParam{
        From:   wallet.PublicKey,
        To:     common.PublicKeyFromString(targetAddress),
        Amount: 1e6, // 0.001 SOL
      }),
    },
  }),
})
```

相关的指令可以在这里找到 [System Program Instructions](https://docs.rs/solana-program/latest/solana_program/system_instruction/index.html) , and here is [code](https://docs.rs/solana-program/latest/src/solana_program/system_instruction.rs.html#1-1802) [github system_instruction.rs](https://github.com/solana-labs/solana/blob/v1.18.9/sdk/program/src/system_instruction.rs)

简单分析: 从 [solana/sdk/program/src/system_instruction.rs at v1.18.9 · solana-labs/solana · GitHub](https://github.com/solana-labs/solana/blob/v1.18.9/sdk/program/src/system_instruction.rs#L700) 看一下 system program 中的 transfer instruction 实现

```rust
/// entrypoint!(process_instruction);
///
/// fn process_instruction(
///     program_id: &Pubkey,
///     accounts: &[AccountInfo],
///     instruction_data: &[u8],
/// ) -> ProgramResult {
/// ...

pub enum SystemInstruction {
    ...
    /// Transfer lamports
    ///
    /// # Account references
    ///   0. `[WRITE, SIGNER]` Funding account
    ///   1. `[WRITE]` Recipient account
    Transfer { lamports: u64 },
    ...
}
```

instruction 三要素：programId -> 11111111111111111111111111111111, accounts -> [From (Signer), To], instruction data -> instruction type & lamports；所以重点是 instruction type 和 lamports 的序列化，如何让 Solana runtime 也能正确反序列化，可以看这里 [solana_program - Rust](https://docs.rs/solana-program/latest/solana_program/#serialization)，得知 System Program 使用的是 [bincode](https://github.com/bincode-org/bincode/blob/trunk/docs/spec.md) 的方式作为编解码的方式，这在它的源代码里也能得到证实。

几个注意点

- 如果 target address 是一个全新的账户，转账的最低金额需要从 `getMinimumBalanceForRentExemption` RPC method 中获取，太小的金额会执行失败，insufficient funds 之类的错误；原因是每个账户都需要支付 rent，如果需要免租，需要至少 890880 lamports

- 新账户会被自动创建，只需要保证接收到的 lamports 大于 890880

- 如果 target address 是一个已经存在的账户，转账金额没有限制

#### Reference

- [Transactions | Solana Cookbook](https://solanacookbook.com/core-concepts/transactions.html)

- [Transactions | Solana](https://solana.com/docs/core/transactions) - 这里介绍了 Transaction 的基本组成，以及对 Transaction 每个部分的剖析

- [Versioned Transactions | Solana Cookbook](https://solanacookbook.com/guides/versioned-transactions.html) - Transaction 内部结构

- [Solana Transactions in Depth](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)

- [Retrying Transactions | Solana](https://solana.com/docs/core/transactions/retry) - 分析了在广播交易时，需要开发人员处理重试的情况以及几种方式

### Program

前面也多多少少提到了 Program，概括一下：Program 是 Solana 网络上的智能合约，可以让用户实现自定义的业务逻辑；Program 分为两类，一类是 Native Program，是 Solana 内置在节点中的一些具备基础能力的程序，比如 Vote，创建账户，SOL 转账等；一类是 On-chain Program，是由用户编写，用来实现特定目的，比如 Solana Program Library 里的 Token Program，是用来实现同质化代币和非同质化代币的程序，由 solana labs 开发并部署。

**几个要点**

- Program 是特殊的账号，被标记为 executable

- Program 可以拥有其他账户

- Program 可以修改它拥有的账户的 data 和 lamports

- 任何的 Program 都可以读取其他账户，并且也可以向其他账户转账

- Program 是无状态的，它的 data 字段存储的是被 BPF 编译后的可执行代码
  
  - 状态数据存储在其他的 Account 中，这些 Account 和这个 Program 存在一定的关系
  
  - 比如要存储 Program 的一个全局状态，我们可以结合 programId 和一个特殊字符串，编码后使用 sha256 hash 得到一个地址，用来存放这个全局数据

- On-chain Program 的 owner 是 [BPF Loader](https://docs.solanalabs.com/runtime/programs#bpf-loader)，并且被 Solana Runtime 执行
  
  - BPF Loader Prgram ID: `BPFLoaderUpgradeab1e11111111111111111111111`

- Program 可以更新它自己的 owner

- [SPL](https://spl.solana.com/) 是 Solana labs 开发的一些 on-chain program 的集合，比如 Token Program，Token Swap Program 等

- Program 可以处理来自用户的 instructions，也可以处理来自其他 program 的

- 每个 Program 都有一个唯一的入口点 (entrypoint)，这里是处理指令的入口，参数像这样
  
  - program_id: pubkey
  
  - accounts: array
  
  - instruction_data: byte array

<img src="../../assets/2024-04-22-13-54-45-image.png" title="" alt="" data-align="center">

**关于 PDA (Program Derived Address)**

我们已经知道 Program 是无状态的，但现实世界是有状态的、复杂的，PDA 就可以解决状态存储的问题。

PDAs 是结合程序地址和开发者选择的一些种子，以创建存储单个数据片段的地址。由于 PDAs 是位于 Ed25519 椭圆曲线之外的地址，因此 PDAs 没有私钥。相反，PDAs 可以通过用于创建它们的程序地址进行签名。

- PDA 是一个类似 public key 的 32 bytes 字符串，但是不存在一个 private key 和它对应，也就是 PDA 并不在 ed25519 curve 上

- PDA 是确定性的，可以使用 programId 和 seeds 确定性的生成出来，所以我们可以在任何地方推导 PDA

- Program 可以为 PDA 签名来操作 PDA 里边的数据，而且 PDA 只能由衍生它的 Program 进行签名

PDA 是开发 Program 基本的构建块，并且由 Program 来保证属于当前 Program 的 PDA 不会被外部的 Program 直接更改状态。

```go
// 我们可以使用 FindProgramAddress 来推导 PDA
func FindProgramAddress(seed [][]byte, programID PublicKey) (PublicKey, uint8, error) {
    var pubKey PublicKey
    var err error
    // 定义最大迭代次数 255，如果迭代超过 255 还没有找到 PDA，就返回 error，因为要保证 PDA 不在 curve 之上
    var nonce uint8 = 0xff
    for nonce != 0x0 {
        // 创建 PDA
        pubKey, err = CreateProgramAddress(append(seed, []byte{byte(nonce)}), programID)
        if err == nil {
            return pubKey, nonce, nil
        }
        nonce--
    }
    return PublicKey{}, nonce, errors.New("unable to find a viable program address")
}

// seeds 列表 + programId 生成 PDA
func CreateProgramAddress(seeds [][]byte, programId PublicKey) (PublicKey, error) {
    if len(seeds) > MaxSeed {
        return PublicKey{}, errors.New("length of the seed is too long for address generation")
    }

    // 拼接字节序列
    // - seeds 拼接在一起
    // - 接着是 programId 的字节序列
    // - 最后是字符串 ProgramDerivedAddress 的字节序列
    buf := []byte{}
    for _, seed := range seeds {
        if len(seed) > MaxSeedLength {
            return PublicKey{}, errors.New("length of the seed is too long for address generation")
        }
        buf = append(buf, seed...)
    }
    buf = append(buf, programId[:]...)
    buf = append(buf, []byte("ProgramDerivedAddress")...)

    // 对最终的字节序列做 sha256 hash
    h := sha256.Sum256(buf)

    pubkey := PublicKeyFromBytes(h[:])
    // 确保生成的 PDA 地址不在 ed25519 曲线上，因为在曲线上的公钥会存在一把私钥，具备安全隐患
    if IsOnCurve(pubkey) {
        return PublicKey{}, errors.New("invalid seeds, address must fall off the curve")
    }
    return pubkey, nil
}
```

[Program Derived Addresses (PDAs) | Solana Cookbook](https://solanacookbook.com/core-concepts/pdas.html#facts) 

#### SPL Token

>  通过发行 SPL Token 例子来加深对 Account, Transaction, Program 的理解。

首先，SPL Token 类似于 Ethereum 里的 ERC20 Token 和 ERC721 Token，它是 Solana 区块链中特有的概念，SPL Token 是一个由 Solana Labs 开发的 On-Chain Program (Smart Contract)，并且由 Solana Labs 部署在区块链上供其他人使用，也可以说 SPL Token 就是 Solana 的 Token 标准。

SPL Token Program - [solana-program-library/token/program/src at master · solana-labs/solana-program-library · GitHub](https://github.com/solana-labs/solana-program-library/tree/master/token/program/src)

```rust
// 注册 process_instruction，绑定到 entrypoint
solana_program::entrypoint!(process_instruction);

// SPL token program entrypoint
fn process_instruction(
    program_id: &Pubkey,            // program id
    accounts: &[AccountInfo],       // 用到的 accounts，这是个数组，顺序比较重要，要看 instruction 的定义
    instruction_data: &[u8],        // instruction 用到的 data，跟指令本身有关
) -> ProgramResult {
    if let Err(error) = Processor::process(program_id, accounts, instruction_data) {
        // catch the error so we can print it
        error.print::<TokenError>();
        return Err(error);
    }
    Ok(())
}

// https://github.com/solana-labs/solana-program-library/blob/master/token/program/src/processor.rs#L847
// 这里把 instruction type 和处理函数进行绑定
pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
    // 从 instruction data 中取出 instruction 和参数
    //  - instruction type 一般是第一个字节，使用 compact-u16 编码的
    //  - 参数是后面的字节，需要特定方式解码
    let instruction = TokenInstruction::unpack(input)?;
    match instruction {
        ...
        // 处理 transfer 指令
        TokenInstruction::Transfer { amount } => {
            msg!("Instruction: Transfer");
            Self::process_transfer(program_id, accounts, amount, None)
        }
        ...
    }
}

/// Processes a [Transfer](enum.TokenInstruction.html) instruction.
pub fn process_transfer(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
    expected_decimals: Option<u8>,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    ...
    // 处理逻辑
}


// https://github.com/solana-labs/solana-program-library/blob/master/token/program/src/instruction.rs#L25C1-L25C32
// Token 指令定义
pub enum TokenInstruction<'a> {
    ...
    /// Transfers tokens from one account to another either directly or via a
    /// delegate.  If this account is associated with the native mint then equal
    /// amounts of SOL and Tokens will be transferred to the destination
    /// account.
    ///
    /// Accounts expected by this instruction:
    ///
    ///   * Single owner/delegate
    ///   0. `[writable]` The source account.
    ///   1. `[writable]` The destination account.
    ///   2. `[signer]` The source account's owner/delegate.
    ///
    ///   * Multisignature owner/delegate
    ///   0. `[writable]` The source account.
    ///   1. `[writable]` The destination account.
    ///   2. `[]` The source account's multisignature owner/delegate.
    ///   3. ..3+M `[signer]` M signer accounts.
    Transfer {
        /// The amount of tokens to transfer.
        amount: u64,
    },
    ...
}
```

SPL Token 使用的模式是一次部署多个账户使用，Token Program 所做的事情比较固定，并且 program 本身是无状态的，所有人共用一份代码更加节省资源和达成共识。

**几个概念**

- SPL Token - 代表了 Solana 网络上的非原生代币，包括同质化和非同质化
- Token Program - 包含了创建以及和 SPL Token 交互的一组指令，链上的 programId 是 `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`
- Token Mint - 持有特定 Token 数据但不持有代币的账户，这是一个数据账户，这个地址会作为被创建 token 的地址
- Token Account - 持有特定 Token Mint 的账户，在创建 Token Account 的时候需要 SOL 来支付租金，但是当账户注销关闭后，租金会退还；但 Token Mint 目前无法注销

在 Solana 上发行一个类似于 ERC20 Token 是相对容易一些，不需要额外写 Program，Solana Labs 已经为我们提供了一份 SPL Token Program，并且也部署到了链上，我们只需要引用 Token Program ID (**TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA**)，但是我们需要遵循发行 Token 的几个步骤，一步步来，基本流程如下

<img src="../../assets/2024-04-23-06-42-14-image.png" title="" alt="" data-align="center">

##### Token Mint

我们需要先创建一个 Token Mint 账户，被看作是 token identifier，也叫 Mint 地址，用作某个代币的合约地址；mint address 的 owner 是 Token Program (**TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA**)，这样我们就可以基于 Token Program 去创建很多个 Tokens，就像下面这样

<img src="../../assets/2024-04-23-06-50-26-image.png" title="" alt="" data-align="center">

```rust
pub enum TokenInstruction<'a> {
    /// Initializes a new mint and optionally deposits all the newly minted
    /// tokens in an account.
    ///
    /// The `InitializeMint` instruction requires no signers and MUST be
    /// included within the same Transaction as the system program's
    /// `CreateAccount` instruction that creates the account being initialized.
    /// Otherwise another party can acquire ownership of the uninitialized
    /// account.
    ///
    /// Accounts expected by this instruction:
    ///
    ///   0. `[writable]` The mint to initialize.
    ///   1. `[]` Rent sysvar
    InitializeMint {
        /// Number of base 10 digits to the right of the decimal place.
        decimals: u8,
        /// The authority/multisignature to mint tokens.
        mint_authority: Pubkey,
        /// The freeze authority/multisignature of the mint.
        freeze_authority: COption<Pubkey>,
    },
    ...
}
```

从 Token Instruction 可以看出，我们需要指定 mint 的地址，decimals，mint_authority, freeze_authority

```go
tx, err := types.NewTransaction(types.NewTransactionParam{
    Message: types.NewMessage(types.NewMessageParam{
        FeePayer:        feePayer.PublicKey,
        RecentBlockhash: recentBlockHashResp.Blockhash,

        // 创建账户和初始化 mint 两个指令要放在同一个 transaction 中，这样更加安全
        Instructions: []types.Instruction{    
            // 创建 Mint 账户，New 字段指向新的 Mint 地址
            system.CreateAccount(system.CreateAccountParam{
                From:     feePayer.PublicKey,     // 支付 transaction fee 和 rent fee 的账户
                New:      mint.PublicKey,         // 新创建的 Mint 账户地址
                Owner:    common.TokenProgramID,  // 可以看到是指向 token program id
                Lamports: rentExemptionBalance,   // 新创建的 mint 账户免租的最小金额，从 rpc method 获取
                Space:    token.MintAccountSize,  // Mint 账户占用的空间大小，这个大小是固定的 82 bytes
            }),
            // 初始化上面创建的 mint 账户，理论上只能被初始化一次
            token.InitializeMint(token.InitializeMintParam{
                Decimals:   8,                    // 新发的 token 的 decimals，也就是最小单位       
                Mint:       mint.PublicKey,       // Mint 账户
                MintAuth:   alice.PublicKey,      // 哪个账户地址有权限铸造新的 token
                FreezeAuth: nil,                  // 哪个账户地址有权限冻结这个 token，可以不指定
            }),
        },
    }),
    Signers: []types.Account{feePayer, mint},
})
```

- Check Token Mint Account

在创建并初始化 Token Mint 后，可以通过 rpc 来查询结果以验证正确性，这个比较简单，就是调用 getAccountInfo 方法

```shell
curl http://api.mainnet-beta.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      {
        "encoding": "jsonParsed"
      }
    ]
  }
'
# Response
{"jsonrpc":"2.0","result":{"context":{"apiVersion":"1.17.28","slot":261686915},"value":{"data":{"parsed":{"info":{"decimals":6,"freezeAuthority":"3sNBr7kMccME5D55xNgsmYpZnzPgP2g12CixAajXypn6","isInitialized":true,"mintAuthority":"2wmVCSfPxGPjrnMMn7rchp4uaeoTqN39mXFC2zhPdri9","supply":"2813057885819043"},"type":"mint"},"program":"spl-token","space":82},"executable":false,"lamports":251587661628,"owner":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","rentEpoch":18446744073709551615,"space":82}},"id":1}
```

##### Token Account

SPL-Token 转移需要发送方和接收方都拥有要转移的代币铸造厂的 Token 账户；代币从发送方的 Token 账户转移到接收方的 Token 账户；当获取接收方的关联Token 账户以确保其在转移前存在时，您可以使用 `getOrCreateAssociatedTokenAccount`。只需记住，如果账户尚不存在，则此函数将创建它，交易付款人将扣除所需的账户创建的 lamports。

默认情况下，我们使用 ATA 作为 Token Account 的生成方式，这种约定会带来很多好处，比如我们不需要特意记录每个用户地址的 Token Account 有哪些，这样的账户太多了，维护起来非常麻烦，ATA 为我们解决了这个问题，可以看下面关于它的说明。

在 Token Mint 账户创建完成后，需要创建一个 Token 账户来持有新发行的代币

```go
tx, err := types.NewTransaction(types.NewTransactionParam{
    Message: types.NewMessage(types.NewMessageParam{
        FeePayer:        feePayer.PublicKey,
        RecentBlockhash: res.Blockhash,
        Instructions: []types.Instruction{
            // 使用 ATA Program 创建 账户
            associated_token_account.Create(associated_token_account.CreateParam{
                Funder:                 feePayer.PublicKey,    // 支付费用的账户
                Owner:                  alice.PublicKey,       // Token 账户的拥有者，就是用户钱包地址
                Mint:                   mintPubKey,            // token mint 地址，就是哪个 token
                AssociatedTokenAccount: ata,                   // 被创建的 ATA 账户
            }),
        },
    }),
    Signers: []types.Account{feePayer},
})

// 构造指令
data, err := borsh.Serialize(struct {
        Instruction Instruction
    }{
        Instruction: InstructionCreate,
    })
types.Instruction{
        ProgramID: common.SPLAssociatedTokenAccountProgramID, // ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL
        Accounts: []types.AccountMeta{
            {PubKey: param.Funder, IsSigner: true, IsWritable: true},
            {PubKey: param.AssociatedTokenAccount, IsSigner: false, IsWritable: true},
            {PubKey: param.Owner, IsSigner: false, IsWritable: false},
            {PubKey: param.Mint, IsSigner: false, IsWritable: false},
            {PubKey: common.SystemProgramID, IsSigner: false, IsWritable: false},
            {PubKey: common.TokenProgramID, IsSigner: false, IsWritable: false},
            // {PubKey: common.SysVarRentPubkey, IsSigner: false, IsWritable: false},
        },
        Data: data,
    }
```

**关于 Associated Token Account Program**

[ATA](https://spl.solana.com/associated-token-account) 是一种将钱包地址映射到关联的某个 token 账户的机制，主要作用简化了 Token Account 的维护；它是 PDA 的一种，确定了生成方式。

从理论上来讲，一个用户针对某个 `token mint` 可以拥有任意多个 token accounts，这就引入了一个非常麻烦的事情，在发送 token 时我们很难知道其他人的 token account 是什么，从而为 token 管理引入了很多麻烦；ATA 引入了一种确定性的推导 token account 的机制，只需要使用用户的 System 账户地址和 token mint 地址结合在一起，确定性的创建一个 token account 出来，我们叫这类账户为关联 token 账户

此外，这种方式也允许在接收人没有某个 token mint 的 token account 时，也可以接收到 token；不像系统转账，token 转账时接收人必须有跟这个 token mint 相关的 token account，否则无法转账成功

ATA 的生成方式

```go
var TokenProgramID = PublicKeyFromString("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
var SPLAssociatedTokenAccountProgramID = PublicKeyFromString("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")

// walletAddress - 用户的钱包地址，有公私钥的地址
// tokenMintAddress - 具体某个 token 的地址
func FindAssociatedTokenAddress(walletAddress, tokenMintAddress PublicKey) (PublicKey, uint8, error) {
    seeds := [][]byte{}
    seeds = append(seeds, walletAddress.Bytes())
    seeds = append(seeds, TokenProgramID.Bytes())
    seeds = append(seeds, tokenMintAddress.Bytes())

    return FindProgramAddress(seeds, SPLAssociatedTokenAccountProgramID)
}
```

需要了解细节，可以看代码，[ATA Program 在这里](https://github.com/solana-labs/solana-program-library/blob/master/associated-token-account/program/src/entrypoint.rs)

```rust
/// Instructions supported by the AssociatedTokenAccount program
#[derive(Clone, Debug, PartialEq, BorshDeserialize, BorshSerialize, BorshSchema)]
pub enum AssociatedTokenAccountInstruction {
    /// Creates an associated token account for the given wallet address and
    /// token mint Returns an error if the account exists.
    ///
    ///   0. `[writeable,signer]` Funding account (must be a system account)
    ///   1. `[writeable]` Associated token account address to be created
    ///   2. `[]` Wallet address for the new associated token account
    ///   3. `[]` The token mint for the new associated token account
    ///   4. `[]` System program
    ///   5. `[]` SPL Token program
    Create,
    /// Creates an associated token account for the given wallet address and
    /// token mint, if it doesn't already exist.  Returns an error if the
    /// account exists, but with a different owner.
    ///
    ///   0. `[writeable,signer]` Funding account (must be a system account)
    ///   1. `[writeable]` Associated token account address to be created
    ///   2. `[]` Wallet address for the new associated token account
    ///   3. `[]` The token mint for the new associated token account
    ///   4. `[]` System program
    ///   5. `[]` SPL Token program
    CreateIdempotent,
    /// Transfers from and closes a nested associated token account: an
    /// associated token account owned by an associated token account.
    ///
    /// The tokens are moved from the nested associated token account to the
    /// wallet's associated token account, and the nested account lamports are
    /// moved to the wallet.
    ///
    /// Note: Nested token accounts are an anti-pattern, and almost always
    /// created unintentionally, so this instruction should only be used to
    /// recover from errors.
    ///
    ///   0. `[writeable]` Nested associated token account, must be owned by `3`
    ///   1. `[]` Token mint for the nested associated token account
    ///   2. `[writeable]` Wallet's associated token account
    ///   3. `[]` Owner associated token account address, must be owned by `5`
    ///   4. `[]` Token mint for the owner associated token account
    ///   5. `[writeable, signer]` Wallet address for the owner associated token
    ///      account
    ///   6. `[]` SPL Token program
    RecoverNested,
}
```

##### Mint To

我们有了 Token Mint 和 Token Account，接下来就可以为 Token Account 供应代币，比如说初始供应的总量、增发等；这里我们考虑使用 TokenInstruction 的 `MintToChecked` 指令

```rust
 pub enum TokenInstruction<'a> {
    /// Mints new tokens to an account.  The native mint does not support
    /// minting.
    ///
    /// This instruction differs from MintTo in that the decimals value is
    /// checked by the caller.  This may be useful when creating transactions
    /// offline or within a hardware wallet.
    ///
    /// Accounts expected by this instruction:
    ///
    ///   * Single authority
    ///   0. `[writable]` The mint.
    ///   1. `[writable]` The account to mint tokens to.
    ///   2. `[signer]` The mint's minting authority.
    ///
    ///   * Multisignature authority
    ///   0. `[writable]` The mint.
    ///   1. `[writable]` The account to mint tokens to.
    ///   2. `[]` The mint's multisignature mint-tokens authority.
    ///   3. ..3+M `[signer]` M signer accounts.
    MintToChecked {
        /// The amount of new tokens to mint.
        amount: u64,
        /// Expected number of base 10 digits to the right of the decimal place.
        decimals: u8,
    },
 }
```

这里需要传入三个 Accounts，分别是

1. Mint 地址

2. 持有 Token 数量的 ATA 地址

3. Token Mint 的 Authority 地址，在创建 Token Mint 的时候我们指定过这个 Authority，这里需要这个账户的签名

然后是 instruction data 部分，需要传入铸造的 token 的数量，以及这个 Token 的 decimals，这里我们用的是 `MintToChecked`，需要去再次 check 这个 decimals 是否跟创建 Token Mint 时一致，如果不一致会错误返回，确保了错误发生。

##### Check Balance

在铸造完 token 后，我们可以查询一下这个 ATA 的 token 数量，同样还是用 getAccountInfo method

```shell
curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "2nrpwrAFwiAxAygUTjaUw9kErAke1nRnpL9iymbdkmsD",
      {
        "encoding": "jsonParsed"
      }
    ]
  }
'
{"jsonrpc":"2.0","result":{"context":{"apiVersion":"1.18.11","slot":294002521},"value":{"data":{"parsed":{"info":{"isNative":false,"mint":"GeoWLwRr25dUpdDDqyFqcgk7m2MaJgw2VnSJGUfjFaXv","owner":"BKHLRxLPiNALhf5UejxqJKjGUWCf5uaWfMP6jxNsi1pM","state":"initialized","tokenAmount":{"amount":"100000000","decimals":8,"uiAmount":1.0,"uiAmountString":"1"}},"type":"account"},"program":"spl-token","space":165},"executable":false,"lamports":2039280,"owner":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","rentEpoch":18446744073709551615,"space":165}},"id":1}
```

##### Token Transfer

至此，Token 已经创建完成，并且做了初始的发行总量，Token Mint 的 Authority 地址拥有自己的 ATA，并且这个 ATA 保存了 token amount 的数据。

回顾一下上面的基本组成

<img src="../../assets/2024-04-23-10-24-48-image.png" title="" alt="" data-align="center">

接下来，把 Alice 账户里的 SPL-Token 转移到 Bob 的账户里，首先必须确保 Bob 的 ATA 账户已经创建，否则需要先创建再转账

1. 通过 `FindAssociatedTokenAddress` 得到 bob 的 ATA 账户，查询 bob's ATA 是否存在，如果不存在就创建它

2. 把 token 转到 bob's ATA

```go
// 不存在的时候，创建 bob 的 ata
types.NewTransaction(types.NewTransactionParam{
        Message: types.NewMessage(types.NewMessageParam{
            FeePayer:        feePayer.PublicKey,
            RecentBlockhash: res.Blockhash,
            Instructions: []types.Instruction{
                associated_token_account.Create(associated_token_account.CreateParam{
                    Funder:                 feePayer.PublicKey,
                    Owner:                  bob,
                    Mint:                   mintPubKey,
                    AssociatedTokenAccount: bobATA,
                }),
            },
        }),
        Signers: []types.Account{feePayer},
    })

// 然后，转移 token 到 bob's ata
types.NewTransaction(types.NewTransactionParam{
        Message: types.NewMessage(types.NewMessageParam{
            FeePayer:        feePayer.PublicKey,
            RecentBlockhash: res.Blockhash,
            Instructions: []types.Instruction{
                token.TransferChecked(token.TransferCheckedParam{
                    From:     aliceTokenATAPubkey,       // 从哪个 ata 账户转 token
                    To:       bobATA,                    // 转到哪个 ata 账户
                    Mint:     mintPubKey,                // Token mint 的地址，也就是转的哪个 token
                    Auth:     alice.PublicKey,           // From ata 的 authority 账户，也就是指 data 里的那个 owner, 这个账户需要签名
                    Signers:  []common.PublicKey{},
                    Amount:   1e5,                       // 数量
                    Decimals: 8,                         // 单位
                }),
            },
        }),
        Signers: []types.Account{feePayer, alice},       // feePayer 和 alice 的签名
    })


// Instruction
    /// Transfers tokens from one account to another either directly or via a
    /// delegate.  If this account is associated with the native mint then equal
    /// amounts of SOL and Tokens will be transferred to the destination
    /// account.
    ///
    /// This instruction differs from Transfer in that the token mint and
    /// decimals value is checked by the caller.  This may be useful when
    /// creating transactions offline or within a hardware wallet.
    ///
    /// Accounts expected by this instruction:
    ///
    ///   * Single owner/delegate                     -- 这里说明了 accounts 的顺序，以及是否需要签名，是否可写等
    ///   0. `[writable]` The source account.
    ///   1. `[]` The token mint.
    ///   2. `[writable]` The destination account.
    ///   3. `[signer]` The source account's owner/delegate.
    ///
    ///   * Multisignature owner/delegate
    ///   0. `[writable]` The source account.
    ///   1. `[]` The token mint.
    ///   2. `[writable]` The destination account.
    ///   3. `[]` The source account's multisignature owner/delegate.
    ///   4. ..4+M `[signer]` M signer accounts.
    TransferChecked {
        /// The amount of tokens to transfer.
        amount: u64,
        /// Expected number of base 10 digits to the right of the decimal place.
        decimals: u8,
    },
```

More things todo:

1. burn

2. approve

3. revoke

4. freeze

5. Multisig

6. 探索更多关于 spl-token 的功能 https://spl.solana.com/token

7. Metaplex token metadata

#### Reference

- [Programs | Solana Cookbook](https://solanacookbook.com/core-concepts/programs.html)

- [Program Derived Addresses (PDAs) | Solana Cookbook](https://solanacookbook.com/core-concepts/pdas.html) 

- [Developing on-chain programs | Solana](https://solana.com/docs/programs)

**深入了解 SPL token**

- [Solana Programs Part 1: Understanding SPL Token Mint | Sec3 Blog](https://www.sec3.dev/blog/solana-programs-part-1-understanding-spl-token-mint)

- [Solana Programs Part 2: Understanding SPL Associated Token Account | Sec3 Blog](https://www.sec3.dev/blog/solana-programs-part-2-understanding-spl-associated-token-account)

- [Solana programs Part 3: understanding Metaplex Token Metadata | Sec3 Blog](https://www.sec3.dev/blog/solana-programs-part-3)

- [Interacting with Tokens | Solana Cookbook](https://solanacookbook.com/references/token.html#what-do-i-need-to-get-started-with-spl-tokens)

- [Token Metadata - Overview](https://developers.metaplex.com/token-metadata)

## Solana JSON RPC

> [Solana RPC HTTP Methods | Solana](https://solana.com/docs/rpc/http)

交易状态保证，划分了几个等级

- finalized 
- confirmed
- processed

confirmed 可以平衡速度和安全性，finalized 是更加安全的级别。如果没有配置，默认是 finalized。

RpcResponse 结构分为两部分：context 和 value

某些方法支持 encoding 参数，可以返回 account 

在 Solana 中，slot 类似于 block height 的概念，可以等同使用

- getSlot - 返回到达了给定的 commitment 级别的最新 slot
- getBlock - 根据 slot 获取 block 信息，可以指定 commitment, encoding，返回值包括 transactions 列表
  - 获取 txHash: $.transactions[i].transaction.signatures[0]
  - 判断状态：$.transactions[i].meta.err  or  $.transactions[i].meta.status { Err | Ok}
  - $.transactions[i].meta.preBalances[]  数组是交易处理之前的账户余额
  - $.transactions[i].meta.postBalances[]  数组是交易处理之后的账户余额
  - $.transactions[i].transaction.message.accountKeys[] 数组是 pubkeys
  - preBalances.length == postBalances.length == pubkeys.length
  - $.transactions[i].meta.preTokenBalances[]
  - $.transactions[i].meta.postTokenBalances[]

## For Exchange & Wallet

[Add Solana to Your Exchange | Solana](https://solana.com/docs/more/exchange#listening-for-deposits) - This guide describes how to add Solana's native token SOL to your cryptocurrency exchange.

这篇文章很有用，建议仔细读。

## Next

- Token Approve / Revoke & Wrapped SOL & [NFTs](https://solanacookbook.com/references/nfts.html) & [Metaplex](https://developers.metaplex.com/token-metadata) (its token metadata) & Token Upgrade Program

- Memo Program & Name Service

- Token Swap Program

- Token Lending Program

- Writing Program

- Solana internal implementation & whitepaper

## SDK

- Golang
  - https://github.com/gagliardetto/solana-go - Go SDK library and RPC client for the Solana Blockchain, there is currently **no stable release**.
  - https://github.com/blocto/solana-go-sdk - https://blocto.github.io/solana-go-sdk/  √
- Java
  - https://github.com/sol4k/sol4k - Kotlin, Java, and Android client for Solana.
  - https://github.com/skynetcap/solanaj - Solana RPC client written in Java
- js
  - https://solana-labs.github.io/solana-web3.js/  - 官方出品，借鉴参考
  - https://solana.com/docs/clients/javascript-reference
- Rust
  - https://solana.com/docs/clients/rust

## Reference

- [Solana Cookbook](https://solanacookbook.com/) - The *Solana Cookbook* is a developer resource that provides the essential concepts and references for building applications on Solana. Each concept and reference will focus on specific aspects of Solana development while providing additional details and usage examples.
- [Solana Documentation](https://solana.com/docs) - Solana is a blockchain built for mass adoption. It's a high performance network that is utilized for a range of use cases, including finance, NFTs, payments, and gaming. Solana operates as a single global state machine, and is open, interoperable and decentralized.
  - [Solana Validator Documentation](https://docs.solanalabs.com/)
- Github
  - [solana-labs](https://github.com/solana-labs)
  - [solana-developers](https://github.com/solana-developers)
- [Solana Program Library](https://spl.solana.com/)
  - [solana-labs/solana-program-library](https://github.com/solana-labs/solana-program-library)
- [Solana Developer Resources](https://solana.com/developers) - A manual for joining the Solana ecosystem. By builders for builders.
- [Solana Bytes - The Solana Programming Model](https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm)
  - [Solana Playground IDE](https://beta.solpg.io/)
- [The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
  - [Anchor](https://www.anchor-lang.com/)
  - [Anchor Book](https://book.anchor-lang.com/introduction/introduction.html)
- [Solana JSON RPC](https://solana.com/docs/rpc)
- [A Solana Course By Rareskills](https://www.rareskills.io/solana-tutorial)
- [SOL dev](https://www.soldev.app/) - Stay up-to-date with the latest updates, learning, and happenings in the Solana ecosystem.
  - [Solana development course](https://www.soldev.app/course) - Welcome to the best place for Web Developers looking to learn Web3 development. Solana's high speed, low cost, and energy efficiency make it the ideal network to build on.
  - [Library](https://www.soldev.app/library?types=) - Check out the latest and greatest tutorials, articles, podcasts, and more.
- [Solana wiki](https://solana.wiki/docs/)
- [Solana Pirate Bootcamp](https://github.com/solana-developers/pirate-bootcamp) - A pirate-theme bootcamp for getting up to speed on Solana programming!
- [Solana dev tools](https://github.com/solana-developers/solana-tools)
- [SolDev - Library](https://www.soldev.app/library)
- [Solana Program Examples](https://github.com/solana-developers/program-examples) - A repository of Solana program examples
- [Solana-Programming-Resources](https://github.com/SolanaNatives/Solana-Programming-Resources)

Videos

- [SolDev - Solana Bootcamp - Advanced](https://www.soldev.app/library/playlist/solana-bootcamp-advanced)

- [SolDev - Solana Bootcamp Basics](https://www.soldev.app/library/playlist/solana-bootcamp-basics)

- [教學Solana區塊鏈應用開發（1/7）-基礎入門簡介 YouTube](https://www.youtube.com/watch?v=h8ds-Q7wRrk)
  
  - [GitHub - solana-developers/pirate-bootcamp: A pirate-theme bootcamp for getting up to speed on Solana programming!](https://github.com/solana-developers/pirate-bootcamp?tab=readme-ov-file)

### Instruction

- [system instruction](https://github.com/solana-labs/solana/blob/v1.18.9/sdk/program/src/system_instruction.rs)

- [How to sign Transactions using multiple signers on Solana](https://docs.shyft.to/dev-guides/solana/transactions/how-to-sign-transactions-using-multiple-signers-on-solana)

### Ecosystem

- [Ecosystem | Solana](https://solana.com/ecosystem/explore)

### Proposals

- [Implemented Design Proposals](https://docs.solanalabs.com/implemented-proposals/)

### Solana Internals

- [Solana Internals Part 1: What Are the Native On-Chain Programs and Why Do They Matter? | Sec3 Blog](https://www.sec3.dev/blog/solana-internals-part-1-what-are-the-native-on-chain-programs-and-why-do-they-matter)

- [Solana Internals Part 2: How Is a Solana Program Deployed and Upgraded | Sec3 Blog](https://www.sec3.dev/blog/solana-internals-part-2-how-is-a-solana-program-deployed-and-upgraded)

- [Solana Internals Part 3: The Transaction Processing Unit (TPU) | Sec3 Blog](https://www.sec3.dev/blog/solana-internals-part-3-the-transaction-processing-unit-tpu)

- [Solana Internals Part 4: The Bank - A Key Component | Sec3 Blog](https://www.sec3.dev/blog/solana-internals-part-4-the-bank-a-key-component)

- [Solana Validator 101: Transaction Processing | Jito Labs](https://www.jito.wtf/blog/solana-validator-101-transaction-processing/)
