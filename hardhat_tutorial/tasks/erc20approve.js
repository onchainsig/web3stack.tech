require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

module.exports = task("approve", "Approval erc20 tokens")
    .addParam("contract", "The contract")
    .addPositionalParam("spender")
    .addPositionalParam("value")
    .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.contract;
    const spender = taskArgs.spender;
    const value = taskArgs.value;

    const signers = await hre.ethers.getSigners();
    if (signers.length === 0) {
        console.error("Please config your accounts for network %s", hre.network.name);
        process.exit(1);
    }

    const signer = signers[0];
    console.log("Approve %s can transfer %s from %s on the contract %s", spender, value, signer.address, contractAddress);

    const abi = (await hre.ethers.getContractFactory("USDC")).interface;
    const contract = new hre.ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.approve(spender, value);
    await tx.wait();
    console.log(tx.hash);
    });