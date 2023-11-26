require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

const permit2 = require("../lib/permit2.js");

module.exports = {
    permit2Approve: task("permit2Approve", "Permit2 Approval erc20 tokens")
          // .addParam("contract", "The contract")
          .addPositionalParam("token")
          .addPositionalParam("spender")
          .addPositionalParam("amount")
          .addPositionalParam("expiration")
          .setAction(async (taskArgs, hre) => {

        const contractAddress = permit2.permit2ContractAddress;
        const token = taskArgs.token;
        const spender = taskArgs.spender;
        const amount = taskArgs.amount;
        const expiration = taskArgs.expiration;
    
        const signers = await hre.ethers.getSigners();
        if (signers.length === 0) {
            console.error("Please config your accounts for network %s", hre.network.name);
            process.exit(1);
        }
    
        const signer = signers[0];
        console.log(typeof expiration)
        console.log("Approve %s can transfer %s from %s on the contract %s, expiration is %s", 
            spender, amount, signer.address, token, expiration);
    
        let permit2Contract = new hre.ethers.Contract(contractAddress, permit2.permit2Abi, signer);
    
        const allowance = await permit2Contract.allowance(signer.address, token, spender);
        console.log(allowance);
        console.log(typeof allowance)
    
        // const maxFeePerGas = hre.ethers.utils.parseUnits("10", "gwei");
        // const priorityFee = hre.ethers.utils.parseUnits("5", "gwei");
        // const tx = await permit2Contract.approve(token, spender, amount, expiration, {maxPriorityFeePerGas: priorityFee, maxFeePerGas: maxFeePerGas});
        
        const tx = await permit2Contract.approve(token, spender, amount, expiration);
        console.log(tx.hash);
        console.log(tx); 
        await tx.wait();
    
        // const tx = await permit2Contract.lockdown([{token: token, spender: spender}]);
        // console.log(tx)
        // await tx.wait();
    
        // const abi = (await hre.ethers.getContractFactory("AngryBirds")).interface;
        // const contract = new hre.ethers.Contract(contractAddress, abi, signer);
        // const tx = await contract.setApprovalForAll(spender, approved)
        // await tx.wait();
        // console.log(tx.hash); 1710576903
    }),
    permit2Lockdown: task("permit2Lockdown", "Permit2 Lockdown erc20 tokens")
        // .addParam("contract", "The contract")
        .addPositionalParam("token")
        .addPositionalParam("spender")
        .setAction(async (taskArgs, hre) => {
        const contractAddress = permit2.permit2ContractAddress;
        const token = taskArgs.token;
        const spender = taskArgs.spender;
    
        const signers = await hre.ethers.getSigners();
        if (signers.length === 0) {
            console.error("Please config your accounts for network %s", hre.network.name);
            process.exit(1);
        }
    
        const signer = signers[0];
        console.log("Lockdown %s to zero on the contract %s from from", spender, token, signer.address);
    
        let permit2Contract = new hre.ethers.Contract(contractAddress, permit2.permit2Abi, signer);
    
        const allowance = await permit2Contract.allowance(signer.address, token, spender);
        console.log(allowance);
        console.log(typeof allowance)
    
        const tx = await permit2Contract.lockdown([{token: token, spender: spender}]);
        console.log(tx)
        await tx.wait();
    }),
    permit2Allowance: task("permit2Allowance", "Permit2 Allowance erc20 tokens")
        // .addParam("contract", "The contract")
        .addPositionalParam("owner")
        .addPositionalParam("token")
        .addPositionalParam("spender")
        .setAction(async (taskArgs, hre) => {
        const contractAddress = permit2.permit2ContractAddress;
        const owner = taskArgs.owner;
        const token = taskArgs.token;
        const spender = taskArgs.spender;
        
        const signers = await hre.ethers.getSigners();
        if (signers.length === 0) {
        console.error("Please config your accounts for network %s", hre.network.name);
        process.exit(1);
        }

        const signer = signers[0];

        // const provider = hre.ethers.provider
        // const network = await provider.getNetwork();
        // console.log(network.chainId);

        let permit2Contract = new hre.ethers.Contract(contractAddress, permit2.permit2Abi, signer);

        const allowance = await permit2Contract.allowance(owner, token, spender);
        // console.log(allowance);
        // console.log(typeof allowance)

        console.log("Allowance: owner %s on token %s to %s, amount is %s, expiration is %s", 
            owner, token, spender, allowance[0], allowance[1]);
    })
}