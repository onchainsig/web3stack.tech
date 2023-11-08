const hre = require("hardhat")

async function main() {
    const contractAddress = "0x83411e8CED5C7854f5F26a54D77921971F05d80D";

    const signers = await hre.ethers.getSigners();
    if (signers.length === 0) {
        console.error("Please config your accounts for network %s", hre.network.name);
        process.exit(1);
    }

    const signer = signers[0];
    const abi = (await hre.ethers.getContractFactory("AngryBirds")).interface;

    const contract = new hre.ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.safeMint(signer.address, 2, "2.png")
    await tx.wait();
    console.log(tx.hash);

    const tx2 = await contract.safeMint(signer.address, 3, "3.png")
    await tx2.wait();
    console.log(tx2.hash);
}

main().catch((error) => {
    console.log(error)
    process.exit(1)
})