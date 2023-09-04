# 智能合约实现白名单

如何使用在智能合约中实现白名单功能呢，比如有时候我们项目的初始阶段只想让一些天使用户的地址能够申领 NFT ...

至少有三种方式：

1. 在合约中使用 mapping 存储
2. 使用 Markel Tree
3. 后台服务签名

## mapping 存储

这种方式比较简单，合约的管理员可以设置和更新白名单地址，放在 storage 中存储，但是当白名单地址很多时非常的耗费 gas，从节约成本的角度考虑，这种方式不是很好。

## Merkle Tree 方式

这种方式基本原理是把白名单地址生成一棵 Merkle Tree，然后把根节点的 hash 值存储在合约中，这样就可以节约很多 gas。

1. 生成 Merkle Tree 的过程是 off-chain 的，可以使用任何语言实现，比如使用 Javascript 的 [merkletreejs](https://github.com/merkletreejs/merkletreejs)
2. 部署合约并将 Merkle Tree 的根节点 hash 值存储在合约中
3. 当有人想 Mint 的时候，需要提供自己的地址和 Merkle Proof，合约会验证 Merkle Proof 是否正确；而 Proof 的获取需要项目方来帮用户生成
4. 用户拿到 Merkle Proof 后，调用合约来做 Mint 操作
5. 合约会结合 Proof 验证发送者地址是否在 Merkle Tree 中，如果在则 Mint 成功；合约中一般使用 [MerkleProof](https://docs.openzeppelin.com/contracts/3.x/api/cryptography#MerkleProof) 验证

```javascript
const { MerkleTree } = require('merkletreejs')
const fs = require('fs')
const { Web3 } = require('web3')
const keccak256 = require('keccak256')
const SHA256 = require('crypto-js/sha256')
const dotenv = require('dotenv')

dotenv.config()

const web3 = new Web3(process.env.ENDPOINT_RPC_URL)

const hashNode = (account, amount) => {
    return Buffer.from(
        web3.utils.soliditySha3({t: "address", v: account}, {t: "uint256", v: amount}).slice(2), 
        'hex'
        )
}

const readAddresses = (path) => {
    const rawdata = fs.readFileSync(path)
    return JSON.parse(rawdata)
}

const generateMerkleTree = (data) => {
    const leaves = Object.entries(data).map((leaf) => hashNode(...leaf))
    const merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})
    const merkleRoot = merkleTree.getHexRoot()
    
    return [merkleRoot, merkleTree]
}

const checkTree = (pairs, tree, root) => {
    for (const [key, value] of Object.entries(pairs)) {
        const leaf = hashNode(key, value)
        // 传入 leaf 从 merkle tree 中获取 proof
        const proof = tree.getProof(leaf)
        // console.log(proof)

        if (!tree.verify(proof, leaf, root)) {
            console.error(`Failed to verify ${key} with value ${value}`)
            return false
        }
    }

    return true
}

function main(filepath, merkleTreeOutputPath) {
    const addresses = readAddresses(filepath)
    const [merkleRoot, merkleTree] = generateMerkleTree(addresses)

    if (checkTree(addresses, merkleTree, merkleRoot)) {
        fs.writeFileSync(
            merkleTreeOutputPath, 
            JSON.stringify({root: merkleRoot, tree: merkleTree,})
        )

        console.log(`Merkle tree generated successfully to ${merkleTreeOutputPath}`)
    } else {
        console.error("Merkle tree generation failed")
    }

    // 验证一个 bad leaf
    const badLeaf = hashNode("0x9e8ad8877c190ec99CFa11365d947b604c6c4e83", 1000)
    const proof = merkleTree.getProof(badLeaf)
    // 如果是一个 badLeaf 是无法获取到 proof 的
    console.log(proof)  // []
}

main("./data/free-claim-addresses.json", "./data/free-claim-merkle-tree.json")
```

从上面的程序我们就可以构造出这颗 Merkle Tree，并且能获得 Merkle Root, Merkle Root 可以在创建合约时存储在合约里；接下来就实现合约中的验证逻辑，大致如下：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract PrimitiveWhiteList is ERC721Enumerable, Ownable {
  
  using ECDSA for bytes32;
  
  uint256 public constant MINT_PRICE = 0.1 ether;
  bytes32 private _whitelistMerkleRoot;
  
  constructor() ERC721("Merkle Tree Whitelist", "MTW") {}
  
  function whitelistSale(bytes32[] memory proof, uint256 amount) external payable {
        // merkle tree list related
        require(_whitelistMerkleRoot != "", "Free Claim merkle tree not set");
        require(
            MerkleProof.verify(
                proof,
                _whitelistMerkleRoot,
                keccak256(abi.encodePacked(msg.sender, amount))
            ),
            "Free Claim validation failed"
        );

        // start minting
        uint256 currentSupply = totalSupply();

        for (uint256 i = 1; i <= amount; i++) {
            _safeMint(msg.sender, currentSupply + i);
        }
    }
  
    function setWhitelistMerkleRoot(bytes32 newMerkleRoot_) external onlyOwner {
        _whitelistMerkleRoot = newMerkleRoot_;
    }
}
```

**优缺点：**

- 易于验证，项目方比较节省 gas 费用
- 对用户来说，铸造 gas 成本略大；此外，如果需要更新白名单，就需要更新合约中的 Merkle Root

## 后台服务签名

基本思想：

1. 用户需要铸币时，需要向后端服务发送自己的地址，后端会验证是否为白名单地址，如果是，则返回一个签名
2. 用户拿到签名后，调用合约来做 Mint 操作
3. 合约会验证签名是否正确，如果正确则 Mint 成功

这里需要注意生成签名和验证签名所需要的公私钥信息，合约中存储公钥信息，合约就可以验证签名了；后端服务持有私钥，可以用于签名。

此外，为了防止重放攻击，后端服务需要随机生成一个 nonce, 把 nonce 和签名一同返回用户。

```javascript
import Web3 from "web3";
import dotenv from "dotenv";

// Establish web3 provider
dotenv.config();
const web3 = new Web3(process.env.MAINNET_RPC_URL);

const generateNonce = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Hash message
const mintMsgHash = (recipient, amount, newNonce, contract) => {
  return (
    web3.utils.soliditySha3(
      { t: "address", v: recipient },
      { t: "uint256", v: amount },
      { t: "string", v: newNonce },
      { t: "address", v: contract }
    ) || ""
  );
};

const signMessage = (msgHash, privateKey) => {
    return web3.eth.accounts.sign(msgHash, privateKey);
};

// Signing the message at backend.
// You can store the data at database or check for Nonce conflict 
export const Signing = (address, amount) => {
  const newNonce = generateNonce();
 
  const hash = mintMsgHash(
    address,
    amount,
    newNonce,
    config.ContractAddress
  );

  const signner = signMessage(hash, config.PrivateKey);
  
  return {
    amount: amount,
    nonce: newNonce,
    hash: signner.message,
    signature: signner.signature,
  };
  
}
```

合约如下

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureWhitelist is ERC721, Ownable {
  using ECDSA for bytes32;
  
  address private _systemAddress;
  mapping(string => bool) public _usedNonces;

  function publicSale(
    uint256 amount,
    string memory nonce,
    bytes32 hash,
    bytes memory signature
  ) external payable nonReentrant {
 
    // signature realted
    require(matchSigner(hash, signature), "Plz mint through website");
    require(!_usedNonces[nonce], "Hash reused");
    require(
      hashTransaction(msg.sender, amount, nonce) == hash,
      "Hash failed"
    );

    _usedNonces[nonce] = true;

    // start minting
    uint256 currentSupply = totalSupply();

    for (uint256 i = 1; i <= amount; i++) {
      _safeMint(msg.sender, currentSupply + i);
    }
    
  }
  
  function matchSigner(bytes32 hash, bytes memory signature) public view returns (bool) {
    return _systemAddress == hash.toEthSignedMessageHash().recover(signature);
  }

  function hashTransaction(
    address sender,
    uint256 amount,
    string memory nonce
  ) public view returns (bytes32) {
  
    bytes32 hash = keccak256(
      abi.encodePacked(sender, amount, nonce, address(this))
    );

    return hash;
  }

}
```

## Resources

- [Smart Contract Whitelist Mechanism](https://coinsbench.com/smart-contract-whitelist-mechanism-fbe3464159ed)
