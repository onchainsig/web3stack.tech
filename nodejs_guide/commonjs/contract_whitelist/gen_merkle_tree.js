const { MerkleTree } = require('merkletreejs')
const fs = require('fs')
const { Web3 } = require('web3')
const keccak256 = require('keccak256')
const SHA256 = require('crypto-js/sha256')
const dotenv = require('dotenv')

dotenv.config()
console.log(process.env.ENDPOINT_RPC_URL)

const web3 = new Web3(process.env.ENDPOINT_RPC_URL)

function merkletreeSample() {
    const leaves = ['a', 'b', 'c'].map(x => SHA256(x))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')
    const leaf = SHA256('a')
    const proof = tree.getProof(leaf)
    console.log(proof)
    tree.print()
    console.log(tree.verify(proof, leaf, root)) // true
    
    
    const badLeaves = ['a', 'x', 'c'].map(x => SHA256(x))
    const badTree = new MerkleTree(badLeaves, SHA256)
    const badLeaf = SHA256('x')
    const badProof = badTree.getProof(badLeaf)
    console.log(badTree.verify(badProof, badLeaf, root)) // false
}

const hashNode = (account, amount) => {
    return Buffer.from(
        web3.utils.soliditySha3({t: "address", v: account}, {t: "uint256", v: amount}).slice(2), 
        'hex'
        )
}

// console.log(hashNode("0x9e8ad8877c190ec99CFa11365d947b604c6c4e83", 1))

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
        // console.log(tree.getPositionalHexProof(leaf))

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
    console.log(proof)
}

main("./data/free-claim-addresses.json", "./data/free-claim-merkle-tree.json")
