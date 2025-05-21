// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// The 'receive()' function is solely used for receiving ETH. A contract can
// have at most one 'receive()' function, declared not like others, no 'function'
// keyword is needed, this function cannot have arguments, cannot return anything
// and must have 'external' visibility and 'payable' state mutability

// We should not perform too many operations in 'receive()' when sending Ether with 
// 'send' or 'transfer', only 2300 gas is available, and complicated operations
// will trigger an 'Out of Gas' error

contract Fallback {
    event Received(address sender, uint value);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}