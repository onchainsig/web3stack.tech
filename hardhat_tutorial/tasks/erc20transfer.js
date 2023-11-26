require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

module.exports = task("erc20transfer", "Transfer erc20 tokens")
    .addParam("contract", "The contract")
    .addPositionalParam("to")
    .addPositionalParam("amount")
    .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.contract;
    const to = taskArgs.to;
    const amount = taskArgs.amount;

    const signers = await hre.ethers.getSigners();
    if (signers.length === 0) {
        console.error("Please config your accounts for network %s", hre.network.name);
        process.exit(1);
    }

    const signer = signers[0];
    const abi = (await hre.ethers.getContractFactory("Gold")).interface;

    const contract = new hre.ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.transfer(to, amount);
    await tx.wait();

    console.log(tx.hash);
    });