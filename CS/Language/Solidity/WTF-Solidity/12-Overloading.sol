// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// Solidity allows functions to be overloaded, functions with the name but
// different input parameter types can exist at the same time, and they
// are regarded as different functions. Solidity does not allow the modifier
// to be overloaded.

contract Overloading {
    function testOverloading() public pure
        returns(string memory r) {
        return "Nothing";
    }
    function testOverloading(string memory something) public pure
        returns(string memory r) {
        return something;
    }

    // When the overloading function is called, the variable type will be
    // matched between input parameter and function parameters. An error
    // will be reported if there are multiple matching overloading functions.
}