require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

let task = require("hardhat/config").task;

module.exports = task("selector", "Function selector")
    .addPositionalParam("signature")
    .setAction(async (taskArgs, hre) => {
        const signature = taskArgs.signature;
        const id = hre.ethers.utils.id(signature);

        console.log("Function: %s, id: %s, selector: %s", signature, id, id.slice(0, 10))
    });