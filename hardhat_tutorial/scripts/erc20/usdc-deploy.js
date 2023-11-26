
const hre = require("hardhat");

async function main() {
    const totalSupply = 100000000;

    const USDC = await hre.ethers.getContractFactory("USDC");
    const usdc = await USDC.deploy(totalSupply);

    await usdc.deployed();

    console.log(
        `USD Coin with total supply ${totalSupply} USDC deployed to ${usdc.address}`
    );
    // we can get a contract address.
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
