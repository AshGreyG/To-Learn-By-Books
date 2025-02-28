// SPDX-License-Identifier: GPL-3.0
// The source code is licensed under the GPL version 3.0

pragma solidity >=0.4.16 <0.9.0;

// This is to ensure that the contract is not compilable with a new
// breaking compiler version, where it could behave differently

contract SimpleStorage {
    uint storedData;

    // uint -> unsigned integer of 256 bits

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }

    // In this example, the contract defines the functions 'set' and 'get'
    // that can be used to modify or retrieve the value of the variable.
}