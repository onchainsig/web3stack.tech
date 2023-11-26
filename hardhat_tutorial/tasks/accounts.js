require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

module.exports = {
    accounts: task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
        const accounts = await hre.ethers.getSigners();
      
        for (const account of accounts) {
          console.log(account.address);
        }
      }),
    balance: task("balance", "Prints an account's balance")
      .addParam("account", "The account's address")
      .setAction(async (taskArgs, hre) => {
      const balance = await hre.ethers.provider.getBalance(taskArgs.account);
      console.log(hre.ethers.utils.formatEther(balance), "ETH")
    })
}