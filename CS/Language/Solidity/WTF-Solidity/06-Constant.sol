// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Constant {
    uint256 constant public CONSTANT_NUM = 10;
    string  constant public CONSTANT_STR = "AshGrey";
    bytes   constant public CONSTANT_bytes = "WTF";
    address constant public CONSTANT_ADDRESS = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    // The 'constant' variable must be initialized during declaration and cannot be 
    // changed afterwards. Any modification will result in an error at compilation.

    uint256 immutable public IMMUTABLE_NUM = 10;
    uint256 immutable public IMMUTABLE_BLOCK;
    address immutable public IMMUTABLE_ADDRESS;

    constructor() {
        IMMUTABLE_ADDRESS = address(this);
        IMMUTABLE_BLOCK = block.number;
    }
}