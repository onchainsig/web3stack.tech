require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

let permit2 = require('./lib/permit2.js');

require("./tasks/mint.js");

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

// Permit2 approve
task("permit2Approve", "Permit2 Approval erc20 tokens")
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
  });

task("permit2Lockdown", "Permit2 Lockdown erc20 tokens")
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
  });

// Permit2 allowance
task("permit2Allowance", "Permit2 Allowance erc20 tokens")
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
    },
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [process.env.GORELI_PRIVATE_KEY]
    },
    mumbai: {
      // url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      url: 'https://polygon-mumbai-bor.publicnode.com',
      accounts: [process.env.GORELI_PRIVATE_KEY]
    },
    arbgoerli: {
        url: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
        accounts: [process.env.GORELI_PRIVATE_KEY]
    },
    opgoerli: {
      // url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      url: 'https://optimism-goerli.publicnode.com',
      accounts: [process.env.GORELI_PRIVATE_KEY]
    }
  }
};
