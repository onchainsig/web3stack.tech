require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// let task = require("hardhat/config").task;

require("./tasks/nft.js");
require("./tasks/selector.js");
require("./tasks/accounts.js");

require("./tasks/erc20transfer.js");
require("./tasks/erc20approve.js");

require("./tasks/permit2");

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
