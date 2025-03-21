// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Modifier {
    address public owner;

    constructor() {
        owner = msg.sender;

        // 'constructor' is a special function, which will automatically run
        // once during contract deployment. 
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
        // using 'require' to check whether caller is address of owner
        // using '_;' to execute thee function body
    }

    function changeOwner(address newOwner) external onlyOwner {
        owner = newOwner;
        // Only the owner address can run this function and change the owner
    }
}