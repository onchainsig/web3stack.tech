require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

module.exports = {
    mint: task("nftMint", "Mint a NFT")
        .addParam("contract", "The target contract")
        .addOptionalParam("to", "To address")
        .addPositionalParam("tokenId")
        .setAction(async (taskArgs, hre) => {
            const targetAddress = taskArgs.contract;
            const tokenId = taskArgs.tokenId
            let to = taskArgs.to

            const signers = await hre.ethers.getSigners();
            if (signers.length === 0) {
            console.error("Please config your accounts for network %s", hre.network.name);
            process.exit(1);
            }
        
            const signer = signers[0];

            if (!to || to === undefined) {
                to = signer.address
            } 

            const abi = (await hre.ethers.getContractFactory("AngryBirds")).interface;
            const contract = new hre.ethers.Contract(targetAddress, abi, signer);

            console.log("Minting NFT to %s on %s, tokenId is %s", to, targetAddress, tokenId);

            const tx = await contract.safeMint(to, tokenId, `/${tokenId}.png`)
            await tx.wait();
            console.log(tx.hash);
    }),
    approvalForAll: task("approveForAll", "Approval erc721 tokens")
        .addParam("contract", "The contract")
        .addPositionalParam("spender")
        .addPositionalParam("approved")
        .setAction(async (taskArgs, hre) => {
        const contractAddress = taskArgs.contract;
        const spender = taskArgs.spender;
        const approved = taskArgs.approved.toLowerCase() === "true";
    
        const signers = await hre.ethers.getSigners();
        if (signers.length === 0) {
            console.error("Please config your accounts for network %s", hre.network.name);
            process.exit(1);
        }
    
        const signer = signers[0];
        // console.log(typeof approved)
        console.log("%s %s can transfer all tokens from %s on the contract %s", 
            approved ? "Approve": "Revoke", spender, signer.address, contractAddress);
    
        const abi = (await hre.ethers.getContractFactory("AngryBirds")).interface;
        const contract = new hre.ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.setApprovalForAll(spender, approved)
        await tx.wait();
        console.log(tx.hash);
    })
}