require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

module.exports = task("nftMint", "Mint a NFT")
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
    });