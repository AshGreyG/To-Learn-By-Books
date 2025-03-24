// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// If a contract contains at least one unimplemented function, no contents in the
// function body {}, it must be labelled as 'abstract'; Otherwise it will not
// compile. Moreover, the unimplemented function needs to be labelled as 'virtual'.

abstract contract InsertionSort {
    event Log(string message);

    function insertionSort(uint[] memory a) public pure virtual
        returns (uint[] memory);

    constructor() {
        emit Log("InsertionSort is initialized");
    }
}

// The 'interface' contract is similar to the 'abstract' contract, but it requires
// no functions to be implemented. Rules of the interface:
//   1. Cannot contain state variables;
//   2. Cannot contain constructors;
//   3. Cannot inherit non-interface contracts;
//   4. All functions must be external and cannot have contents in the function body;
//   5. The contract that inherits the interface contract must implement all the
//      functions defined in it.

interface ForExampleIERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenID);
    function balanceOf(address owner) external view returns(uint256 balance);

    // ...
}