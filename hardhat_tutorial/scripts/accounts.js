const hre = require('hardhat')

async function main() {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
        console.log(account.address);
    }
}
// CommonJS
main().catch((err) => {
    console.error(err);
    process.exit(1);
})
