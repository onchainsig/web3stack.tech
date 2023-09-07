// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

// Author: shaohan.niu.share@gmail.com
contract Gold is ERC20 {
    constructor(uint256 totalSupply) ERC20("Gold", "GLD") {
        _mint(msg.sender, totalSupply * 10 ** decimals());
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        console.log(from, to, amount, symbol());

        if (!(from == address(0) && to == address(0))) {
            // mint token for miner.
        }

        super._beforeTokenTransfer(from, to, amount);
    }

}