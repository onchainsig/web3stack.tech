require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

task("selector", "Function selector")
    .addPositionalParam("signature")
    .setAction(async (taskArgs, hre) => {
        const signature = taskArgs.signature;
        const id = hre.ethers.utils.id(signature);

        console.log("Function: %s, id: %s, selector: %s", signature, id, id.slice(0, 10))
    });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
      const accounts = await hre.ethers.getSigners();
    
      for (const account of accounts) {
        console.log(account.address);
      }
    });

task("balance", "Prints an account's balance")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs, hre) => {
      const balance = await hre.ethers.provider.getBalance(taskArgs.account);
      console.log(hre.ethers.utils.formatEther(balance), "ETH")
    });

task("erc20transfer", "Transfer erc20 tokens")
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

task("approve", "Approval erc20 tokens")
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

task("approveForAll", "Approval erc721 tokens")
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
  });


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.GORELI_PRIVATE_KEY]
    }
  }
};
