const hre = require("hardhat")

async function main() {

    console.log(process.argv)
    console.log(process.env.AAA)

    // const goldContract = await hre.ethers.deployContract("Gold");
    // 加载私钥生成 Signer
    const signers = await hre.ethers.getSigners();
    // console.log(signers.length)
    // console.log(signers[0])

    if (signers.length === 0) {
        console.error("Please config your accounts for network %s", hre.network.name);
        process.exit(1);
    }

    const signer = signers[0];

    // const provider = hre.ethers.getDefaultProvider();
    const provider = hre.network.provider;


    // console.log(provider)
    // console.log(hre.network.config)

    const abi = (await hre.ethers.getContractFactory("Gold")).interface
    // console.log(abi)

    const contract = new hre.ethers.Contract("0x088e8d79F75EAe57d7fa1975F83025702fcB25c7", abi, signer);

    // console.log(await contract.name())
    // console.log(await contract.totalSupply())
    // console.log(await contract.symbol())
    // console.log(await contract.balanceOf('vitalik.eth'))
    // console.log(await contract.balanceOf(signer.address))

    // const decimals = await contract.decimals()
    // console.log(100 * 10 ** decimals)
    // const amount = 100000000000;
    // const tx = await contract.transfer("0x23cba7C6D281df69edeEf3A5a55A3A2DA10dC1B7", amount)
    // await tx.wait()
    // console.log(tx)
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
})