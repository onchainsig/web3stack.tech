# Smart contract tutorial

This project demonstrates the smart contract developed by Hardhat. 


## Setup

```shell
# Initialize the project
npm init

# Install Hardhat locally, and you can choose `Create a JavaScript project`.
npm install --save-dev hardhat
```

### Network

- Default built-in network: `hardhat`
- Hardhat node

```shell
# Start a local network
npx hardhat node

# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

- Testnet: `goerli` etc.
  - We can choose infura.io as the provider
- Mainnet: `mainnet` etc.

Hardhat other ommands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
npx hardhat run scripts/accounts.js --network goerli
```

### Private key

We can put the private key in the `.env` file, and not commit it to the repository. Any variable can be added.

```shell
INFURA_API_KEY=
GORELI_PRIVATE_KEY=
```

## Tasks & Scripts

### Tasks

- selector

```shell
$ npx hardhat selector --help
Usage: hardhat [GLOBAL OPTIONS] selector signature

POSITIONAL ARGUMENTS:

  signature

selector: Function selector for the given signature

$ npx hardhat selector "transfer(address,uint256)"
Function: transfer(address,uint256), id: 0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b, selector: 0xa9059cbb
```

- accounts

```shell
npx hardhat accounts
npx hardhat accounts --network goerli
```

- approve

```shell
Hardhat version 2.17.0

Usage: hardhat [GLOBAL OPTIONS] approve --contract <STRING> spender value

OPTIONS:

  --contract    The contract 

POSITIONAL ARGUMENTS:

  spender
  value  

approve: Approval erc20 tokens

$ npx hardhat approve --contract 0x90Ddc52fE6b98E07C30373C8c61037FBedDabcbB --network goerli 0x9e8ad8877c190ec99CFa11365d947b604c6c4e83 100000

$ npx hardhat approve --contract 0x83411e8CED5C7854f5F26a54D77921971F05d80D --network goerli 0x9e8ad8877c190ec99CFa11365d947b604c6c4e83 1
```
