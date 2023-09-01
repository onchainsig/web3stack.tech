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
